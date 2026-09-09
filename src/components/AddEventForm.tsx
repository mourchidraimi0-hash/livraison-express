"use client";

import { useActionState } from "react";
import {
  addTrackingEventAction,
  type ActionState,
} from "@/app/actions/parcels";
import { STATUT_COLIS_LABELS } from "@/lib/status";
import type { StatutColis } from "@prisma/client";

const initialState: ActionState = {};

const STATUTS: StatutColis[] = [
  "EN_ATTENTE",
  "PRIS_EN_CHARGE",
  "EN_TRANSIT",
  "EN_LIVRAISON",
  "LIVRE",
  "ECHEC_LIVRAISON",
  "ANNULE",
];

export default function AddEventForm({
  parcelId,
  currentStatus,
}: {
  parcelId: string;
  currentStatus: StatutColis;
}) {
  const [state, formAction, pending] = useActionState(
    addTrackingEventAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="parcelId" value={parcelId} />

      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-slate-700">
          Nouveau statut
        </span>
        <select
          name="status"
          defaultValue={currentStatus}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-brand"
        >
          {STATUTS.map((status) => (
            <option key={status} value={status}>
              {STATUT_COLIS_LABELS[status]}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-slate-700">
          Position / lieu actuel
        </span>
        <input
          type="text"
          name="location"
          placeholder="ex : Centre de tri Casablanca"
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-brand"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-slate-700">
          Note (visible par le client)
        </span>
        <textarea
          name="note"
          rows={2}
          placeholder="ex : Colis parti vers le centre de distribution"
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-brand"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark disabled:opacity-60"
      >
        {pending ? "Mise à jour..." : "Mettre à jour le suivi"}
      </button>
    </form>
  );
}
