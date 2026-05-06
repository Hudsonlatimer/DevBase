import Link from "next/link";
import { Code2, ArrowLeft, User, Bell, Shield, Trash2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserNav } from "@/components/dashboard/user-nav";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

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
              <Link href="/projects"  className="text-zinc-500 hover:text-white transition-colors">Projects</Link>
              <Link href="/finance"   className="text-zinc-500 hover:text-white transition-colors">Finance</Link>
            </nav>
            <UserNav user={user} />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 sm:px-6 py-8 sm:py-12 pb-24 md:pb-12">
        <div className="mb-8">
          <Link href="/dashboard" className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold mb-6">
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Back to dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Settings</h1>
          <p className="text-zinc-500 mt-2 font-medium">Manage your account preferences.</p>
        </div>

        <div className="space-y-4">

          {/* Account */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800 flex items-center gap-3">
              <div className="bg-zinc-800 p-2 rounded-xl">
                <User className="size-4 text-zinc-400" />
              </div>
              <h2 className="font-bold text-sm">Account</h2>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email</Label>
                <div className="flex items-center gap-3">
                  <Input
                    value={user.email ?? ""}
                    readOnly
                    className="h-11 bg-zinc-950 border-zinc-800 rounded-xl font-mono text-sm text-zinc-400 cursor-default"
                  />
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">
                    Verified
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">User ID</Label>
                <Input
                  value={user.id}
                  readOnly
                  className="h-11 bg-zinc-950 border-zinc-800 rounded-xl font-mono text-xs text-zinc-600 cursor-default"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Member Since</Label>
                <Input
                  value={new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  readOnly
                  className="h-11 bg-zinc-950 border-zinc-800 rounded-xl text-sm text-zinc-400 cursor-default"
                />
              </div>
            </div>
          </section>

          {/* Password */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800 flex items-center gap-3">
              <div className="bg-zinc-800 p-2 rounded-xl">
                <Shield className="size-4 text-zinc-400" />
              </div>
              <h2 className="font-bold text-sm">Security</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-zinc-500 font-medium mb-4">
                To change your password, we'll send a reset link to <span className="text-white font-bold">{user.email}</span>.
              </p>
              <PasswordResetButton email={user.email ?? ""} />
            </div>
          </section>

          {/* Data */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800 flex items-center gap-3">
              <div className="bg-zinc-800 p-2 rounded-xl">
                <Bell className="size-4 text-zinc-400" />
              </div>
              <h2 className="font-bold text-sm">Data & Storage</h2>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-sm text-zinc-500 font-medium">
                All your data is stored securely in Supabase and synced across all your devices in real time.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {["Projects", "Invoices", "Tasks"].map((item) => (
                  <span key={item} className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-800 border border-zinc-700 px-2.5 py-1 rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Danger zone */}
          <section className="bg-zinc-900 border border-red-500/20 rounded-3xl overflow-hidden">
            <div className="px-6 py-4 border-b border-red-500/20 flex items-center gap-3">
              <div className="bg-red-500/10 p-2 rounded-xl">
                <Trash2 className="size-4 text-red-400" />
              </div>
              <h2 className="font-bold text-sm text-red-400">Danger Zone</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-zinc-500 font-medium mb-4">
                Deleting your account is permanent and cannot be undone. All your projects, tasks, invoices, and data will be removed immediately.
              </p>
              <Button
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl font-bold"
                disabled
              >
                <Trash2 className="mr-2 size-4" />
                Delete Account
              </Button>
              <p className="text-[11px] text-zinc-600 mt-3 font-medium">Contact support to delete your account.</p>
            </div>
          </section>

        </div>
      </main>
      <BottomNav />
    </div>
  );
}

function PasswordResetButton({ email }: { email: string }) {
  return (
    <form action={async () => {
      "use server";
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
      });
    }}>
      <Button type="submit" variant="outline" className="border-zinc-700 hover:bg-zinc-800 rounded-xl font-bold text-sm gap-2">
        <Mail className="size-4" />
        Send Password Reset Email
      </Button>
    </form>
  );
}
