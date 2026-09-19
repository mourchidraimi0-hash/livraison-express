import Link from "next/link";
import type { ReactNode } from "react";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className="group relative py-1 hover:text-brand">
      {children}
      <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
