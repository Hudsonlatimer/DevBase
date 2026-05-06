"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    throw error;
  }

  revalidatePath("/projects");
  revalidatePath("/dashboard");
}

export async function updateProjectStatus(id: string, status: string) {
  const supabase = await createClient();
  const { data: project } = await supabase.from("projects").select("client_name").eq("id", id).single();
  
  const { error } = await supabase.from("projects").update({ status }).eq("id", id);

  if (error) {
    console.error("Error updating project status:", error);
    throw error;
  }

  // If completed, sync lead to "sold"
  if (status === 'completed' && project?.client_name) {
    await supabase
      .from("leads")
      .update({ status: 'sold' })
      .ilike("business_name", project.client_name);
  }

  revalidatePath("/projects");
  revalidatePath("/leads");
  revalidatePath("/dashboard");
  revalidatePath("/");
}
