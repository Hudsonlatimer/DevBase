import Link from "next/link";
import {
  Code2,
  DollarSign,
  Briefcase,
  CheckCircle2,
  Clock,
  TrendingUp,
  Calculator,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/dashboard/user-nav";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { TaskList } from "@/components/dashboard/task-list";
import { AnalyticsChart, PipelineChart } from "@/components/dashboard/analytics-chart";
import {
  computeConversionRate,
  getActiveProjectsCount,
  getProjectCounts,
  getRecentProjects,
  getFinanceMetrics,
  getMonthlyRevenue,
  getRecentTasks,
} from "@/lib/dashboard/queries";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  planning:    "Planning",
  development: "Dev",
  testing:     "Testing",
  completed:   "Completed",
  on_hold:     "On Hold",
};

export async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [activeProjects, projectCounts, recentProjects, finance, monthlyRevenue, recentTasks] =
    await Promise.all([
      getActiveProjectsCount(supabase),
      getProjectCounts(supabase),
      getRecentProjects(supabase),
      getFinanceMetrics(supabase),
      getMonthlyRevenue(supabase),
      getRecentTasks(supabase),
    ]);

  const conversionRate = computeConversionRate(projectCounts);
  const formattedRate = conversionRate === null ? "—" : `${conversionRate.toFixed(0)}%`;

  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="flex min-h-svh flex-col bg-[#050505] text-white">
      <header className="border-b border-zinc-900 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 sm:px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-black text-lg tracking-tighter">
            <Code2 className="size-5 text-primary" />
            <span>DevBase</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
              <Link href="/dashboard" className="text-white">Dashboard</Link>
              <Link href="/projects" className="text-zinc-500 hover:text-white transition-colors">Projects</Link>
              <Link href="/finance"  className="text-zinc-500 hover:text-white transition-colors">Finance</Link>
            </nav>
            <UserNav user={user} />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6 py-6 sm:py-12 pb-24 md:pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">Overview</h1>
            <p className="text-zinc-500 font-medium text-sm sm:text-lg">
              Just the facts, {user?.email?.split("@")[0]}.
            </p>
          </div>
          <Button asChild className="rounded-full bg-white text-black hover:bg-zinc-200 font-bold px-8 h-12 shadow-xl w-full sm:w-auto">
            <Link href="/projects/new"><Plus className="mr-2 size-4" /> New Project</Link>
          </Button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
          <StatCard title="Active Projects" value={activeProjects}           icon={Briefcase}    />
          <StatCard title="Revenue"         value={fmt.format(finance.totalRevenue)} icon={DollarSign}   />
          <StatCard title="Completed"       value={projectCounts.completed}  icon={CheckCircle2} accent="emerald" />
          <StatCard title="Win Rate"        value={formattedRate}            icon={TrendingUp}   accent="blue" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <AnalyticsChart data={monthlyRevenue} />
          <PipelineChart counts={projectCounts} />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left: recent projects */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Recent Projects */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/30">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Recent Projects</h2>
                <Link href="/projects" className="text-primary text-xs font-bold hover:underline">View All</Link>
              </div>
              {recentProjects.length === 0 ? (
                <div className="py-16 text-center text-zinc-600 font-medium text-sm">No projects yet.</div>
              ) : (
                <div className="divide-y divide-zinc-800">
                  {recentProjects.map((p) => (
                    <Link key={p.id} href="/projects" className="flex items-center justify-between px-6 py-4 hover:bg-zinc-800/30 transition-colors group">
                      <div className="flex-1 min-w-0 mr-4">
                        <p className="font-bold text-sm group-hover:text-primary transition-colors truncate">{p.project_name}</p>
                        <p className="text-xs text-zinc-500 font-medium truncate">{p.client_name}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {p.budget && (
                          <span className="text-xs font-black text-zinc-300 font-mono">{fmt.format(p.budget)}</span>
                        )}
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border ${
                          p.status === "completed" ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/10" :
                          p.status === "development" ? "border-blue-500/20 text-blue-400 bg-blue-500/10" :
                          p.status === "on_hold" ? "border-zinc-700 text-zinc-500 bg-zinc-800" :
                          "border-zinc-700 text-zinc-400"
                        }`}>
                          {STATUS_LABEL[p.status] ?? p.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: tasks + tools */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-950/30">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Tasks</h2>
              </div>
              <TaskList tasks={recentTasks} />
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-950/30 flex justify-between items-center">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Quick Tool</h2>
                <Calculator className="size-4 text-zinc-700" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-base mb-2">Project Estimator</h3>
                <p className="text-zinc-500 text-xs font-medium mb-6">Calculate the perfect quote for your next gig.</p>
                <Button asChild variant="outline" className="w-full rounded-xl border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 font-bold">
                  <Link href="/tools/calculator">Open Estimator</Link>
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/20 to-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <h3 className="font-black text-xl mb-2 italic">Keep it simple.</h3>
              <p className="text-zinc-400 text-sm font-medium mb-6">Focus on shipping code and getting paid.</p>
              <Button asChild variant="secondary" className="w-full rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 font-bold">
                <Link href="/guide">Read Growth Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

function StatCard({ title, value, icon: Icon, accent }: { title: string; value: string | number; icon: any; accent?: "emerald" | "blue" }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-6 hover:border-zinc-700 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">{title}</span>
        <Icon className={`size-4 ${accent === "emerald" ? "text-emerald-500" : accent === "blue" ? "text-blue-500" : "text-zinc-600"}`} />
      </div>
      <div className={`text-xl sm:text-3xl font-black tracking-tighter ${accent === "emerald" ? "text-emerald-400" : accent === "blue" ? "text-blue-400" : "text-white"}`}>
        {value}
      </div>
    </div>
  );
}
