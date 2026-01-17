"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dasboard", href: "/dashboard" },
  { name: "Jobs", href: "/jobs" },
  { name: "Resume", href: "/resumes" },
  { name: "Setting", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Job Tracker</h2>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block rounded px-3 py-2 ${
                isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-800"
              }`}
            >{item.name}</Link>
          );
        })}
      </nav>
    </aside>
  );
}
