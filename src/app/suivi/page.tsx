import Link from "next/link";
import { prisma } from "@/lib/prisma";
import TrackingForm from "@/components/TrackingForm";
import StatusBadge from "@/components/StatusBadge";
import Timeline from "@/components/Timeline";
import Reveal from "@/components/motion/Reveal";

export const metadata = {
  title: "Track a Package — LivraisonExpress",
};

export default async function SuiviPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  const trackingNumber = code?.trim().toUpperCase();

  const parcel = trackingNumber
    ? await prisma.parcel.findUnique({
        where: { trackingNumber },
        include: { events: true },
      })
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Reveal onMount>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand">Track a Package</h1>
          <p className="mt-2 text-slate-500">
            Enter your tracking number to see the status of your delivery in
            real time.
          </p>
        </div>
      </Reveal>

      <Reveal onMount delay={0.1}>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <TrackingForm defaultValue={trackingNumber} />
        </div>
      </Reveal>

      {trackingNumber && !parcel && (
        <Reveal onMount>
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            No package found for tracking number{" "}
            <span className="font-semibold">{trackingNumber}</span>. Please
            check your tracking number and try again.
          </div>
        </Reveal>
      )}

      {parcel && (
        <Reveal onMount>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Tracking Number
              </p>
              <p className="font-mono text-lg font-semibold text-brand">
                {parcel.trackingNumber}
              </p>
            </div>
            <StatusBadge status={parcel.status} />
          </div>

          <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Sender
              </p>
              <p className="font-medium text-slate-700">{parcel.senderName}</p>
              <p className="text-slate-500">{parcel.senderAddress}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Recipient
              </p>
              <p className="font-medium text-slate-700">
                {parcel.recipientName}
              </p>
              <p className="text-slate-500">{parcel.recipientAddress}</p>
            </div>
          </div>

          {parcel.currentLocation && (
            <p className="mt-4 text-sm text-slate-600">
              📍 Current location:{" "}
              <span className="font-medium">{parcel.currentLocation}</span>
            </p>
          )}

          <div className="mt-8">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Delivery History
            </h2>
            <Timeline events={parcel.events} />
          </div>
        </div>
        </Reveal>
      )}

      <p className="mt-8 text-center text-sm text-slate-500">
        Don&apos;t have a package yet?{" "}
        <Link href="/devis" className="font-semibold text-brand hover:underline">
          Request a Quote
        </Link>
      </p>
    </div>
  );
}
