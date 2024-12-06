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
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { auth } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { useState } from "react";

const formSchema = z
  .object({
    email: z.string().email("Invalid email").trim(),
    password: z
      .string()
      .min(6, "Password must be 6 characters at least")
      .trim(),
    confirmPassword: z.string(),
    terms: z.boolean().refine((value) => value),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password must be the same",
  });

type FormSchema = z.infer<typeof formSchema>;

export default function SignupForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [mainPasswordVisible, setMainPasswordVisible] =
    useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);

  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function submitForm(formValue: FormSchema) {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password,
      );

      setLoading(false);
      form.reset();
      router.push("/dashboard");
    } catch (err) {
      setLoading(false);
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/email-already-in-use":
            form.setError("email", { message: "Email already in use" });
            break;
        }
      } else {
        return;
      }
    }
  }

  function toggleMainPasswordVisibility() {
    setMainPasswordVisible((prev) => !prev);
  }

  function toggleConfirmPasswordVisibility() {
    setConfirmPasswordVisible((prev) => !prev);
  }

  return (
    <Form {...form}>
      <form
        className={`flex w-full max-w-xs flex-col gap-6 ${loading && "opacity-60"}`}
        onSubmit={form.handleSubmit(submitForm)}
        id="signUpForm"
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu email"
                  type="email"
                  autoComplete="off"
                  aria-label="input to place your email"
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
              <FormLabel className="text-muted-foreground">Password</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    placeholder="Enter your password"
                    type={mainPasswordVisible ? "text" : "password"}
                    autoComplete="off"
                    aria-label="input to put your password"
                    {...field}
                  />

                  <span
                    className="absolute right-2"
                    role="button"
                    onClick={toggleMainPasswordVisibility}
                    aria-label="button to toggle your password visibility"
                  >
                    {mainPasswordVisible ? (
                      <Eye className="size-5" />
                    ) : (
                      <EyeClosed className="size-5" />
                    )}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">
                Confirm your password
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    placeholder="Confirm your password"
                    type={confirmPasswordVisible ? "text" : "password"}
                    autoComplete="off"
                    aria-label="input to confirm your previous password"
                    {...field}
                  />

                  <span
                    className="absolute right-2"
                    role="button"
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label="button to toggle your confirm password visibility"
                  >
                    {confirmPasswordVisible ? (
                      <Eye className="size-5" />
                    ) : (
                      <EyeClosed className="size-5" />
                    )}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="terms"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <span className="flex flex-row items-center gap-2">
                <Checkbox
                  onCheckedChange={field.onChange}
                  checked={field.value}
                  aria-label="checkbox to accept terms and conditions"
                />
                <FormLabel>I agree and accept the terms & conditions</FormLabel>
              </span>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading ? true : false}
          aria-label="create your account button"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
