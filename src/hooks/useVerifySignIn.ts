"use client";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface userData {
  email: string | null;
  uid: string | null;
}

export default function useVerifySignIn(redirect: string) {
  const [userData, setUserData] = useState<userData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setUserData({ email: user.email, uid: user.uid });
      } else if (!user) {
        router.push(redirect);
      }
    });

    return () => unsubscribe();
  }, [router, redirect]);
  return { userData, loading };
}
