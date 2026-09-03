import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { APP_LOGIN_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Get Nafil Estates on your phone, tablet, or computer. Direct Android download available now; an App Store release is coming soon — until then, the full app runs in your browser.",
};

/**
 * A direct APK from an EAS "preview" (internal-distribution) build — Android
 * doesn't require the Play Store, just "install from unknown sources", same
 * as arbinx.com/download. Hosted on Expo's own build-artifact storage for
 * now rather than self-hosted; those URLs can expire on Expo's free tier
 * (commonly ~30 days), so if this stops resolving, cut a fresh build
 * (`eas build -p android --profile preview`) and swap in its Application
 * Archive URL from `eas build:list`.
 */
const ANDROID_APK_URL = "https://expo.dev/artifacts/eas/vSDc6oXXXO2VwjiMzkj7v6n-EiGdpJM0dqqiVJs9i1c.apk";

const SCREENSHOTS = [
  { src: "/download/resident-home.png", alt: "Resident home screen in Nafil Estates", label: "Residents" },
  { src: "/download/admin-dashboard.png", alt: "Estate admin dashboard in Nafil Estates", label: "Estate admins" },
  { src: "/download/security-scan.png", alt: "Security gate scan screen in Nafil Estates", label: "Security" },
];

export default function DownloadPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center sm:py-32">
          <Image
            src="/download/app-icon.png"
            alt="Nafil Estates"
            width={96}
            height={96}
            className="mb-8 rounded-2xl shadow-lg"
          />
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
            Get Nafil Estates on your phone
          </h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-600">
            Not on the App Store or Google Play yet, but Android doesn&apos;t need either —
            download it directly below. On iPhone (or anywhere else), the full app runs right
            in your browser.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href={ANDROID_APK_URL}
              className="rounded-full bg-brand-800 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Download for Android
            </Link>
            <Link
              href={APP_LOGIN_URL}
              className="rounded-full border border-zinc-200 px-8 py-3 text-base font-semibold text-zinc-950 transition-colors hover:border-brand-800 hover:text-brand-800"
            >
              Open the web app
            </Link>
          </div>
          <p className="mt-4 text-sm text-zinc-500">Android 8.0 and above.</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold tracking-tight text-zinc-950">
          Installing the Android download
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
          Since this isn&apos;t from the Play Store, Android will ask you to confirm the
          install — that warning is normal and expected. Nafil Estates is safe.
        </p>
        <ol className="mx-auto mt-10 max-w-md space-y-6">
          {[
            "Tap “Download for Android” above and open the downloaded file.",
            "If asked, allow installs from this source in your phone's settings.",
            "Confirm the install.",
            "Open Nafil Estates and sign in.",
          ].map((step, i) => (
            <li key={step} className="flex items-start gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-800 text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-0.5 text-sm text-zinc-600">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-950">
            Built for residents, security, and estate admins
          </h2>
          <p className="mt-4 text-base text-zinc-600">
            Same app, three different jobs — sign in and you&apos;ll land on the one built for
            yours.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {SCREENSHOTS.map((shot) => (
            <div key={shot.src} className="flex flex-col items-center">
              <div className="relative aspect-[9/19.5] w-full max-w-[220px] overflow-hidden rounded-[28px] border-4 border-zinc-900 bg-white shadow-xl">
                <Image src={shot.src} alt={shot.alt} fill sizes="220px" className="object-cover object-top" />
              </div>
              <p className="mt-4 text-sm font-semibold text-zinc-950">{shot.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
            Coming soon to the app stores
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-zinc-500">
            Official listings on the App Store and Google Play are on the way. We&apos;ll link
            them here the moment they&apos;re live.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <span className="rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-400">
              App Store — coming soon
            </span>
            <span className="rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-400">
              Google Play — coming soon
            </span>
          </div>
        </div>
      </section>

      <section className="bg-brand-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Ready when you are</h2>
          <p className="mt-4 max-w-xl text-base text-brand-100">
            Download it on Android, or sign in through the web app on anything else — same
            Nafil Estates experience either way.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={ANDROID_APK_URL}
              className="rounded-full bg-white px-8 py-3 text-base font-semibold text-brand-800 transition-colors hover:bg-brand-50"
            >
              Download for Android
            </Link>
            <Link
              href={APP_LOGIN_URL}
              className="rounded-full border border-white/40 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Open the web app
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
