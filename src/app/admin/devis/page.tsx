import { prisma } from "@/lib/prisma";
import { STATUT_DEVIS_COLORS, STATUT_DEVIS_LABELS } from "@/lib/status";
import UpdateQuoteForm from "@/components/UpdateQuoteForm";

export const metadata = {
  title: "Demandes de devis — LivraisonExpress",
};

export default async function AdminDevisPage() {
  const quotes = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-brand">
        Demandes de devis ({quotes.length})
      </h2>

      {quotes.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          Aucune demande de devis pour le moment.
        </p>
      ) : (
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-800">
                    {quote.name}{" "}
                    <span className="font-normal text-slate-400">
                      · {quote.email} · {quote.phone}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {quote.pickupAddress} → {quote.deliveryAddress}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {quote.packageDetails}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Envoyée le{" "}
                    {new Intl.DateTimeFormat("fr-FR", {
                      dateStyle: "long",
                      timeStyle: "short",
                    }).format(quote.createdAt)}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${STATUT_DEVIS_COLORS[quote.status]}`}
                >
                  {STATUT_DEVIS_LABELS[quote.status]}
                </span>
              </div>

              <UpdateQuoteForm
                quoteId={quote.id}
                currentStatus={quote.status}
                currentNote={quote.adminNote}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
