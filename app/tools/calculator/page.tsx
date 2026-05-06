import Link from "next/link";
import { Code2, Calculator, ArrowLeft } from "lucide-react";
import { UserNav } from "@/components/dashboard/user-nav";
import { PricingCalculator } from "@/components/tools/pricing-calculator";
import { createClient } from "@/lib/supabase/server";

export default async function PricingCalculatorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-svh flex-col bg-[#050505] text-white">
      <header className="border-b border-zinc-900 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tighter">
            <Code2 className="size-7 text-primary" />
            <span>DevBase</span>
          </Link>
          <div className="flex items-center gap-8 text-sm font-bold">
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/dashboard" className="text-zinc-500 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/projects" className="text-zinc-500 hover:text-white transition-colors">Projects</Link>
              <Link href="/leads" className="text-zinc-500 hover:text-white transition-colors">Leads</Link>
              <Link href="/finance" className="text-zinc-500 hover:text-white transition-colors">Finance</Link>
            </nav>
            <UserNav user={user} />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-8">
          <Link
            href="/finance"
            className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Back to finance
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl">
            <Calculator className="size-6 text-primary" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">Project Estimator</h1>
        </div>
        <p className="text-zinc-500 text-lg mb-12 font-medium">Quickly calculate what to charge for your next build.</p>

        <PricingCalculator />
      </main>
    </div>
  );
}
