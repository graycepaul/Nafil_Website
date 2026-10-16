import Link from "next/link";
import Image from "next/image";
import { APP_LOGIN_URL } from "@/lib/config";

const FEATURES = [
  {
    title: "Visitor passes",
    description:
      "Generate a single-use QR code for a visitor in seconds. It stops working the moment security scans it at the gate.",
  },
  {
    title: "Gate check-in",
    description:
      "Security scans a code or looks up a resident by name, logs every check-in, and gets an instant valid, expired, or revoked result.",
  },
  {
    title: "Issue reporting",
    description:
      "Residents report maintenance issues with photos straight to the estate admin, and track status until it's resolved.",
  },
  {
    title: "Announcements",
    description:
      "Admins push estate-wide updates and emergency alerts, with push notifications for anything urgent.",
  },
  {
    title: "Household & staff",
    description:
      "Give family, house help, or a regular driver their own standing gate card, no need to generate a new pass every visit.",
  },
  {
    title: "Role-based access",
    description:
      "Residents, security, and admins each get an experience built for their job, not one generic screen trying to serve everyone.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center sm:py-32">
          <Image src="/logo.png" alt="Nafil Estates" width={120} height={112} className="mb-8" />
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
            Gate access and estate management, without the paper logbook
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-600">
            Nafil Estates gives residents, security, and estate admins one app for visitor
            passes, gate check-in, issue reporting, and announcements, built for gated
            communities in Nigeria.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={APP_LOGIN_URL}
              className="rounded-full bg-brand-800 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Get started
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-zinc-200 px-8 py-3 text-base font-semibold text-zinc-950 transition-colors hover:border-brand-800 hover:text-brand-800"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-950">
            Everything the gate needs, in one app
          </h2>
          <p className="mt-4 text-base text-zinc-600">
            Built for the estate, not adapted from a generic property-management tool.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm"
            >
              <h3 className="text-base font-semibold text-zinc-950">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Managing an estate? Let&apos;s talk.
          </h2>
          <p className="mt-4 max-w-xl text-base text-brand-100">
            Nafil Estates is currently rolling out estate by estate. Reach out and we&apos;ll
            help you get your gate, residents, and staff set up.
          </p>
          <Link
            href="/contact"
            className="mt-8 rounded-full bg-white px-8 py-3 text-base font-semibold text-brand-800 transition-colors hover:bg-brand-50"
          >
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
