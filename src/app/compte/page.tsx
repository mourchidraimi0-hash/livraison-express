import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/StatusBadge";
import { STATUT_DEVIS_COLORS, STATUT_DEVIS_LABELS } from "@/lib/status";

export const metadata = {
  title: "Mon espace client — LivraisonExpress",
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand">
            Bonjour, {session.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-slate-500">
            Retrouvez ici vos colis et vos demandes de devis.
          </p>
        </div>
        {session.role === "ADMIN" && (
          <Link
            href="/admin"
            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-light"
          >
            Accéder à l&apos;administration
          </Link>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">Mes colis</h2>
        {parcels.length === 0 ? (
          <p className="mt-3 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            Vous n&apos;avez aucun colis associé à votre compte pour le
            moment.
          </p>
        ) : (
          <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3">N° de suivi</th>
                  <th className="px-4 py-3">Destinataire</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {parcels.map((parcel) => (
                  <tr key={parcel.id}>
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
                        Suivre →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">
          Mes demandes de devis
        </h2>
        {quotes.length === 0 ? (
          <p className="mt-3 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            Vous n&apos;avez soumis aucune demande de devis pour le moment.
          </p>
        ) : (
          <div className="mt-3 space-y-3">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="rounded-2xl border border-slate-200 bg-white p-4"
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
                  Envoyée le{" "}
                  {new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "long",
                  }).format(quote.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
