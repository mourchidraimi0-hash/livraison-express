import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export const metadata = {
  title: "Créer un compte — LivraisonExpress",
};

export default async function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand">Créer un compte</h1>
        <p className="mt-2 text-slate-500">
          Suivez tous vos colis et vos demandes de devis depuis un espace
          unique.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <RegisterForm redirectTo={redirect || "/compte"} />
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        Déjà un compte ?{" "}
        <Link
          href="/connexion"
          className="font-semibold text-brand hover:underline"
        >
          Se connecter
        </Link>
      </p>
    </div>
  );
}
