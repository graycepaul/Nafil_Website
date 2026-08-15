import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Contact Nafil Estates support for help with your account, gate access issues, or to delete your account and data.",
};

const SUPPORT_EMAIL = "support@nafilestates.com";

const FAQS = [
  {
    question: "I'm a resident. How do I get access to the app?",
    answer:
      "Your estate's admin sends an invite, or you can request to join your estate from the app's sign-up flow. An admin approves the request before you get access.",
  },
  {
    question: "A visitor pass isn't working at the gate. What do I do?",
    answer:
      "Each pass works once and stops working after security scans it, so a pass that's already been used or has expired won't scan again. Generate a new pass from the Visitors tab, or reach out to us below if something looks wrong.",
  },
  {
    question: "How do I delete my account and data?",
    answer:
      "Open the App, go to Settings, and tap 'Delete my account'. This immediately and " +
      "permanently deletes your profile, visitor passes, issues, and any other personal data " +
      "tied to your account. This can't be undone. If you'd rather not use the App, email us " +
      "at " +
      SUPPORT_EMAIL +
      " from the address on your account, or ask your estate admin to remove you, and we'll " +
      "delete it within 30 days instead.",
  },
  {
    question: "I found a bug or something's broken.",
    answer: "Email us with what happened and, if you can, a screenshot. We read every message.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-semibold text-brand-800">Support</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-950">
        We&apos;re here to help
      </h1>
      <p className="mt-4 text-base leading-7 text-zinc-600">
        App problems, account access, estate onboarding, or account deletion, reach us
        directly and we&apos;ll get back to you.
      </p>

      <a
        href={`mailto:${SUPPORT_EMAIL}`}
        className="mt-8 inline-flex rounded-full bg-brand-800 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-700"
      >
        {SUPPORT_EMAIL}
      </a>

      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
          Frequently asked questions
        </h2>
        <dl className="mt-8 space-y-8">
          {FAQS.map((faq) => (
            <div key={faq.question}>
              <dt className="text-base font-semibold text-zinc-950">{faq.question}</dt>
              <dd className="mt-2 text-base leading-7 text-zinc-600">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
