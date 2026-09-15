import Link from "next/link";
import Image from "next/image";
import TrackingForm from "@/components/TrackingForm";
import FeatureIcon, { type FeatureIconName } from "@/components/FeatureIcon";

const FEATURES: {
  title: string;
  description: string;
  icon: FeatureIconName;
  image: string;
}[] = [
  {
    title: "Real-Time Tracking",
    description:
      "Follow every step of your package, from pickup to delivery, with a unique tracking number.",
    icon: "truck",
    image: "/features/suivi-temps-reel.jpg",
  },
  {
    title: "Fast Delivery",
    description:
      "An optimized network to deliver your packages safely, on the shortest timelines, wherever you are.",
    icon: "bolt",
    image: "/features/livraison-rapide.jpg",
  },
  {
    title: "Customer Portal",
    description:
      "Create an account to find the history of all your shipments and quote requests at any time.",
    icon: "user",
    image: "/features/espace-client.jpg",
  },
  {
    title: "Quick Quotes",
    description:
      "Describe your shipment and get a fast response from our team to arrange pickup.",
    icon: "clipboard",
    image: "/features/devis-rapide.jpg",
  },
];

const STEPS = [
  {
    step: "1",
    title: "Request a Quote",
    description: "Provide the pickup and delivery addresses along with your package details.",
  },
  {
    step: "2",
    title: "We Take Charge",
    description: "Our team validates the request and your package gets a unique tracking number.",
  },
  {
    step: "3",
    title: "Track the Delivery",
    description: "Follow every step in real time until it's handed off to the recipient.",
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
              Delivery &amp; Package Tracking
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Your packages delivered fast,
              <br /> tracked in real time.
            </h1>
            <p className="mt-5 text-lg text-slate-300">
              LivraisonExpress connects senders and recipients with
              transparent tracking, from pickup to the recipient&apos;s door.
            </p>

            <div className="mt-8 rounded-2xl bg-white/5 p-4 backdrop-blur">
              <TrackingForm variant="dark" />
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/devis"
                className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark"
              >
                Request a Quote
              </Link>
              <Link
                href="/inscription"
                className="rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Create a Customer Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-brand sm:text-3xl">
            Why Choose LivraisonExpress?
          </h2>
          <p className="mt-2 text-slate-500">
            A platform built for reliability, speed, and transparency.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute -bottom-5 left-5">
                  <FeatureIcon
                    name={feature.icon}
                    className="bg-white shadow-md ring-1 ring-slate-100"
                  />
                </div>
              </div>
              <div className="p-6 pt-8">
                <h3 className="font-semibold text-brand">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-brand sm:text-3xl">
              How It Works
            </h2>
            <p className="mt-2 text-slate-500">
              Three simple steps between your request and delivery.
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
    </div>
  );
}
