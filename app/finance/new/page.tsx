import Link from "next/link";
import { Code2, ArrowLeft, DollarSign, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserNav } from "@/components/dashboard/user-nav";
import { createClient } from "@/lib/supabase/server";
import { createInvoice } from "./actions";
import { FormSubmitButton } from "@/components/ui/form-submit-button";

export default async function NewInvoicePage() {
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
              <Link href="/projects" className="text-zinc-500 hover:text-white transition-colors">Projects</Link>
              <Link href="/leads" className="text-zinc-500 hover:text-white transition-colors">Leads</Link>
              <Link href="/finance" className="text-white transition-colors">Finance</Link>
            </nav>
            <UserNav user={user} />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
            <DollarSign className="size-6 text-primary" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">Add Invoice</h1>
        </div>
        <p className="text-zinc-500 text-lg mb-8 font-medium">Log payment details so your numbers stay up to date.</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8 sm:p-10 shadow-2xl">
          <form action={createInvoice} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="client_name" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Client Name</Label>
              <Input name="client_name" id="client_name" placeholder="Gumroad" required minLength={2} maxLength={80} className="h-12 bg-zinc-950 border-zinc-800 rounded-xl focus:ring-primary font-bold text-white" />
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Description (What you did)</Label>
              <Input name="description" id="description" placeholder="Custom landing page build" maxLength={150} aria-describedby="description-help" className="h-12 bg-zinc-950 border-zinc-800 rounded-xl focus:ring-primary font-bold text-white" />
              <p id="description-help" className="text-[11px] text-zinc-500 font-medium">Optional. Keep this short so invoices stay scannable.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="amount" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Amount ($)</Label>
                <Input name="amount" id="amount" type="number" min={1} step="0.01" placeholder="1500" required aria-describedby="amount-help" className="h-12 bg-zinc-950 border-zinc-800 rounded-xl focus:ring-primary font-bold text-white" />
                <p id="amount-help" className="text-[11px] text-zinc-500 font-medium">Use gross invoice amount before platform fees.</p>
              </div>
              <div className="space-y-3">
                <Label htmlFor="status" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Status</Label>
                <Select name="status" defaultValue="paid">
                  <SelectTrigger className="h-12 bg-zinc-950 border-zinc-800 rounded-xl font-bold text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="sent">Sent (Pending)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="date" className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Calendar className="size-3" /> Date Received
              </Label>
              <Input name="date" id="date" type="date" className="h-12 bg-zinc-950 border-zinc-800 rounded-xl focus:ring-primary font-bold text-white" />
            </div>

            <FormSubmitButton label="Save Invoice" pendingLabel="Saving..." className="w-full h-14 bg-white text-black hover:bg-zinc-200 text-lg font-black rounded-2xl shadow-xl transition-all active:scale-[0.98]" />
          </form>
        </div>
      </main>
    </div>
  );
}
