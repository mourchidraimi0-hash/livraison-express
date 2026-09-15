import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Log In — LivraisonExpress",
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
        <h1 className="text-3xl font-bold text-brand">Log In</h1>
        <p className="mt-2 text-slate-500">
          Access your customer portal to track your shipments.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <LoginForm redirectTo={redirect || "/compte"} />
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account yet?{" "}
        <Link
          href="/inscription"
          className="font-semibold text-brand hover:underline"
        >
          Create an Account
        </Link>
      </p>
    </div>
  );
}
