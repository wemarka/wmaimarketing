
import { UseSchedulePostStateWithSetters } from "./types";

export const useMediaHandlers = (state: UseSchedulePostStateWithSetters) => {
  const {
    mediaFiles,
    mediaUrls,
    previewUrls,
    setMediaFiles,
    setMediaUrls,
    setPreviewUrls
  } = state;

  const handleMediaChange = (files: File[]) => {
    // Update media files
    setMediaFiles((prev: File[]) => [...prev, ...files]);
    
    // Generate preview URLs for immediate display
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls((prev: string[]) => [...prev, ...newPreviewUrls]);
    
    // Mock upload to storage service
    // In a real app, this would upload to Supabase Storage or similar
    console.log("Files to upload:", files);
    
    // Simulate response URLs
    const mockUploadedUrls = files.map((file, index) => 
      `https://example.com/uploads/${Date.now()}-${index}-${file.name}`
    );
    setMediaUrls((prev: string[]) => [...prev, ...mockUploadedUrls]);
  };

  const removeMedia = (index: number) => {
    // Remove from all three arrays
    setMediaFiles((prev: File[]) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
    
    setPreviewUrls((prev: string[]) => {
      // Revoke URL to prevent memory leaks
      if (prev[index]) {
        URL.revokeObjectURL(prev[index]);
      }
      
      const newUrls = [...prev];
      newUrls.splice(index, 1);
      return newUrls;
    });
    
    setMediaUrls((prev: string[]) => {
      const newUrls = [...prev];
      newUrls.splice(index, 1);
      return newUrls;
    });
  };

  return { handleMediaChange, removeMedia };
};
