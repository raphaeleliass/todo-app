"use client";

import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function VerifyEmail() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      } else if (user.emailVerified) {
        router.replace("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-Poppins text-lg font-semibold">
        You must verify your email to proceed
      </h1>
      <p className="text-sm">
        Check your mailbox. If you have already verified your email, please{" "}
        <Link href="/dashboard" className="text-blue-600 underline">
          click here
        </Link>
      </p>
    </main>
  );
}
