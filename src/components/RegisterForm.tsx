"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { registerAction, type ActionState } from "@/app/actions/auth";
import MotionButton from "@/components/motion/MotionButton";

const initialState: ActionState = {};

export default function RegisterForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push(redirectTo);
      router.refresh();
    }
  }, [state.success, redirectTo, router]);

  return (
    <form action={formAction} className="space-y-5">
      <AnimatePresence>
        {state.error && (
          <motion.div
            initial={{ opacity: 0, height: 0, x: -10 }}
            animate={{ opacity: 1, height: "auto", x: [0, -8, 8, -4, 4, 0] }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {state.error}
          </motion.div>
        )}
      </AnimatePresence>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-slate-700">
          Full Name
        </span>
        <input
          type="text"
          name="name"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-brand"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-slate-700">
          Email Address
        </span>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-brand"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-slate-700">
          Phone
        </span>
        <input
          type="tel"
          name="phone"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-brand"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-slate-700">
          Password
        </span>
        <input
          type="password"
          name="password"
          required
          minLength={6}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-brand"
        />
      </label>

      <MotionButton
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-light disabled:opacity-60"
      >
        {pending ? "Creating..." : "Create My Account"}
      </MotionButton>
    </form>
  );
}
