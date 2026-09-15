"use client";

import { useActionState } from "react";
import {
  updateQuoteStatusAction,
  type ActionState,
} from "@/app/actions/quotes";
import { STATUT_DEVIS_LABELS } from "@/lib/status";
import type { StatutDevis } from "@prisma/client";

const initialState: ActionState = {};

const STATUTS: StatutDevis[] = ["NOUVEAU", "EN_COURS", "TRAITE", "REFUSE"];

export default function UpdateQuoteForm({
  quoteId,
  currentStatus,
  currentNote,
}: {
  quoteId: string;
  currentStatus: StatutDevis;
  currentNote: string | null;
}) {
  const [state, formAction, pending] = useActionState(
    updateQuoteStatusAction,
    initialState
  );

  return (
    <form action={formAction} className="mt-3 flex flex-wrap items-end gap-3">
      <input type="hidden" name="quoteId" value={quoteId} />

      <label className="text-sm">
        <span className="mb-1 block text-xs font-medium text-slate-500">
          Status
        </span>
        <select
          name="status"
          defaultValue={currentStatus}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand"
        >
          {STATUTS.map((status) => (
            <option key={status} value={status}>
              {STATUT_DEVIS_LABELS[status]}
            </option>
          ))}
        </select>
      </label>

      <label className="flex-1 text-sm">
        <span className="mb-1 block text-xs font-medium text-slate-500">
          Internal Note
        </span>
        <input
          type="text"
          name="adminNote"
          defaultValue={currentNote ?? ""}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-light disabled:opacity-60"
      >
        {pending ? "..." : "Save"}
      </button>

      {state.error && (
        <p className="w-full text-xs text-red-600">{state.error}</p>
      )}
    </form>
  );
}
