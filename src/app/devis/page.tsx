import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/motion/Reveal";

export const metadata = {
  title: "Request a Quote — LivraisonExpress",
};

export default function DevisPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <Reveal onMount>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand">
            Request a Pickup Quote
          </h1>
          <p className="mt-2 text-slate-500">
            Fill in the details below and our team will get back to you shortly
            to arrange your package delivery.
          </p>
        </div>
      </Reveal>

      <Reveal onMount delay={0.15}>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <QuoteForm />
        </div>
      </Reveal>
    </div>
  );
}
