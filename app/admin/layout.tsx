import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Products", href: "/admin/products" },
    { name: "Orders", href: "/admin/orders" },
    { name: "Analytics", href: "/admin/analytics" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b">
        <div className="container flex h-14 items-center px-4">
          <Link
            href="/admin/dashboard"
            className="mr-6 flex items-center space-x-2"
          >
            <span className="font-bold">GadgetNest Admin</span>
          </Link>
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/" className="text-sm">
              View Site
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
