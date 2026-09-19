import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/StatusBadge";
import { STATUT_DEVIS_COLORS, STATUT_DEVIS_LABELS } from "@/lib/status";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

export const metadata = {
  title: "My Account — LivraisonExpress",
};

export default async function ComptePage() {
  const session = await getSession();
  if (!session) redirect("/connexion?redirect=/compte");

  const [parcels, quotes] = await Promise.all([
    prisma.parcel.findMany({
      where: { clientId: session.userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.quoteRequest.findMany({
      where: { clientId: session.userId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <Reveal onMount>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-brand">
              Hi, {session.name.split(" ")[0]}
            </h1>
            <p className="mt-1 text-slate-500">
              Find your packages and quote requests here.
            </p>
          </div>
          {session.role === "ADMIN" && (
            <Link
              href="/admin"
              className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-light"
            >
              Go to Admin
            </Link>
          )}
        </div>
      </Reveal>

      <Reveal onMount delay={0.1}>
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">My Packages</h2>
        {parcels.length === 0 ? (
          <p className="mt-3 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            You don&apos;t have any packages linked to your account yet.
          </p>
        ) : (
          <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3">Tracking #</th>
                  <th className="px-4 py-3">Recipient</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {parcels.map((parcel) => (
                  <tr key={parcel.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono font-medium text-brand">
                      {parcel.trackingNumber}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {parcel.recipientName}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={parcel.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/suivi?code=${parcel.trackingNumber}`}
                        className="font-semibold text-brand hover:underline"
                      >
                        Track →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      </Reveal>

      <Reveal onMount delay={0.2}>
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">
          My Quote Requests
        </h2>
        {quotes.length === 0 ? (
          <p className="mt-3 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            You haven&apos;t submitted any quote requests yet.
          </p>
        ) : (
          <StaggerGroup onMount className="mt-3 space-y-3">
            {quotes.map((quote) => (
              <StaggerItem
                key={quote.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-700">
                    {quote.pickupAddress} → {quote.deliveryAddress}
                  </p>
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${STATUT_DEVIS_COLORS[quote.status]}`}
                  >
                    {STATUT_DEVIS_LABELS[quote.status]}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Sent on{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "long",
                  }).format(quote.createdAt)}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
      </Reveal>
    </div>
  );
}
