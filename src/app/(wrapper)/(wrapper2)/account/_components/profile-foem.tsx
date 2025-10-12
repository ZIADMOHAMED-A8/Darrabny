"use client";

import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { updateProfileAction, updatePasswordAction, deleteAccountAction } from "../services/account";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";  
import { AlertTriangle } from "lucide-react";
import { signOut } from "next-auth/react";


type Tab = "profile" | "password";

export default function AccountSettingsPage() {
  const search = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tab = (search.get("tab") as Tab) ?? "profile";

  const setTab = (t: Tab) => {
    const p = new URLSearchParams(search);
    p.set("tab", t);
    router.replace(`${pathname}?${p.toString()}`);
  };

  const [countryCode, setCountryCode] = useState("+20");

  return (
    <div className="p-6 !border-0 !shadow-none">
      {tab === "profile" && (
        <form
          action={async (fd) => {
            await updateProfileAction(fd);
          }}
          className="space-y-6 border-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" name="firstName" defaultValue="Ahmed" className="bg-gray-50" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" name="lastName" defaultValue="Abdullah" className="bg-gray-50" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" defaultValue="user123" className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" name="email" defaultValue="user@example.com" className="bg-gray-50" required />
          </div>

          <div className="space-y-2">
  <Label htmlFor="phone">Phone</Label>
  <div className="flex gap-2">
    <Select value={countryCode} onValueChange={setCountryCode}>
      <SelectTrigger className="w-36 bg-gray-50">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="+20">🇪🇬 EG (+20)</SelectItem>
        <SelectItem value="+1">🇺🇸 US (+1)</SelectItem>
        <SelectItem value="+44">🇬🇧 UK (+44)</SelectItem>
      </SelectContent>
    </Select>


    <Input
      id="phone"
      name="phone"
      defaultValue="01012345678"
      className="flex-1 bg-gray-50"
      required
    />
  </div>
</div>




<div className="flex flex-col sm:flex-row gap-3 pt-4">
  
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        variant="destructive"
        className="bg-red-50 w-full text-red-600 hover:bg-red-100 border border-red-200 sm:w-auto"
      >
        Delete My Account
      </Button>
    </AlertDialogTrigger>

    <AlertDialogContent className="sm:max-w-[560px] text-center p-0">

      <div className="flex justify-center pt-8">
      <div className="rounded-full bg-red-50 p-5">
        <div className="rounded-full bg-red-100 p-5">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
      </div>
      </div>

      <AlertDialogHeader className="flex flex-col items-center px-8 pt-4">
        <AlertDialogTitle className="text-red-600 text-lg font-medium">
          Are you sure you want to delete your account?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-gray-500 text-sm mt-2">
          This action is permanent and cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>

      
      <div className="h-px bg-gray-200 my-6" />

      <AlertDialogFooter className="px-6 pb-6 gap-3 sm:justify-center">
        <AlertDialogCancel className="flex flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={async () => {
            const res = await deleteAccountAction()
            if (res?.ok) {
              await signOut({ redirect: true, callbackUrl: "/login" })
            }
          }}
          className="flex flex-1 bg-red-600 hover:bg-red-700 text-white"
        >
          Yes, delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <div className="flex-1">
    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8 w-full">
      Save Changes
    </Button>
  </div>
</div>

        </form>
      )}

      {tab === "password" && (
        <form
        action={async (fd) => {
          const res = await updatePasswordAction(fd);
          if (res?.ok) {
            toast.success("تم تحديث كلمة المرور");
            setTab("profile");
          } else {
            toast.error(res?.message || "فشل تحديث كلمة المرور");
          }
        }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" name="currentPassword" type="password" className="bg-gray-50" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" name="newPassword" type="password" className="bg-gray-50" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" className="bg-gray-50" required />
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={() => setTab("profile")}>
              Back to Profile
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8">
              Update Password
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
