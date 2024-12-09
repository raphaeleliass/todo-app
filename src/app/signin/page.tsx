"use client";
import {
  FormPage,
  LeftDivPage,
  RightDivPage,
} from "@/components/formPages/formPage";
import SigninForm from "@/components/forms/signinForm";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Signin() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <FormPage>
      <LeftDivPage>
        <span className="mx-auto">
          <h2>Sign In</h2>
          <h2>Be productive</h2>
          <h2>Be organized</h2>
          <h2>Be minimal</h2>
        </span>
      </LeftDivPage>

      <RightDivPage>
        <h2 className="text-2xl">Sign In</h2>
        <SigninForm />
      </RightDivPage>
    </FormPage>
  );
}
