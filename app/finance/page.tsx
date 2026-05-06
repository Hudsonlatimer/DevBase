import Link from "next/link";
import { 
  Code2, 
  DollarSign, 
  Plus, 
  Download, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  FileText,
  ArrowLeft,
  Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserNav } from "@/components/dashboard/user-nav";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { createClient } from "@/lib/supabase/server";
import { getFinanceMetrics, getRecentInvoices } from "@/lib/dashboard/queries";

export default async function FinancePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [metrics, recentInvoices] = await Promise.all([
    getFinanceMetrics(supabase),
    getRecentInvoices(supabase)
  ]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

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
              <Link href="/projects" className="text-zinc-500 hover:text-white transition-colors">Projects</Link>
              <Link href="/finance" className="text-white transition-colors">Finance</Link>
            </nav>
            <UserNav user={user} />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6 py-8 sm:py-12 pb-24 md:pb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Finance</h1>
            <p className="text-zinc-500 mt-2 font-medium text-base sm:text-lg">Money in, money out. Pure and simple.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" className="rounded-full px-8 h-12 border-zinc-800 hover:bg-zinc-900 font-bold shadow-xl w-full sm:w-auto">
              <Link href="/tools/calculator">
                <Calculator className="mr-2 size-4" /> Estimator
              </Link>
            </Button>
            <Button asChild className="rounded-full bg-white text-black hover:bg-zinc-200 font-bold px-8 h-12 shadow-xl w-full sm:w-auto">
              <Link href="/finance/new">
                <Plus className="mr-2 size-4" /> Create Invoice
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Total Collected</p>
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            <div className="text-5xl font-black tracking-tighter">{formatter.format(metrics.totalRevenue)}</div>
            <p className="text-zinc-600 text-sm mt-4 font-medium">All time paid invoices.</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Awaiting Payment</p>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-5xl font-black tracking-tighter">{formatter.format(metrics.pendingRevenue)}</div>
            <p className="text-zinc-600 text-sm mt-4 font-medium">Invoices sent but not yet paid.</p>
          </div>
        </div>

        <h2 className="text-xl font-black mb-6">Recent Invoices</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
          {recentInvoices.length === 0 ? (
            <div className="py-20 text-center text-zinc-500 font-medium">
              No invoices created yet. Start by billing a client.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-950/50">
                    <th className="px-8 py-4 font-bold text-xs uppercase tracking-widest text-zinc-500">Client</th>
                    <th className="px-8 py-4 font-bold text-xs uppercase tracking-widest text-zinc-500">Amount</th>
                    <th className="px-8 py-4 font-bold text-xs uppercase tracking-widest text-zinc-500">Status</th>
                    <th className="px-8 py-4 font-bold text-xs uppercase tracking-widest text-zinc-500 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {recentInvoices.map((inv: any) => (
                    <tr key={inv.id} className="hover:bg-zinc-800/50 transition-colors group">
                      <td className="px-8 py-6 font-bold">{inv.client_name}</td>
                      <td className="px-8 py-6 font-black text-primary">{formatter.format(inv.amount)}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          inv.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                          inv.status === 'sent' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                          'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right text-zinc-500 font-medium">{new Date(inv.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
