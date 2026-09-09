import Link from "next/link";
import TrackingForm from "@/components/TrackingForm";

const FEATURES = [
  {
    title: "Suivi en temps réel",
    description:
      "Suivez chaque étape de votre colis, de la prise en charge à la livraison, grâce à un numéro de suivi unique.",
    icon: "🚚",
  },
  {
    title: "Livraison rapide",
    description:
      "Un réseau optimisé pour livrer vos colis en toute sécurité, dans les meilleurs délais, partout où vous êtes.",
    icon: "⚡",
  },
  {
    title: "Espace client",
    description:
      "Créez un compte pour retrouver l'historique de tous vos envois et de vos demandes de devis à tout moment.",
    icon: "👤",
  },
  {
    title: "Devis rapide",
    description:
      "Décrivez votre envoi et recevez une prise en charge rapide de notre équipe pour organiser l'enlèvement.",
    icon: "📋",
  },
];

const STEPS = [
  {
    step: "1",
    title: "Demandez un devis",
    description: "Renseignez les adresses d'enlèvement et de livraison ainsi que les détails de votre colis.",
  },
  {
    step: "2",
    title: "Nous prenons en charge",
    description: "Notre équipe valide la demande et votre colis reçoit un numéro de suivi unique.",
  },
  {
    step: "3",
    title: "Suivez la livraison",
    description: "Suivez chaque étape en temps réel jusqu'à la remise en main propre au destinataire.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-brand">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
              Livraison &amp; suivi de colis
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Vos colis livrés vite,
              <br /> suivis en temps réel.
            </h1>
            <p className="mt-5 text-lg text-slate-300">
              LivraisonExpress connecte expéditeurs et destinataires avec un
              suivi transparent, de l&apos;enlèvement jusqu&apos;à la porte
              du destinataire.
            </p>

            <div className="mt-8 rounded-2xl bg-white/5 p-4 backdrop-blur">
              <TrackingForm variant="dark" />
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/devis"
                className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark"
              >
                Demander un devis
              </Link>
              <Link
                href="/inscription"
                className="rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Créer un compte client
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-brand sm:text-3xl">
            Pourquoi choisir LivraisonExpress ?
          </h2>
          <p className="mt-2 text-slate-500">
            Une plateforme pensée pour la fiabilité, la rapidité et la
            transparence.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="mt-4 font-semibold text-brand">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-brand sm:text-3xl">
              Comment ça marche
            </h2>
            <p className="mt-2 text-slate-500">
              Trois étapes simples entre votre demande et la livraison.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((item) => (
              <div key={item.step} className="relative pl-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 font-semibold text-brand">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-brand px-8 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Prêt à expédier votre prochain colis ?
            </h2>
            <p className="mt-2 text-slate-300">
              Demandez un devis gratuit en quelques minutes.
            </p>
          </div>
          <Link
            href="/devis"
            className="whitespace-nowrap rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark"
          >
            Demander un devis
          </Link>
        </div>
      </section>
    </div>
  );
}
