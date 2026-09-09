import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";

export default async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-brand">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 7l9-4 9 4-9 4-9-4Zm0 0v10l9 4m0-14v14m0-14 9 4v10l-9 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-lg font-bold tracking-tight">
            Livraison<span className="text-accent">Express</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/" className="hover:text-brand">
            Accueil
          </Link>
          <Link href="/suivi" className="hover:text-brand">
            Suivre un colis
          </Link>
          <Link href="/devis" className="hover:text-brand">
            Demander un devis
          </Link>
          {session?.role === "ADMIN" && (
            <Link href="/admin" className="hover:text-brand">
              Administration
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link
                href="/compte"
                className="hidden text-sm font-medium text-slate-600 hover:text-brand sm:inline"
              >
                Bonjour, {session.name.split(" ")[0]}
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
                >
                  Déconnexion
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/connexion"
                className="hidden text-sm font-semibold text-slate-700 hover:text-brand sm:inline"
              >
                Connexion
              </Link>
              <Link
                href="/devis"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark"
              >
                Expédier un colis
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
