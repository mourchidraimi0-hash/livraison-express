"use client";

import { useActionState, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createParcelAction, type ActionState } from "@/app/actions/parcels";
import MotionButton from "@/components/motion/MotionButton";

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
          Create a New Package
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-lg text-slate-400"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
        <form action={formAction} className="mt-5 space-y-5" key={state.trackingNumber ?? "form"}>
          {state.error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </div>
          )}
          {state.success && state.trackingNumber && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
            >
              Package created successfully. Tracking number:{" "}
              <span className="font-mono font-semibold">
                {state.trackingNumber}
              </span>
            </motion.div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Sender Name" name="senderName" required />
            <Field
              label="Notification Email (the customer gets an email on every update)"
              name="clientEmail"
              type="email"
            />
          </div>
          <Field label="Sender Address" name="senderAddress" required />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Recipient Name" name="recipientName" required />
            <Field label="Recipient Phone" name="recipientPhone" type="tel" />
          </div>
          <Field label="Recipient Address" name="recipientAddress" required />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Weight (kg)" name="weightKg" type="number" />
            <Field
              label="Estimated Delivery"
              name="estimatedDelivery"
              type="date"
            />
          </div>
          <Field label="Package Description" name="description" textarea />

          <MotionButton
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-light disabled:opacity-60 sm:w-auto"
          >
            {pending ? "Creating..." : "Create Package"}
          </MotionButton>
        </form>
          </motion.div>
        )}
      </AnimatePresence>
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
