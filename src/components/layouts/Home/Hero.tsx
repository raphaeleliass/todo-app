"use client";
import { Boxes } from "@/components/ui/background-boxes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight, LogIn } from "lucide-react";
import { motion } from "motion/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Hero() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (!auth.currentUser) return;

      router.push("/dashboard");
    });
  }, [router]);
  
  return (
    <section>
      <div className="relative flex h-[70dvh] w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-900 md:max-w-5xl">
        <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-slate-900 [mask-image:radial-gradient(transparent,white)]" />
        <Boxes />
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", delay: 0.1 }}
          className={cn(
            "relative z-20 font-Poppins text-5xl font-bold text-white",
          )}
        >
          Todo App
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", delay: 0.2 }}
          className="md:text-md mt-4 max-w-xs text-center text-sm text-muted-foreground md:max-w-lg"
        >
          Stay organized and boost your productivity with our intuitive Todo
          App. Create, manage, and track your tasks effortlessly in one place.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", delay: 0.3 }}
          className="z-50 mt-7 flex flex-row gap-2"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
