"use client";

import { ChangeEvent, useRef, useState } from "react";
import {
  Camera,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  PencilLine,
  Phone,
} from "lucide-react";
import useUploadProfilePic from "../_hooks/useUploadProfilePic";
import { useToast } from "@/hooks/use-toast";
import useGetUser from "@/app/(student)/hooks/useGetLoginUser";

const extractProfilePicUrl = (payload: unknown): string | null => {
  if (!payload || typeof payload !== "object") return null;

  const root = payload as Record<string, unknown>;
  const data = (root.data as Record<string, unknown> | undefined) || root;

  const directKeys = [
    "profilePic",
    "profilePicUrl",
    "profilePicture",
    "profilePictureUrl",
    "avatar",
    "avatarUrl",
    "image",
    "imageUrl",
    "url",
  ];

  for (const key of directKeys) {
    const value = data[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return null;
};

export default function ProfileSidebar() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { toast } = useToast();
  const { uploadProfilePic, isPending } = useUploadProfilePic();
  const {data,isLoading}=useGetUser()

  const handlePickImage = () => {
    if (isPending) return;
    inputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.currentTarget.value = "";

    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("attachment", file);

      const result = await uploadProfilePic(formData);
      const uploadedUrl = extractProfilePicUrl(result);

      if (uploadedUrl) {
        setAvatarPreview(uploadedUrl);
      } else {
        setAvatarPreview(URL.createObjectURL(file));
      }

      toast({
        title: "Profile picture updated",
        description: "Your profile image was uploaded successfully.",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to upload profile picture.";

      toast({
        title: "Upload failed",
        description: message,
        variant: "destructive",
      });
    }
  };
  if(isLoading){
    return (
    <aside className="w-full flex justify-center items-center border-b border-slate-200 bg-[#f7f8fb] px-6 py-8 lg:w-[420px] lg:border-b-0 lg:border-r lg:px-10">
      <Loader2 className="h-4 w-4 animate-spin"></Loader2>
</aside>
)
  }
  return (
    <aside className="w-full border-b border-slate-200 bg-[#f7f8fb] px-6 py-8 lg:w-[420px] lg:border-b-0 lg:border-r lg:px-10">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Profile"
              className="h-28 w-28 rounded-full object-cover shadow-sm sm:h-32 sm:w-32"
            />
          ) : (
            <div className="h-28 w-28 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f3d6bc_0%,#c58d62_70%)] shadow-sm sm:h-32 sm:w-32" />
          )}

          <button
            type="button"
            onClick={handlePickImage}
            className="absolute -bottom-1 -right-1 inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#1176c8] text-white shadow-sm transition hover:bg-[#0b67b0] disabled:cursor-not-allowed disabled:opacity-70"
            aria-label="Edit profile picture"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <h2 className="mt-5 text-3xl font-bold text-[#111f37] sm:text-3xl"> {data?.fullName}</h2>
        <p className="text-lg text-slate-600">Student at State University</p>
        <p className="mt-1 text-sm text-slate-500">Joined in 2022</p>
      </div>

      <div className="mt-12">
        <h3 className="mb-4 text-xl font-semibold text-[#111f37]">Contact</h3>
        <ul className="space-y-4 text-base text-slate-600">
          <li className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f1ff]">
              <Mail className="h-5 w-5 text-[#2280cc]" />
            </span>
            <span className="break-all">{data?.email}</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f1ff]">
              <Phone className="h-5 w-5 text-[#2280cc]" />
            </span>
            <span>{data?.phoneNumber}</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f1ff]">
              <MapPin className="h-5 w-5 text-[#2280cc]" />
            </span>
            <span>{data?.address?.city}, {data?.address?.country}</span>
          </li>
        </ul>
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center gap-3">
          <h3 className="text-xl font-semibold text-[#111f37]">Links</h3>
          <button
            type="button"
            className="rounded-lg p-1 text-slate-700 transition hover:bg-slate-100"
            aria-label="Edit links"
          >
            <PencilLine className="h-5 w-5" />
          </button>
        </div>
        <ul className="space-y-4 text-base text-slate-600">
          <li className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f1ff]">
              <Linkedin className="h-5 w-5 text-[#2280cc]" />
            </span>
            <span className="break-all">linkedin.com/in/sophia-clark</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f1ff]">
              <Github className="h-5 w-5 text-[#2280cc]" />
            </span>
            <span className="break-all">github.com/sophia-clark</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
