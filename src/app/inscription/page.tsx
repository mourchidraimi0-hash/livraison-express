import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
import Reveal from "@/components/motion/Reveal";

export const metadata = {
  title: "Create an Account — LivraisonExpress",
};

export default async function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
      <Reveal onMount>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand">Create an Account</h1>
          <p className="mt-2 text-slate-500">
            Track all your packages and quote requests from a single place.
          </p>
        </div>
      </Reveal>

      <Reveal onMount delay={0.15}>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <RegisterForm redirectTo={redirect || "/compte"} />
        </div>
      </Reveal>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/connexion"
          className="font-semibold text-brand hover:underline"
        >
          Log In
        </Link>
      </p>
    </div>
  );
}
