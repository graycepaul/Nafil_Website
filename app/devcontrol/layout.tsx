import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "devControl",
  robots: { index: false, follow: false },
};

export default function DevControlLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex-1 bg-zinc-50">{children}</div>;
}
