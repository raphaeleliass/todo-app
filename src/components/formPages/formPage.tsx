import { cn } from "@/lib/utils";
import { AllHTMLAttributes, forwardRef } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Separator } from "../ui/separator";

const FormPage = forwardRef<HTMLDivElement, AllHTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <main
      ref={ref}
      className={cn("flex flex-col-reverse md:flex-row", className)}
      {...props}
    />
  ),
);

FormPage.displayName = "FormPage";

const LeftDivPage = forwardRef<
  HTMLDivElement,
  AllHTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "hidden w-full flex-col items-start justify-center gap-1 bg-foreground pl-0 text-left font-Poppins text-4xl font-semibold text-muted-foreground md:flex md:min-h-dvh md:w-1/2",
      className,
    )}
    {...props}
  />
));

LeftDivPage.displayName = "LeftDivPage";

const RightDivPage = forwardRef<
  HTMLDivElement,
  AllHTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex min-h-dvh flex-col items-center justify-center gap-6 bg-background md:w-1/2 md:gap-10",
      className,
    )}
    {...props}
  >
    <Button
      className="absolute left-2 top-2 px-0"
      variant={"ghost"}
      aria-label="back to home button"
    >
      <Link href={"/"} className="flex flex-row items-center gap-1 p-2">
        <ArrowLeft />
        Home
      </Link>
    </Button>

    {children}

    <Separator className="max-w-xs" />
  </div>
));

RightDivPage.displayName = "RightDivPage";

export { FormPage, LeftDivPage, RightDivPage };
