import Link from "next/link";
import { Code2, Briefcase, Plus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/dashboard/user-nav";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { ProjectActions } from "@/components/projects/project-actions";
import { ProjectNotes } from "@/components/projects/project-notes";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const STATUS_COLOR: Record<string, string> = {
  planning:    "bg-amber-500",
  development: "bg-blue-500",
  testing:     "bg-violet-500",
  completed:   "bg-emerald-500",
  on_hold:     "bg-zinc-600",
};

const STATUS_BADGE: Record<string, string> = {
  planning:    "border-amber-500/20 text-amber-400 bg-amber-500/10",
  development: "border-blue-500/20 text-blue-400 bg-blue-500/10",
  testing:     "border-violet-500/20 text-violet-400 bg-violet-500/10",
  completed:   "border-emerald-500/20 text-emerald-400 bg-emerald-500/10",
  on_hold:     "border-zinc-700 text-zinc-500 bg-zinc-800",
};

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

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
              <Link href="/dashboard" className="text-zinc-500 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/projects"  className="text-white">Projects</Link>
              <Link href="/finance"   className="text-zinc-500 hover:text-white transition-colors">Finance</Link>
            </nav>
            <UserNav user={user} />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6 py-8 sm:py-12 pb-24 md:pb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Projects</h1>
            <p className="text-zinc-500 mt-2 font-medium">Build, ship, repeat.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="rounded-full bg-white text-black hover:bg-zinc-200 font-bold px-8 h-12 shadow-xl w-full sm:w-auto">
              <Link href="/projects/new">
                <Plus className="mr-2 size-4" /> New Project
              </Link>
            </Button>
          </div>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((p: any) => (
              <div key={p.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-colors relative overflow-hidden flex flex-col">
                {/* Status accent bar */}
                <div className={`absolute top-0 left-0 h-0.5 w-full ${STATUS_COLOR[p.status] ?? "bg-zinc-700"}`} />

                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="text-lg font-black tracking-tight truncate">{p.project_name}</h3>
                    <p className="text-xs text-zinc-500 font-medium mt-0.5 truncate">{p.client_name}</p>
                  </div>
                  <ProjectActions id={p.id} />
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    <Clock className="size-3" />
                    {p.due_date ? new Date(p.due_date).toLocaleDateString() : "No deadline"}
                  </div>
                  <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${STATUS_BADGE[p.status] ?? "border-zinc-700 text-zinc-400"}`}>
                    {p.status?.replace("_", " ")}
                  </span>
                </div>

                {/* Budget */}
                {p.budget && (
                  <p className="text-sm font-black text-zinc-300 font-mono mb-1">
                    {fmt.format(p.budget)}
                  </p>
                )}

                {/* Notes — inline editor */}
                <div className="flex-1">
                  <ProjectNotes projectId={p.id} initialNotes={p.notes ?? null} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 border-dashed rounded-3xl p-12 sm:p-20 text-center">
            <Briefcase className="size-10 sm:size-12 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No projects yet.</h3>
            <p className="text-zinc-500 mb-8 font-medium">Create your first project to start tracking your work.</p>
            <Button asChild className="rounded-full bg-white text-black hover:bg-zinc-200 font-bold px-8 h-12 w-full sm:w-auto">
              <Link href="/projects/new">Get Started</Link>
            </Button>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
