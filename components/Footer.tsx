import Link from "next/link";

const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { href: "/about", label: "About" },
      { href: "/download", label: "Download" },
      { href: "/contact", label: "Support" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-100 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <span className="text-lg font-bold tracking-tight text-zinc-950">
              Nafil <span className="text-brand-800">Estates</span>
            </span>
            <p className="mt-3 text-sm text-zinc-500">
              Gate access, visitor passes, and estate management for gated communities in
              Nigeria.
            </p>
          </div>

          <div className="flex gap-16">
            {FOOTER_LINKS.map((group) => (
              <div key={group.heading}>
                <h3 className="text-sm font-semibold text-zinc-950">{group.heading}</h3>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-500 transition-colors hover:text-brand-800"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-200 pt-6 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Nafil Estates. All rights reserved.</p>
          <p>Abuja, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}
