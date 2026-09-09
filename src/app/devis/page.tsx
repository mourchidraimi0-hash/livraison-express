import QuoteForm from "@/components/QuoteForm";

export const metadata = {
  title: "Demander un devis — LivraisonExpress",
};

export default function DevisPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand">
          Demander un devis d&apos;enlèvement
        </h1>
        <p className="mt-2 text-slate-500">
          Renseignez les informations ci-dessous, notre équipe vous
          recontacte rapidement pour organiser la livraison de votre colis.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <QuoteForm />
      </div>
    </div>
  );
}
