import type { StatutColis } from "@prisma/client";
import { STATUT_COLIS_COLORS, STATUT_COLIS_LABELS } from "@/lib/status";

export default function StatusBadge({ status }: { status: StatutColis }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${STATUT_COLIS_COLORS[status]}`}
    >
      {STATUT_COLIS_LABELS[status]}
    </span>
  );
}
