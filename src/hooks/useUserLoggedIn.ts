"use client";
import { UseUser } from "@/context/userContext";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface userData {
  email: string | null;
  uid: string | null;
}

export default function useUserLoggedIn(redirect: string) {
  const [userData, setUserData] = useState<userData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { setUser } = UseUser();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        const userObj = {
          email: user.email,
          uid: user.uid,
          photo: user.photoURL,
          name: user.displayName,
        };
        setUserData(userObj);
        setUser(userObj);
      } else if (!user) {
        router.push(redirect);
      }
    });

    return () => unsubscribe();
  }, [router, redirect, setUser]);
  return { userData, loading };
}
