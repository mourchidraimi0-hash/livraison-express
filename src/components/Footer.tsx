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
            Votre partenaire de confiance pour la livraison rapide et le
            suivi de colis en temps réel, partout où vous en avez besoin.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Navigation
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>
              <Link href="/" className="hover:text-accent">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/suivi" className="hover:text-accent">
                Suivre un colis
              </Link>
            </li>
            <li>
              <Link href="/devis" className="hover:text-accent">
                Demander un devis
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Mon compte
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>
              <Link href="/connexion" className="hover:text-accent">
                Connexion
              </Link>
            </li>
            <li>
              <Link href="/inscription" className="hover:text-accent">
                Créer un compte
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
            <li>Service client 7j/7</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} LivraisonExpress. Tous droits réservés.
      </div>
    </footer>
  );
}
