import Link from "next/link";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/StatusBadge";

export const metadata = {
  title: "Tableau de bord admin — LivraisonExpress",
};

export default async function AdminDashboardPage() {
  const [total, enCours, livres, devisNouveaux, dernierColis] =
    await Promise.all([
      prisma.parcel.count(),
      prisma.parcel.count({
        where: { status: { in: ["EN_ATTENTE", "PRIS_EN_CHARGE", "EN_TRANSIT", "EN_LIVRAISON"] } },
      }),
      prisma.parcel.count({ where: { status: "LIVRE" } }),
      prisma.quoteRequest.count({ where: { status: "NOUVEAU" } }),
      prisma.parcel.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "Colis au total", value: total, icon: "📦" },
    { label: "En cours de livraison", value: enCours, icon: "🚚" },
    { label: "Colis livrés", value: livres, icon: "✅" },
    { label: "Devis à traiter", value: devisNouveaux, icon: "🆕" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="text-2xl">{stat.icon}</div>
            <p className="mt-3 text-2xl font-bold text-brand">
              {stat.value}
            </p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-brand">Colis récents</h2>
          <Link
            href="/admin/colis"
            className="text-sm font-semibold text-brand hover:underline"
          >
            Voir tout →
          </Link>
        </div>
        {dernierColis.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            Aucun colis enregistré pour le moment.{" "}
            <Link href="/admin/colis" className="font-semibold text-brand hover:underline">
              Créer le premier colis
            </Link>
            .
          </p>
        ) : (
          <div className="mt-4 divide-y divide-slate-100">
            {dernierColis.map((parcel) => (
              <Link
                key={parcel.id}
                href={`/admin/colis/${parcel.id}`}
                className="flex items-center justify-between py-3 text-sm hover:text-brand"
              >
                <div>
                  <p className="font-mono font-medium text-brand">
                    {parcel.trackingNumber}
                  </p>
                  <p className="text-slate-500">
                    {parcel.senderName} → {parcel.recipientName}
                  </p>
                </div>
                <StatusBadge status={parcel.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
