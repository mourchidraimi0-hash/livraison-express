import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/StatusBadge";
import Timeline from "@/components/Timeline";
import AddEventForm from "@/components/AddEventForm";

export const metadata = {
  title: "Détail du colis — LivraisonExpress",
};

export default async function AdminColisDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parcel = await prisma.parcel.findUnique({
    where: { id },
    include: { events: true, client: true },
  });

  if (!parcel) notFound();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Numéro de suivi
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
              Expéditeur
            </p>
            <p className="font-medium text-slate-700">{parcel.senderName}</p>
            <p className="text-slate-500">{parcel.senderAddress}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Destinataire
            </p>
            <p className="font-medium text-slate-700">
              {parcel.recipientName}
            </p>
            <p className="text-slate-500">{parcel.recipientAddress}</p>
            {parcel.recipientPhone && (
              <p className="text-slate-500">{parcel.recipientPhone}</p>
            )}
          </div>
          {parcel.client && (
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Compte client lié
              </p>
              <p className="font-medium text-slate-700">
                {parcel.client.name} ({parcel.client.email})
              </p>
            </div>
          )}
          {parcel.notifyEmail && (
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Notifications par e-mail
              </p>
              <p className="font-medium text-slate-700">
                ✉️ {parcel.notifyEmail}
              </p>
            </div>
          )}
          {parcel.description && (
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Description
              </p>
              <p className="text-slate-600">{parcel.description}</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Mettre à jour la livraison
          </h2>
          <AddEventForm parcelId={parcel.id} currentStatus={parcel.status} />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Historique
          </h2>
          <Timeline events={parcel.events} />
        </div>
      </div>
    </div>
  );
}
