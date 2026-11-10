import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { APP_LOGIN_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Get Nafil Estates on your phone. Available now on the App Store and Google Play.",
};

/** Live App Store listing - update if the numeric app id ever changes. */
const IOS_APP_STORE_URL = "https://apps.apple.com/us/app/nafil-estates/id6801795360";

/** Live Google Play listing. */
const ANDROID_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.graycepaul.nafilestate";

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
            Available now on the App Store and Google Play. Prefer not to install anything? The
            full app runs right in your browser.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href={IOS_APP_STORE_URL}
              className="rounded-full bg-brand-800 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Download for iPhone
            </Link>
            <Link
              href={ANDROID_PLAY_STORE_URL}
              className="rounded-full border border-zinc-200 px-8 py-3 text-base font-semibold text-zinc-950 transition-colors hover:border-brand-800 hover:text-brand-800"
            >
              Download for Android
            </Link>
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            <Link href={APP_LOGIN_URL} className="underline underline-offset-2 hover:text-brand-800">
              Or open the web app
            </Link>{" "}
            on anything else.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-950">
            Built for residents, security, and estate admins
          </h2>
          <p className="mt-4 text-base text-zinc-600">
            One app, three experiences. Sign in and you&apos;ll land on the one built for you.
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
            Available on the App Store and Google Play
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-zinc-500">
            Download the app on your iPhone or Android phone, or use the web app on anything else.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={IOS_APP_STORE_URL}
              className="rounded-full border border-brand-800 bg-white px-6 py-3 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50"
            >
              App Store: Live now
            </Link>
            <Link
              href={ANDROID_PLAY_STORE_URL}
              className="rounded-full border border-brand-800 bg-white px-6 py-3 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50"
            >
              Google Play: Live now
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Ready when you are</h2>
          <p className="mt-4 max-w-xl text-base text-brand-100">
            Download it on iPhone or Android, or sign in through the web app on anything else.
            Same experience, either way.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={IOS_APP_STORE_URL}
              className="rounded-full bg-white px-8 py-3 text-base font-semibold text-brand-800 transition-colors hover:bg-brand-50"
            >
              Download for iPhone
            </Link>
            <Link
              href={ANDROID_PLAY_STORE_URL}
              className="rounded-full border border-white/40 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Download for Android
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
