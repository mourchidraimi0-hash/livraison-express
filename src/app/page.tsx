import Link from "next/link";
import Image from "next/image";
import TrackingForm from "@/components/TrackingForm";
import FeatureIcon, { type FeatureIconName } from "@/components/FeatureIcon";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import FloatingShapes from "@/components/motion/FloatingShapes";
import MotionLink from "@/components/motion/MotionLink";

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
        <FloatingShapes />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <Reveal onMount>
              <span className="animate-pulse-ring inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                Delivery &amp; Package Tracking
              </span>
            </Reveal>
            <Reveal onMount delay={0.1}>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                Your packages delivered fast,
                <br /> tracked in real time.
              </h1>
            </Reveal>
            <Reveal onMount delay={0.2}>
              <p className="mt-5 text-lg text-slate-300">
                LivraisonExpress connects senders and recipients with
                transparent tracking, from pickup to the recipient&apos;s door.
              </p>
            </Reveal>

            <Reveal onMount delay={0.3}>
              <div className="mt-8 rounded-2xl bg-white/5 p-4 backdrop-blur">
                <TrackingForm variant="dark" />
              </div>
            </Reveal>

            <Reveal onMount delay={0.4}>
              <div className="mt-6 flex flex-wrap gap-4">
                <MotionLink
                  href="/devis"
                  className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-dark"
                >
                  Request a Quote
                </MotionLink>
                <MotionLink
                  href="/inscription"
                  className="rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Create a Customer Account
                </MotionLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-brand sm:text-3xl">
              Why Choose LivraisonExpress?
            </h2>
            <p className="mt-2 text-slate-500">
              A platform built for reliability, speed, and transparency.
            </p>
          </div>
        </Reveal>
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <StaggerItem
              key={feature.title}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute -bottom-5 left-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
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
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="relative overflow-hidden bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-brand sm:text-3xl">
                How It Works
              </h2>
              <p className="mt-2 text-slate-500">
                Three simple steps between your request and delivery.
              </p>
            </div>
          </Reveal>
          <StaggerGroup className="grid gap-8 md:grid-cols-3">
            {STEPS.map((item, index) => (
              <StaggerItem key={item.step} className="group relative pl-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent">
                  {item.step}
                </div>
                {index < STEPS.length - 1 && (
                  <div className="absolute left-6 top-12 hidden h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-accent/40 to-transparent transition-transform duration-700 group-hover:scale-x-100 md:block" />
                )}
                <h3 className="mt-4 font-semibold text-brand">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {item.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </div>
  );
}
