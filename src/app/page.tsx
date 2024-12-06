import { Button } from "@/components/ui/button";
import { ArrowUpRight, LogIn } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center">
      <section className="container flex flex-col items-center justify-center gap-12 py-4 text-center">
        <h2 className="font-Poppins text-4xl font-bold text-zinc-500 drop-shadow-xl md:text-5xl">
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
          <Button variant={"default"}>
            <Link href={"/signup"} className="flex items-center gap-1">
              Sign up <ArrowUpRight />
            </Link>
          </Button>

          <Button variant={"outline"}>
            <Link href={"/signin"} className="flex items-center gap-1">
              Sign in
              <LogIn />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
