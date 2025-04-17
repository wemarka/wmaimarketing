
import React from "react";
import { Route, Routes } from "react-router-dom";

// Layout and protected routes
import ProtectedRoute from "./ProtectedRoute";

// Pages
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/auth/Login";
import Settings from "@/pages/admin/Settings";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/auth/Register";
import ResetPassword from "@/pages/auth/ResetPassword";
import Members from "@/pages/admin/Members";
import ContentCreator from "@/pages/ContentCreator";
import ContentPosts from "@/pages/content/Posts";
import Scheduler from "@/pages/Scheduler";
import SchedulePost from "@/pages/SchedulePost";
import SocialIntegration from "@/pages/SocialIntegration";

// Other imports as needed

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/members" element={<Members />} />
        <Route path="/content-creator" element={<ContentCreator />} />
        <Route path="/content/posts" element={<ContentPosts />} />
        
        {/* Scheduling Routes */}
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/schedule-post" element={<SchedulePost />} />
        <Route path="/social-integration" element={<SocialIntegration />} />
      </Route>
      
      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
