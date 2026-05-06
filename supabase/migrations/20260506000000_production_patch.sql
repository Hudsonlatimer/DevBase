-- DevBase patch: fixes for production readiness
-- Run this ONCE in your existing Supabase project SQL editor.
-- Safe to run multiple times (uses IF EXISTS / IF NOT EXISTS guards).

-- 1. Drop enum-based status restriction on leads
--    (lets 'started', 'sold', etc. be stored freely)
ALTER TABLE public.leads ALTER COLUMN status TYPE text;
DROP TYPE IF EXISTS public.lead_status;

-- 2. Drop the status check constraint if it was auto-created
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_status_check;

-- 3. Make place_id optional (manual/project leads don't have one)
ALTER TABLE public.leads ALTER COLUMN place_id DROP NOT NULL;

-- 4. Add completed_at to tasks for the 5-min auto-delete feature
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS completed_at timestamptz;

-- 5. Ensure projects have numeric budget column (already there, just in case)
ALTER TABLE public.projects ALTER COLUMN budget TYPE numeric(12,2) USING budget::numeric;

-- 6. Add notes column to projects for inline note-taking
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS notes text;

-- Done! All sync features should now work.
