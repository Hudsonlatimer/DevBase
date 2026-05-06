import Link from "next/link";
import { 
  Code2, 
  ArrowLeft, 
  TrendingUp, 
  Target, 
  Zap, 
  ShieldCheck,
  MessageSquare,
  DollarSign
} from "lucide-react";
import { UserNav } from "@/components/dashboard/user-nav";
import { createClient } from "@/lib/supabase/server";
import type { LucideIcon } from "lucide-react";

export default async function GrowthGuidePage() {
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
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-8 text-sm font-bold">
              <Link href="/dashboard" className="text-zinc-500 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/projects" className="text-zinc-500 hover:text-white transition-colors">Projects</Link>
              <Link href="/leads" className="text-zinc-500 hover:text-white transition-colors">Leads</Link>
              <Link href="/finance" className="text-zinc-500 hover:text-white transition-colors">Finance</Link>
            </nav>
            <UserNav user={user} />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
        <div className="mb-12">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold mb-8"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Back to dashboard
          </Link>
          <h1 className="text-5xl font-black tracking-tight mb-4 leading-tight">The Freelance <br /> Growth Guide</h1>
          <p className="text-zinc-500 text-xl font-medium max-w-2xl">How to scale from a solo dev to a high-earning agency. No fluff, just the blueprint.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <GuideCard 
            icon={Target}
            title="Focus on Niche"
            content="Stop being a Full Stack Developer. Be the Next.js Expert for Fintech or SEO Specialist for Dentists. Specificity = Higher Rates."
          />
          <GuideCard 
            icon={Zap}
            title="Value-Based Pricing"
            content="Do not charge for hours. Charge for the value you bring. A $5k project that saves a client $50k/year is a steal. Use the Estimator tool to find your floor."
          />
          <GuideCard 
            icon={MessageSquare}
            title="Always Be Selling"
            content="Your lead pipeline should never be empty. Even when fully booked, keep 2-3 hours a week for outreach. Upload new leads every Monday."
          />
          <GuideCard 
            icon={ShieldCheck}
            title="Ship Fast, Iterate"
            content="The best projects are the ones that are live. Do not let perfectionism kill your momentum. Use DevBase to track deadlines and stay accountable."
          />
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[40px] p-12 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-6 italic">The Golden Rule.</h2>
            <p className="text-zinc-400 text-lg font-medium leading-relaxed mb-8 max-w-2xl">
              &quot;Your income is a direct reflection of the number of people you help and the difficulty of the problems you solve.&quot;
            </p>
            <div className="flex gap-4">
              <div className="bg-zinc-950 border border-zinc-800 px-6 py-3 rounded-2xl flex items-center gap-3">
                <DollarSign className="size-5 text-primary" />
                <span className="font-bold">Solve Hard Problems</span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 px-6 py-3 rounded-2xl flex items-center gap-3">
                <TrendingUp className="size-5 text-primary" />
                <span className="font-bold">Automate the Rest</span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[120px] rounded-full -mr-20 -mt-20" />
        </div>
      </main>
    </div>
  );
}

function GuideCard({ icon: Icon, title, content }: { icon: LucideIcon; title: string; content: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition-colors">
      <div className="bg-zinc-950 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-zinc-800">
        <Icon className="size-6 text-primary" />
      </div>
      <h3 className="text-xl font-black mb-3">{title}</h3>
      <p className="text-zinc-500 font-medium leading-relaxed">{content}</p>
    </div>
  );
}
