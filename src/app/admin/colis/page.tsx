import Link from "next/link";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/StatusBadge";
import CreateParcelForm from "@/components/CreateParcelForm";
import Reveal from "@/components/motion/Reveal";

export const metadata = {
  title: "Package Management — LivraisonExpress",
};

export default async function AdminColisPage() {
  const parcels = await prisma.parcel.findMany({
    orderBy: { createdAt: "desc" },
    include: { client: true },
  });

  return (
    <div className="space-y-6">
      <Reveal onMount>
        <CreateParcelForm />
      </Reveal>

      <Reveal onMount delay={0.1}>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-brand">
            All Packages ({parcels.length})
          </h2>
        </div>
        {parcels.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">
            No packages yet.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-6 py-3">Tracking #</th>
                <th className="px-6 py-3">Sender → Recipient</th>
                <th className="px-6 py-3">Linked Client</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {parcels.map((parcel) => (
                <tr key={parcel.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-3 font-mono font-medium text-brand">
                    {parcel.trackingNumber}
                  </td>
                  <td className="px-6 py-3 text-slate-600">
                    {parcel.senderName} → {parcel.recipientName}
                  </td>
                  <td className="px-6 py-3 text-slate-500">
                    {parcel.client?.name ?? "—"}
                  </td>
                  <td className="px-6 py-3">
                    <StatusBadge status={parcel.status} />
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Link
                      href={`/admin/colis/${parcel.id}`}
                      className="font-semibold text-brand hover:underline"
                    >
                      Manage →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      </Reveal>
    </div>
  );
}
