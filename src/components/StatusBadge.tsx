import type { StatutColis } from "@prisma/client";
import { STATUT_COLIS_COLORS, STATUT_COLIS_LABELS } from "@/lib/status";

const ACTIVE_STATUSES: StatutColis[] = [
  "EN_ATTENTE",
  "PRIS_EN_CHARGE",
  "EN_TRANSIT",
  "EN_LIVRAISON",
];

export default function StatusBadge({ status }: { status: StatutColis }) {
  const isActive = ACTIVE_STATUSES.includes(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${STATUT_COLIS_COLORS[status]}`}
    >
      {isActive && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {STATUT_COLIS_LABELS[status]}
    </span>
  );
}
