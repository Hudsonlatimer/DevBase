import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/dashboard';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://devbasehq.xyz";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Force absolute redirect to the production domain
      return NextResponse.redirect(`${siteUrl}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${siteUrl}/login?error=Could not authenticate`);
}
