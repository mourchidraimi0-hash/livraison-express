import type { TrackingEvent, StatutColis } from "@prisma/client";
import { STATUT_COLIS_LABELS } from "@/lib/status";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function Timeline({ events }: { events: TrackingEvent[] }) {
  const sorted = [...events].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <ol className="relative border-s-2 border-slate-200 ps-6">
      {sorted.map((event, index) => (
        <li key={event.id} className="mb-8 last:mb-0">
          <span
            className={`absolute -start-[9px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-white ${
              index === 0 ? "bg-accent" : "bg-brand"
            }`}
          />
          <p className="text-sm font-semibold text-brand">
            {STATUT_COLIS_LABELS[event.status as StatutColis]}
          </p>
          <p className="text-xs text-slate-400">{formatDate(event.createdAt)}</p>
          {event.location && (
            <p className="mt-1 text-sm text-slate-600">📍 {event.location}</p>
          )}
          {event.note && (
            <p className="mt-1 text-sm text-slate-500">{event.note}</p>
          )}
        </li>
      ))}
    </ol>
  );
}
