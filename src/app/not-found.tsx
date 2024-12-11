import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
      <span className="text-4xl drop-shadow-xl bg-zinc-200 text-muted-foreground mb-6 p-2 rounded-md font-bold">404</span>
      <h1 className="font-Poppins text-xl font-semibold">Page Not Found</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Oops! It seems the page you are looking for does not exist. Please check
        the URL or return to the <Link href={"/"}>Home page</Link>.
      </p>
    </main>
  );
}
