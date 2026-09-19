import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import MotionLink from "@/components/motion/MotionLink";
import NavLink from "@/components/motion/NavLink";

export default async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2 text-brand">
          <Image
            src="/logo-mark.png"
            alt="LivraisonExpress"
            width={40}
            height={24}
            className="h-9 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
            priority
          />
          <span className="text-lg font-bold tracking-tight">
            Livraison<span className="text-accent">Express</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/suivi">Track a Package</NavLink>
          <NavLink href="/devis">Request a Quote</NavLink>
          {session?.role === "ADMIN" && <NavLink href="/admin">Admin</NavLink>}
        </nav>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link
                href="/compte"
                className="hidden text-sm font-medium text-slate-600 hover:text-brand sm:inline"
              >
                Hi, {session.name.split(" ")[0]}
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/connexion"
                className="hidden text-sm font-semibold text-slate-700 hover:text-brand sm:inline"
              >
                Log in
              </Link>
              <MotionLink
                href="/devis"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-dark"
              >
                Ship a Package
              </MotionLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
