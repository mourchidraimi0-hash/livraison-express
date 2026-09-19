import MotionButton from "@/components/motion/MotionButton";

export default function TrackingForm({
  defaultValue,
  variant = "light",
}: {
  defaultValue?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <form
      action="/suivi"
      method="GET"
      className={`flex w-full flex-col gap-3 sm:flex-row ${
        isDark ? "" : ""
      }`}
    >
      <input
        type="text"
        name="code"
        defaultValue={defaultValue}
        placeholder="Enter your tracking number (e.g. LE1A2B3C4D5)"
        required
        className={`w-full flex-1 rounded-xl border px-4 py-3 text-sm font-medium outline-none transition ${
          isDark
            ? "border-white/20 bg-white/10 text-white placeholder:text-slate-300 focus:border-accent"
            : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-brand"
        }`}
      />
      <MotionButton
        type="submit"
        className="whitespace-nowrap rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-dark"
      >
        Track My Package
      </MotionButton>
    </form>
  );
}
