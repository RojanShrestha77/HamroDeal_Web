"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SELLER_LINKS = [
  { href: "/seller", label: "Dashboard" },
  { href: "/seller/products", label: "My Products" }, // ← as you requested
];

export default function SellerSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/seller" ? pathname === href : pathname?.startsWith(href);

  return (
    <aside
      className="
        fixed md:static
        top-0 left-0
        h-screen w-64
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        z-40 overflow-y-auto
      "
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <Link href="/seller" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center font-bold">
            S
          </div>
          <span className="font-semibold">Seller Panel</span>
        </Link>
      </div>

      <nav className="p-2 space-y-1">
        {SELLER_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(link.href)
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
