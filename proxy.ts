import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * devControl is served from devadmin.nafilestates.com but lives in this
 * same app under /devcontrol. On the devadmin host every path is rewritten into
 * /devcontrol; on any other host /devcontrol is hidden so the marketing domain never
 * exposes the login page.
 */
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  const { pathname } = request.nextUrl;
  const isDevHost = host.startsWith("devadmin.");

  if (isDevHost) {
    if (pathname === "/devcontrol" || pathname.startsWith("/devcontrol/")) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/devcontrol" : `/devcontrol${pathname}`;
    return NextResponse.rewrite(url);
  }

  // `localhost` stays open so the devControl can be developed locally.
  const isLocal = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  if (!isLocal && (pathname === "/devcontrol" || pathname.startsWith("/devcontrol/"))) {
    const url = request.nextUrl.clone();
    url.pathname = "/_not-found";
    return NextResponse.rewrite(url, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon|logo|download/|.*\\.(?:png|jpg|svg|ico|webp)$).*)"],
};
