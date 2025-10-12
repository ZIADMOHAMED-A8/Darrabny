export const dynamic = 'force-dynamic';
import { Suspense } from "react";
import AccountSettingsPage from "./_components/profile-foem";

export default function Page() {
  return (
    <Suspense fallback={null}>
        <AccountSettingsPage />
    </Suspense>
  )
}
