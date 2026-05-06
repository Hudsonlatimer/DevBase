"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const client_name = formData.get("client_name") as string;
  const project_name = formData.get("project_name") as string;
  const budget = formData.get("budget") as string;
  const due_date = formData.get("due_date") as string;

  // 1. Create the project
  const { error: projectError } = await supabase.from("projects").insert({
    user_id: user.id,
    client_name,
    project_name,
    budget: budget ? Number(budget) : null,
    due_date: due_date ? new Date(due_date).toISOString() : null,
    status: "development",
  });

  if (projectError) {
    console.error("Error creating project:", projectError);
    throw projectError;
  }

  // 2. Sync to leads: Check if lead exists, if not create one, and set status to "started"
  try {
    // Direct Insert: Bypassing complex upsert to ensure creation
    const { error: syncError } = await supabase
      .from("leads")
      .insert({
        user_id: user.id,
        business_name: client_name,
        status: "started",
        place_id: `manual_${Date.now()}_${Math.random().toString(36).substring(7)}`
      });

    if (syncError) {
      console.error("Lead sync failed:", syncError);
      // We don't throw here to keep project creation working, 
      // but we log it for the server.
    }
  } catch (err) {
    console.error("Critical sync error:", err);
  }

  revalidatePath("/projects");
  revalidatePath("/leads");
  revalidatePath("/dashboard");
  revalidatePath("/");
  redirect("/projects");
}
