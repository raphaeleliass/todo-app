"use client";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/firebase/firebaseConfig";
import useVerifySignIn from "@/hooks/useVerifySignIn";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const { userData, loading } = useVerifySignIn("/signin");

  async function logoutUser() {
    await signOut(auth);
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center">
      <SidebarProvider defaultOpen>
        <AppSidebar uid={userData?.uid} />
        <SidebarTrigger />
        <div className="flex w-full flex-col items-center justify-center gap-2">
          {loading ? (
            ""
          ) : (
            <span>
              {userData?.email} <br /> {userData?.uid} <br />
            </span>
          )}
          <Button onClick={logoutUser}>Sign out</Button>
        </div>
      </SidebarProvider>
    </main>
  );
}
