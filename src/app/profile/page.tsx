'use client'
import ProfileSidebar from "./_components/ProfileSidebar";
import AboutSection from "./_components/AboutSection";
import SkillsSection from "./_components/SkillsSection";
import ProjectsSection from "./_components/ProjectsSection";
import ResumeSection from "./_components/ResumeSection";
import AchievementsSection from "./_components/AchievementsSection";
import StudentTopBar from "../_components/StudentTopBar";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import useGetUser from "../student/hooks/useGetLoginUser";

export default function ProfilePage() {
  const [isEditing,setIsEditing]=useState(false)
  const { isLoading, isError, error } = useGetUser();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#e8eefc]">
        <div className="flex items-center gap-2 text-[#1a3d73]">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-medium">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#e8eefc] p-6">
        <p className="text-center text-sm font-medium text-red-600">
          {error instanceof Error ? error.message : "Failed to load user profile."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8eefc]">
      <div className="mx-auto flex w-full  flex-col lg:flex-row">
        <ProfileSidebar />

        <div className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-4xl font-bold text-[#1a3d73]">Profile</h1>

            <div className="flex gap-3">
              {
                isEditing && 
                <button onClick={()=>{
                  setIsEditing(false)
                }} className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                Cancel
              </button>
              }
              {
                isEditing  ?
  <></>
              :
              <button onClick={()=>{
                setIsEditing(true)
              }} className="rounded-lg bg-[#1176c8] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#0b67b0]">
              Edit Profile
            </button>
              }
            </div>
          </div>

          <SkillsSection isEditing={isEditing}  />
          <ProjectsSection isEditing={isEditing}  />
          <ResumeSection isEditing={isEditing} />
          <AchievementsSection />
        </div>
      </div>
    </div>
  );
}
