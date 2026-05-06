import Link from "next/link";
import { Code2, ArrowLeft, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/dashboard/user-nav";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { createClient } from "@/lib/supabase/server";

export default async function LeadsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-svh flex-col bg-[#050505] text-white">
      <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-black text-lg tracking-tight">
            <Code2 className="size-5 text-primary" />
            <span>DevBase</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden items-center gap-6 text-sm font-bold md:flex">
              <Link href="/dashboard" className="text-zinc-500 transition-colors hover:text-white">Dashboard</Link>
              <Link href="/projects" className="text-zinc-500 transition-colors hover:text-white">Projects</Link>
              <Link href="/leads" className="text-white">Leads</Link>
              <Link href="/finance" className="text-zinc-500 transition-colors hover:text-white">Finance</Link>
            </nav>
            <UserNav user={user} />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 pb-24 sm:px-6 sm:py-12 md:pb-12">
        <Link href="/dashboard" className="mb-8 flex items-center gap-2 text-sm font-bold text-zinc-500 transition-colors hover:text-white">
          <ArrowLeft className="size-4" />
          Back to dashboard
        </Link>

        <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Leads</h1>
            <p className="mt-2 text-sm font-medium text-zinc-500 sm:text-base">Simple place to track prospects and follow-ups.</p>
          </div>
          <Button disabled className="h-11 rounded-xl bg-white px-5 font-bold text-black opacity-80">
            <Plus className="mr-2 size-4" />
            Add Lead
          </Button>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center sm:p-14">
          <Users className="mx-auto mb-4 size-10 text-zinc-600" />
          <h2 className="mb-2 text-xl font-bold">Leads page is in progress</h2>
          <p className="mx-auto max-w-md text-sm font-medium text-zinc-500">
            The route exists now so navigation is stable. Next step is wiring lead CRUD and statuses into this page.
          </p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
