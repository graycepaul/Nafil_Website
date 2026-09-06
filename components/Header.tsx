"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { APP_LOGIN_URL } from "@/lib/config";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/download", label: "Download" },
  { href: "/contact", label: "Support" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <Image src="/logo.png" alt="Nafil Estates" width={40} height={40} />
          <span className="text-lg font-bold tracking-tight text-zinc-950">
            Nafil <span className="text-brand-800">Estates</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
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

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center text-zinc-950 md:hidden"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-zinc-100 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-brand-800"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={APP_LOGIN_URL}
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-brand-800 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Get started
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
