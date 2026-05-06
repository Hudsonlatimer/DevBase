import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { safeNextPath } from "@/lib/safe-redirect";
import { env } from "@/lib/env";

const PROTECTED_PREFIXES = ["/dashboard", "/projects", "/finance", "/settings", "/tools"];
const AUTH_PAGES = ["/login", "/signup"];

/**
 * Runs on every matched request before any route renders.
 *
 * Two responsibilities:
 *   1. Refresh the Supabase auth cookie if the access token has expired.
 *      Without this, sessions silently die after ~1 hour.
 *   2. Enforce route protection: redirect logged-out users away from
 *      protected paths, and bounce logged-in users off /login and /signup.
 */
export async function updateSession(request: NextRequest) {
  // Build the response shell up front. We mutate it as cookies refresh.
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Write refreshed cookies into the *inbound* request so any
          // Server Component running later in this same request sees the
          // new session...
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          // ...and rebuild the response so the *outbound* Set-Cookie header
          // tells the browser to persist the new cookie.
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // getSession() reads the cookie directly without a network round-trip.
  // This is intentional in middleware — we're only doing route protection here,
  // not reading sensitive data. Actual security is enforced via getUser() inside
  // Server Components and Server Actions. getUser() in middleware causes
  // silent failures on edge runtimes (Netlify) because it requires a live
  // network call to the Supabase auth server on every request.
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user ?? null;

  const { pathname } = request.nextUrl;

  // Logged-out user trying to access a protected route → redirect to login.
  if (!user && PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Logged-in user landing on /login or /signup → send them to the app,
  // honoring `?next=` if it's a safe internal path.
  if (user && AUTH_PAGES.includes(pathname)) {
    const next = safeNextPath(request.nextUrl.searchParams.get("next"));
    const url = request.nextUrl.clone();
    url.search = "";
    url.pathname = next ?? "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}
