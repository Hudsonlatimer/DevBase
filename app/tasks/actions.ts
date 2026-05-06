"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addTask(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  if (!title) return;

  const { error } = await supabase.from("tasks").insert({
    user_id: user.id,
    title,
    is_completed: false,
  });

  if (error) {
    console.error("Error adding task:", error);
    throw error;
  }

  revalidatePath("/dashboard");
}

export async function toggleTask(taskId: string, isCompleted: boolean) {
  const supabase = await createClient();
  const isNowCompleted = !isCompleted;
  const { error } = await supabase
    .from("tasks")
    .update({ 
      is_completed: isNowCompleted,
      completed_at: isNowCompleted ? new Date().toISOString() : null
    })
    .eq("id", taskId);

  if (error) {
    console.error("Error toggling task:", error);
    throw error;
  }

  revalidatePath("/dashboard");
}
