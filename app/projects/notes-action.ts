"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveProjectNotes(projectId: string, notes: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({ notes })
    .eq("id", projectId);

  if (error) {
    console.error("Failed to save notes:", error);
    throw error;
  }

  revalidatePath("/projects");
  revalidatePath("/dashboard");
}
