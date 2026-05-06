import type { createClient } from "@/lib/supabase/server";

type Supabase = Awaited<ReturnType<typeof createClient>>;

// ─── Project-based pipeline metrics ──────────────────────────────────────────

export type ProjectStatus = "planning" | "development" | "testing" | "completed" | "on_hold";

export type ProjectCounts = Record<ProjectStatus, number>;

export async function getProjectCounts(supabase: Supabase): Promise<ProjectCounts> {
  const counts: ProjectCounts = {
    planning: 0,
    development: 0,
    testing: 0,
    completed: 0,
    on_hold: 0,
  };
  const { data } = await supabase.from("projects").select("status");
  for (const row of data ?? []) {
    const s = row.status as ProjectStatus;
    if (s in counts) counts[s] += 1;
  }
  return counts;
}

export async function getActiveProjectsCount(supabase: Supabase): Promise<number> {
  const { count } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .neq("status", "completed");
  return count ?? 0;
}

/** Conversion = completed projects ÷ total projects */
export function computeConversionRate(counts: Record<string, number>): number | null {
  const hasLeadPipelineKeys = ["sold", "interested", "not_interested", "voicemail", "not_called"].some(
    (key) => key in counts
  );
  const sold = counts.sold ?? counts.completed ?? 0;
  const contacted = ["sold", "interested", "not_interested", "voicemail"].reduce(
    (sum, key) => sum + (counts[key] ?? 0),
    0
  );
  if (contacted > 0) {
    return (sold / contacted) * 100;
  }
  if (hasLeadPipelineKeys) return null;
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (total === 0) return null;
  return (sold / total) * 100;
}

// ─── Revenue (invoices + completed project budgets) ───────────────────────────

export async function getFinanceMetrics(supabase: Supabase) {
  const [{ data: invoices }, { data: completedProjects }] = await Promise.all([
    supabase.from("invoices").select("amount, status"),
    supabase.from("projects").select("budget").eq("status", "completed"),
  ]);

  let invoiceRevenue = 0;
  let pendingRevenue = 0;
  (invoices ?? []).forEach((inv) => {
    if (inv.status === "paid") invoiceRevenue += Number(inv.amount);
    if (inv.status === "sent") pendingRevenue += Number(inv.amount);
  });

  const projectRevenue = (completedProjects ?? []).reduce(
    (sum, p) => sum + (p.budget ? Number(p.budget) : 0),
    0
  );

  const totalRevenue = invoiceRevenue + projectRevenue;
  return { totalRevenue, pendingRevenue, invoiceRevenue, projectRevenue };
}

export async function getRecentInvoices(supabase: Supabase) {
  const { data } = await supabase
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

// ─── Monthly revenue chart ────────────────────────────────────────────────────

export async function getMonthlyRevenue(supabase: Supabase) {
  const { data } = await supabase
    .from("invoices")
    .select("amount, created_at")
    .eq("status", "paid")
    .order("created_at", { ascending: true });

  const months: Record<string, number> = {};
  (data ?? []).forEach((inv) => {
    const month = new Date(inv.created_at).toLocaleString("default", { month: "short" });
    months[month] = (months[month] || 0) + Number(inv.amount);
  });

  return Object.entries(months).map(([name, total]) => ({ name, total }));
}

// ─── Recent projects ──────────────────────────────────────────────────────────

export type RecentProject = {
  id: string;
  project_name: string;
  client_name: string;
  status: string;
  budget: number | null;
  updated_at: string;
};

export async function getRecentProjects(supabase: Supabase): Promise<RecentProject[]> {
  const { data } = await supabase
    .from("projects")
    .select("id, project_name, client_name, status, budget, updated_at")
    .order("updated_at", { ascending: false })
    .limit(6);
  return (data ?? []) as RecentProject[];
}

// ─── Tasks ────────────────────────────────────────────────────────────────────

export async function getRecentTasks(supabase: Supabase) {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
  const { data } = await supabase
    .from("tasks")
    .select("*")
    .or(`is_completed.eq.false,completed_at.gt.${fiveMinutesAgo}`)
    .order("is_completed", { ascending: true })
    .order("due_date", { ascending: true })
    .limit(10);
  return data ?? [];
}
