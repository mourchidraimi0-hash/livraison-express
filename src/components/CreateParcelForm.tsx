"use client";

import { useActionState, useState } from "react";
import { createParcelAction, type ActionState } from "@/app/actions/parcels";

const initialState: ActionState = {};

export default function CreateParcelForm() {
  const [state, formAction, pending] = useActionState(
    createParcelAction,
    initialState
  );
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-semibold text-brand">
          Créer un nouveau colis
        </span>
        <span className="text-slate-400">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <form action={formAction} className="mt-5 space-y-5" key={state.trackingNumber ?? "form"}>
          {state.error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </div>
          )}
          {state.success && state.trackingNumber && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Colis créé avec succès. Numéro de suivi :{" "}
              <span className="font-mono font-semibold">
                {state.trackingNumber}
              </span>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nom de l'expéditeur" name="senderName" required />
            <Field
              label="E-mail de notification (le client reçoit un e-mail à chaque mise à jour)"
              name="clientEmail"
              type="email"
            />
          </div>
          <Field label="Adresse de l'expéditeur" name="senderAddress" required />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nom du destinataire" name="recipientName" required />
            <Field label="Téléphone du destinataire" name="recipientPhone" type="tel" />
          </div>
          <Field label="Adresse du destinataire" name="recipientAddress" required />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Poids (kg)" name="weightKg" type="number" />
            <Field
              label="Livraison estimée"
              name="estimatedDelivery"
              type="date"
            />
          </div>
          <Field label="Description du colis" name="description" textarea />

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-light disabled:opacity-60 sm:w-auto"
          >
            {pending ? "Création..." : "Créer le colis"}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-slate-700">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={2}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-brand"
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          step={type === "number" ? "0.1" : undefined}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-brand"
        />
      )}
    </label>
  );
}
