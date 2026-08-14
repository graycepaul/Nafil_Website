import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://nafilestates.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nafil Estates — Gate access and estate management",
    template: "%s | Nafil Estates",
  },
  description:
    "Nafil Estates is a gate access and estate management app for gated communities — visitor passes, issue reporting, announcements, and secure gate check-in.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Nafil Estates — Gate access and estate management",
    description:
      "Visitor passes, issue reporting, announcements, and secure gate check-in for gated communities.",
    url: siteUrl,
    siteName: "Nafil Estates",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-zinc-950">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
