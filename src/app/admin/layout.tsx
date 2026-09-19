import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/colis", label: "Packages", icon: "📦" },
  { href: "/admin/devis", label: "Quote Requests", icon: "📋" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/connexion?redirect=/admin");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
          Admin Area
        </span>
        <h1 className="mt-2 text-2xl font-bold text-brand">
          Delivery Management
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:translate-x-1 hover:bg-slate-100 hover:text-brand"
            >
              <span className="inline-block transition-transform duration-200 group-hover:scale-125">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div>{children}</div>
      </div>
    </div>
  );
}
