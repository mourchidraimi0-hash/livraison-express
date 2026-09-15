"use client";

import { useActionState } from "react";
import { createQuoteAction, type ActionState } from "@/app/actions/quotes";

const initialState: ActionState = {};

export default function QuoteForm() {
  const [state, formAction, pending] = useActionState(
    createQuoteAction,
    initialState
  );

  if (state.success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <p className="text-2xl">✅</p>
        <h3 className="mt-2 text-lg font-semibold text-emerald-700">
          Request sent!
        </h3>
        <p className="mt-2 text-sm text-emerald-700">
          Thank you, our team will review your request and get back to you
          shortly to arrange the pickup of your package.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="name" required />
        <Field label="Email Address" name="email" type="email" required />
      </div>

      <Field label="Phone" name="phone" type="tel" required />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Pickup Address"
          name="pickupAddress"
          required
          textarea
        />
        <Field
          label="Delivery Address"
          name="deliveryAddress"
          required
          textarea
        />
      </div>

      <Field
        label="Package Details (dimensions, weight, contents...)"
        name="packageDetails"
        required
        textarea
      />

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send My Quote Request"}
      </button>
    </form>
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
          rows={3}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-brand"
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-brand"
        />
      )}
    </label>
  );
}
