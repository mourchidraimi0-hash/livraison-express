import Link from "next/link";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/StatusBadge";
import CountUp from "@/components/motion/CountUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import Reveal from "@/components/motion/Reveal";

export const metadata = {
  title: "Admin Dashboard — LivraisonExpress",
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
    { label: "Total Packages", value: total, icon: "📦" },
    { label: "Out for Delivery", value: enCours, icon: "🚚" },
    { label: "Delivered Packages", value: livres, icon: "✅" },
    { label: "Quotes to Process", value: devisNouveaux, icon: "🆕" },
  ];

  return (
    <div className="space-y-8">
      <StaggerGroup onMount className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-2xl">{stat.icon}</div>
            <p className="mt-3 text-2xl font-bold text-brand">
              <CountUp value={stat.value} />
            </p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal onMount delay={0.15}>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-brand">Recent Packages</h2>
            <Link
              href="/admin/colis"
              className="text-sm font-semibold text-brand hover:underline"
            >
              View All →
            </Link>
          </div>
          {dernierColis.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              No packages registered yet.{" "}
              <Link href="/admin/colis" className="font-semibold text-brand hover:underline">
                Create the first package
              </Link>
              .
            </p>
          ) : (
            <div className="mt-4 divide-y divide-slate-100">
              {dernierColis.map((parcel) => (
                <Link
                  key={parcel.id}
                  href={`/admin/colis/${parcel.id}`}
                  className="flex items-center justify-between py-3 text-sm transition-colors hover:text-brand"
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
      </Reveal>
    </div>
  );
}
