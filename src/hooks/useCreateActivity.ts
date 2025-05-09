
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { setCachedData, getCachedData, requestQueue } from "@/lib/errorHandlers";
import { PostgrestError } from "@supabase/supabase-js";

// Cache key prefix for activity logs
const ACTIVITY_CACHE_PREFIX = "activity_log_";

// Type for activity data structure
interface ActivityData {
  user_id: string;
  activity_type: string;
  description: string;
}

// Type for cached activity with additional properties
interface CachedActivity extends ActivityData {
  id: string;
  created_at: string;
  pending: boolean;
}

// Type for Supabase response
interface SupabaseResponse<T = any> {
  data: T | null;
  error: PostgrestError | null;
}

/**
 * Hook for creating and managing user activity logs
 */
export const useCreateActivity = () => {
  const { user } = useAuth();

  /**
   * Logs a user activity to both the database and local cache
   * @param activityType Type of activity being logged
   * @param description Description of the activity
   * @returns The created activity or null on error
   */
  const logActivity = async (
    activityType: string,
    description: string
  ) => {
    if (!user) {
      console.warn("Cannot log activity: User not authenticated");
      return null;
    }

    // Create activity log entry
    const activityData: ActivityData = {
      user_id: user.id,
      activity_type: activityType,
      description: description
    };

    // Add to local cache immediately for offline support
    const cacheKey = `${ACTIVITY_CACHE_PREFIX}${Date.now()}`;
    const cachedActivities = getCachedData<CachedActivity[]>("pending_activities") || [];
    cachedActivities.push({
      ...activityData,
      id: cacheKey,
      created_at: new Date().toISOString(),
      pending: true
    });
    setCachedData("pending_activities", cachedActivities);

    try {
      // Use the request queue to manage concurrent requests
      const result = await requestQueue.add<SupabaseResponse>(async () => {
        return await supabase
          .from("user_activity_log")
          .insert(activityData)
          .select()
          .single();
      });

      if (result.error) throw result.error;

      // On successful insert, remove this activity from pending
      const updatedActivities = (getCachedData<CachedActivity[]>("pending_activities") || [])
        .filter(a => a.id !== cacheKey);
      setCachedData("pending_activities", updatedActivities);

      return result.data;
    } catch (error) {
      console.error("Error logging activity:", error);
      // Keep in pending cache for later sync
      return null;
    }
  };

  /**
   * Syncs any pending activities that failed to send due to network issues
   * @returns Number of successfully synced activities
   */
  const syncPendingActivities = async () => {
    if (!user) return 0;
    
    const pendingActivities = getCachedData<CachedActivity[]>("pending_activities") || [];
    if (pendingActivities.length === 0) return 0;
    
    let syncedCount = 0;
    const stillPending: CachedActivity[] = [];
    
    for (const activity of pendingActivities) {
      try {
        // Skip the timestamp and pending flag when sending to server
        const { pending, id, created_at, ...activityData } = activity;
        
        const result = await requestQueue.add<SupabaseResponse>(async () => {
          return await supabase
            .from("user_activity_log")
            .insert(activityData);
        });
        
        if (result.error) {
          stillPending.push(activity);
        } else {
          syncedCount++;
        }
      } catch (err) {
        stillPending.push(activity);
      }
    }
    
    // Update pending activities cache
    setCachedData("pending_activities", stillPending);
    
    return syncedCount;
  };

  return { 
    logActivity,
    syncPendingActivities,
    getPendingActivitiesCount: () => (getCachedData<CachedActivity[]>("pending_activities") || []).length
  };
};
