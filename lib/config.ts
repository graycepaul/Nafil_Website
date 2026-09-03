/**
 * The Nafil Mobile web app (Expo Router, deployed separately) — sign-in and
 * sign-up live there, not on this marketing site.
 *
 * Driven by `NEXT_PUBLIC_APP_URL` instead of hardcoded so each environment
 * can point at the right target: local dev points at the Mobile app's own
 * local dev server (see `.env.local`), a Vercel Preview deployment can point
 * at a preview build of the app instead of production, and only the real
 * `prod` deployment needs to point at the live app.nafilestates.com — set
 * per-environment in Vercel (Project Settings → Environment Variables), not
 * here. Falls back to production so a misconfigured/missing env var fails
 * safe (links still work) rather than pointing nowhere.
 */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.nafilestates.com";
export const APP_LOGIN_URL = `${APP_URL}/login`;
