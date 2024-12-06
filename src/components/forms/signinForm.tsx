"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { NextRequest } from "next/server";
import Cookies from "js-cookie";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password can't be empty"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function SigninForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function submitForm(formValue: FormSchema) {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password,
      );
      const token = await userCredential.user.getIdToken();
      Cookies.set("token", token, { expires: 1 }); // O token expira em 1 dia
      setLoading(false);
      router.push("/dashboard");
    } catch (err) {
      setLoading(false);
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/invalid-credential":
            form.setError("email", { message: "Email or password invalid" });
            form.setError("password", { message: "Email or password invalid" });
            setLoading(false);
        }
      }
    }
  }

  function togglePasswordVisibility() {
    setPasswordVisible((prev) => !prev);
  }

  return (
    <Form {...form}>
      <form
        className={`flex w-full max-w-xs flex-col gap-6 ${loading && "opacity-60"}`}
        onSubmit={form.handleSubmit(submitForm)}
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  autoComplete="off"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative flex items-center justify-center">
                  <Input
                    placeholder="Enter your password"
                    autoComplete="off"
                    type={passwordVisible ? "text" : "password"}
                    {...field}
                  />

                  <span
                    role="button"
                    className="absolute right-2"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <EyeClosed className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
