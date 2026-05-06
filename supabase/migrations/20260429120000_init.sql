-- DevBase initial schema
-- Tables: projects, invoices, tasks
-- All status fields use plain TEXT (no enum) for flexibility.
-- RLS is enabled on every table — users only see their own data.

-- =============================================================
-- PROJECTS
-- =============================================================
create table public.projects (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,

  client_name  text not null,
  project_name text not null,
  -- planning | development | testing | completed | on_hold
  status       text not null default 'planning',
  budget       numeric(12,2),
  due_date     date,

  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index projects_user_idx on public.projects (user_id, created_at desc);

alter table public.projects enable row level security;
create policy "projects_select_own" on public.projects for select using (auth.uid() = user_id);
create policy "projects_insert_own" on public.projects for insert with check (auth.uid() = user_id);
create policy "projects_update_own" on public.projects for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "projects_delete_own" on public.projects for delete using (auth.uid() = user_id);


-- =============================================================
-- INVOICES
-- =============================================================
create table public.invoices (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  project_id   uuid references public.projects(id) on delete set null,

  client_name  text not null,
  amount       numeric(12,2) not null,
  -- draft | sent | paid | overdue | cancelled
  status       text not null default 'draft',
  issue_date   date,
  due_date     date,

  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index invoices_user_idx on public.invoices (user_id, created_at desc);

alter table public.invoices enable row level security;
create policy "invoices_select_own" on public.invoices for select using (auth.uid() = user_id);
create policy "invoices_insert_own" on public.invoices for insert with check (auth.uid() = user_id);
create policy "invoices_update_own" on public.invoices for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "invoices_delete_own" on public.invoices for delete using (auth.uid() = user_id);


-- =============================================================
-- TASKS
-- =============================================================
create table public.tasks (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  project_id   uuid references public.projects(id) on delete cascade,

  title        text not null,
  is_completed boolean not null default false,
  completed_at timestamptz,
  due_date     date,

  created_at   timestamptz not null default now()
);

create index tasks_user_idx on public.tasks (user_id, is_completed, due_date);

alter table public.tasks enable row level security;
create policy "tasks_select_own" on public.tasks for select using (auth.uid() = user_id);
create policy "tasks_insert_own" on public.tasks for insert with check (auth.uid() = user_id);
create policy "tasks_update_own" on public.tasks for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "tasks_delete_own" on public.tasks for delete using (auth.uid() = user_id);
