"use client";
import { Button } from "@/components/ui/button";
import useVerifySignIn from "@/hooks/useUserLoggedIn";
import { ArrowRight, ArrowUpRight, LogIn } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { userData } = useVerifySignIn("/");

  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center">
      <section className="container flex flex-col items-center justify-center gap-12 py-4 text-center">
        <h2 className="font-Poppins text-4xl font-bold text-zinc-600 drop-shadow-xl md:text-5xl">
          <strong className="rounded bg-zinc-300 p-1 text-zinc-50">TODO</strong>{" "}
          APP
        </h2>

        <article>
          <p className="md:text-md max-w-xs text-sm text-muted-foreground md:max-w-lg">
            Stay organized and boost your productivity with our intuitive Todo
            App. Create, manage, and track your tasks effortlessly in one place.
          </p>
        </article>

        <div className="flex flex-row gap-2">
          {userData ? (
            <Button>
              <Link
                href={"/dashboard"}
                className="flex w-full flex-row items-center gap-1 px-1 py-4"
              >
                Dashboard <ArrowRight />
              </Link>
            </Button>
          ) : (
            <>
              {" "}
              <Button variant={"default"}>
                <Link
                  href={"/signup"}
                  className="flex w-full flex-row items-center gap-1 px-1 py-4"
                >
                  Sign up <ArrowUpRight />
                </Link>
              </Button>
              <Button variant={"outline"}>
                <Link href={"/signin"} className="flex items-center gap-1">
                  Sign in
                  <LogIn />
                </Link>
              </Button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
