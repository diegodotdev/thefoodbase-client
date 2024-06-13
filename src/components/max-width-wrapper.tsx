import { ReactNode } from "react";
import { cn } from "../lib/utils";

export default function MaxWidthWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("w-full max-w-screen-xl mx-auto px-5 2xl:px-0", className)}
    >
      {children}
    </div>
  );
}
