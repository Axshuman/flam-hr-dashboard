// src/app/components/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/" },
    { label: "Analytics", href: "/analytics" },
    { label: "Bookmarks", href: "/bookmarks" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow p-4 mb-6">
      <div className="max-w-6xl mx-auto flex justify-start gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium ${
              pathname === item.href
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
