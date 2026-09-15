import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-brand text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/logo-mark.png"
              alt="LivraisonExpress"
              width={40}
              height={24}
              className="h-8 w-auto"
            />
            <div className="text-lg font-bold text-white">
              Livraison<span className="text-accent">Express</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-300">
            Your trusted partner for fast delivery and real-time package
            tracking, wherever you need it.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Navigation
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link href="/suivi" className="hover:text-accent">
                Track a Package
              </Link>
            </li>
            <li>
              <Link href="/devis" className="hover:text-accent">
                Request a Quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            My Account
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>
              <Link href="/connexion" className="hover:text-accent">
                Log in
              </Link>
            </li>
            <li>
              <Link href="/inscription" className="hover:text-accent">
                Create an Account
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Contact
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>support@livraisonexpress.fr</li>
            <li>+212 5 00 00 00 00</li>
            <li>Customer service, 7 days a week</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} LivraisonExpress. All rights reserved.
      </div>
    </footer>
  );
}
