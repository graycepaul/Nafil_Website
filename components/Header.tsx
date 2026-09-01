import Link from "next/link";
import Image from "next/image";
import { APP_LOGIN_URL } from "@/lib/config";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/download", label: "Download" },
  { href: "/contact", label: "Support" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Nafil Estates" width={40} height={40} />
          <span className="text-lg font-bold tracking-tight text-zinc-950">
            Nafil <span className="text-brand-800">Estates</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-brand-800"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={APP_LOGIN_URL}
            className="rounded-full bg-brand-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
