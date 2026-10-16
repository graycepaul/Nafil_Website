import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern your use of the Nafil Estates app.",
};

const LAST_UPDATED = "10 August 2026";
const SUPPORT_EMAIL = "support@nafilestates.com";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-semibold text-brand-800">Legal</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-950">
        Terms &amp; Conditions
      </h1>
      <p className="mt-4 text-sm text-zinc-500">Last updated: {LAST_UPDATED}</p>

      <div className="mt-10 space-y-10 text-base leading-7 text-zinc-600">
        <section>
          <h2 className="text-xl font-semibold text-zinc-950">1. Acceptance of terms</h2>
          <p className="mt-3">
            These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of
            the Nafil Estates mobile application (the &quot;App&quot;), operated by Nafil
            Estates (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), based in Abuja,
            Nigeria. By creating an account or otherwise using the App, you agree to be bound
            by these Terms. If you do not agree, do not use the App.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-950">2. Eligibility and accounts</h2>
          <p className="mt-3">
            The App is available to residents, security personnel, and administrators of
            gated communities that use Nafil Estates. You must be at least 18 years old to
            create an account. Resident accounts require approval by your estate&apos;s
            administrator, and security/admin accounts require an invitation from the estate.
          </p>
          <p className="mt-3">
            You&apos;re responsible for keeping your login credentials confidential and for
            all activity that happens under your account. Tell us immediately at{" "}
            {SUPPORT_EMAIL} if you suspect unauthorized access to your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-950">3. Acceptable use</h2>
          <p className="mt-3">You agree not to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Generate a visitor pass or household code for anyone you do not intend to grant genuine access to your estate.</li>
            <li>Share, resell, or transfer visitor passes, codes, or gate access to unauthorized third parties.</li>
            <li>Submit false issue reports, announcements, or identity information.</li>
            <li>Attempt to access another resident&apos;s account, another estate&apos;s data, or any part of the App you&apos;re not authorized to use.</li>
            <li>Interfere with, reverse-engineer, or disrupt the App or the systems it relies on.</li>
            <li>Use the App for any unlawful purpose or in a way that endangers the safety or security of an estate, its residents, staff, or visitors.</li>
          </ul>
          <p className="mt-3">
            We may suspend or terminate your account if we reasonably believe you&apos;ve
            violated these Terms, particularly where estate security is at risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-950">4. Visitor passes and gate access</h2>
          <p className="mt-3">
            Visitor passes are single-use: a pass stops working as soon as security scans it
            at the gate, or once it expires unused. Nafil Estates provides the App as a tool
            to help estates manage gate access; final responsibility for who is granted
            physical access to an estate rests with the estate&apos;s own security personnel
            and administrators, not with Nafil Estates.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-950">5. Content you submit</h2>
          <p className="mt-3">
            You&apos;re responsible for the accuracy of information you submit through the
            App, including visitor details, issue reports, and photos. You retain ownership
            of content you submit, and grant us a license to store, process, and display it
            within the App as necessary to provide the service, including to the relevant
            security personnel and administrators of your estate.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-950">6. Service availability</h2>
          <p className="mt-3">
            We aim to keep the App available and reliable, but we don&apos;t guarantee
            uninterrupted access. The App depends on your device&apos;s network connection,
            and features like gate check-in should not be treated as a substitute for an
            estate&apos;s own physical security measures and personnel.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-950">7. Limitation of liability</h2>
          <p className="mt-3">
            To the fullest extent permitted by law, Nafil Estates is not liable for any
            indirect, incidental, or consequential damages arising from your use of the App,
            including but not limited to security incidents at an estate, disputes between
            residents and visitors, or reliance on issue-tracking or announcement features.
            The App is provided &quot;as is&quot; without warranties of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-950">8. Termination</h2>
          <p className="mt-3">
            You may stop using the App and request account deletion at any time, as described
            in our{" "}
            <a href="/privacy" className="font-medium text-brand-800 underline">
              Privacy Policy
            </a>
            . We may suspend or terminate access to the App, in whole or in part, if required
            by an estate administrator, for a violation of these Terms, or if we discontinue
            the App.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-950">9. Changes to these terms</h2>
          <p className="mt-3">
            We may update these Terms from time to time. If we make material changes,
            we&apos;ll update the &quot;Last updated&quot; date above and, where appropriate,
            notify you through the App. Continued use of the App after a change means you
            accept the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-950">10. Governing law</h2>
          <p className="mt-3">
            These Terms are governed by the laws of the Federal Republic of Nigeria, and any
            disputes arising from them will be subject to the exclusive jurisdiction of the
            courts of Abuja, Nigeria.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-950">11. Contact us</h2>
          <p className="mt-3">
            Questions about these Terms can be sent to{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-brand-800 underline">
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
