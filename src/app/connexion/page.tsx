import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Connexion — LivraisonExpress",
};

export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand">Connexion</h1>
        <p className="mt-2 text-slate-500">
          Accédez à votre espace client pour suivre vos envois.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <LoginForm redirectTo={redirect || "/compte"} />
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        Pas encore de compte ?{" "}
        <Link
          href="/inscription"
          className="font-semibold text-brand hover:underline"
        >
          Créer un compte
        </Link>
      </p>
    </div>
  );
}
