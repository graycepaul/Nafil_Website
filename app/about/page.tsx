import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nafil Estates is an estate management platform built for gated communities in Nigeria, replacing paper visitor logs and separate radio calls with one app for residents, security, and admins.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-semibold text-brand-800">About us</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-950">
        Built for the gate, not adapted for it
      </h1>

      <div className="mt-10 space-y-6 text-base leading-7 text-zinc-600">
        <p>
          Nafil Estates started with a simple observation: most gated communities run their
          gate on a paper logbook, a WhatsApp group, and a security guard&apos;s memory. A
          visitor calls ahead, the resident calls the gate, and everyone hopes the message
          gets through in time. When it doesn&apos;t, visitors wait outside and residents
          field phone calls they shouldn&apos;t have to make.
        </p>
        <p>
          We built Nafil Estates to replace that with something that actually works for the
          three people who touch the gate every day: the resident generating a pass for a
          visitor, the security officer checking someone in, and the estate admin who needs
          to know what&apos;s happening across the whole community, not just one unit.
        </p>
        <p>
          Instead of one generic screen serving everyone, each role gets an app built for
          their job. Residents generate single-use visitor passes and report issues around
          their home. Security scans a QR code or looks a resident up by name, and gets an
          instant answer on whether a pass is valid. Admins manage residents, track
          maintenance issues, and send announcements, including emergency alerts, to the
          whole estate at once.
        </p>
        <p>
          Nafil Estates is currently rolling out estate by estate in Nigeria. If you manage a
          gated community and want to see it in action, we&apos;d like to hear from you.
        </p>
      </div>

      <div className="mt-12">
        <Link
          href="/contact"
          className="inline-flex rounded-full bg-brand-800 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
