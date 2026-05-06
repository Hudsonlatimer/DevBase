import Link from "next/link";
import { Code2, ArrowLeft, Briefcase, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserNav } from "@/components/dashboard/user-nav";
import { createClient } from "@/lib/supabase/server";
import { createProject } from "./actions";

export default async function NewProjectPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-svh flex-col bg-[#050505] text-white">
      <header className="border-b border-zinc-900 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-black text-lg tracking-tighter">
            <Code2 className="size-5 text-primary" />
            <span>DevBase</span>
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
              <Link href="/dashboard" className="text-zinc-500 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/projects" className="text-white transition-colors">Projects</Link>
              <Link href="/leads" className="text-zinc-500 hover:text-white transition-colors">Leads</Link>
              <Link href="/finance" className="text-zinc-500 hover:text-white transition-colors">Finance</Link>
            </nav>
            <UserNav user={user} />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-8">
          <Link
            href="/projects"
            className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Back to projects
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl">
            <Briefcase className="size-6 text-primary" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">New Project</h1>
        </div>
        <p className="text-zinc-500 text-lg mb-8 font-medium">Initialize a new build and track your progress.</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8 sm:p-10 shadow-2xl">
          <form action={createProject} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="client_name" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Client Name</Label>
                <Input name="client_name" id="client_name" placeholder="Stripe" required className="h-12 bg-zinc-950 border-zinc-800 rounded-xl focus:ring-primary font-bold text-white" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="project_name" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Project Title</Label>
                <Input name="project_name" id="project_name" placeholder="SaaS Platform" required className="h-12 bg-zinc-950 border-zinc-800 rounded-xl focus:ring-primary font-bold text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="budget" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Budget ($)</Label>
                <Input name="budget" id="budget" type="number" placeholder="5000" className="h-12 bg-zinc-950 border-zinc-800 rounded-xl focus:ring-primary font-bold text-white" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="due_date" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Target Deadline</Label>
                <Input name="due_date" id="due_date" type="date" className="h-12 bg-zinc-950 border-zinc-800 rounded-xl focus:ring-primary font-bold text-white" />
              </div>
            </div>

            <Button type="submit" className="w-full h-14 bg-white text-black hover:bg-zinc-200 text-lg font-black rounded-2xl shadow-xl transition-all active:scale-[0.98]">
              Initialize Project
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
