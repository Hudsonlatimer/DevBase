"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createInvoice(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const client_name = formData.get("client_name") as string;
  const description = formData.get("description") as string;
  const amount = formData.get("amount") as string;
  const status = formData.get("status") as string;
  const created_at = formData.get("date") as string;

  const { error } = await supabase.from("invoices").insert({
    user_id: user.id,
    client_name,
    description,
    amount: Number(amount),
    status: status || "sent",
    created_at: created_at ? new Date(created_at).toISOString() : new Date().toISOString(),
  });

  if (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }

  revalidatePath("/finance");
  revalidatePath("/dashboard");
  redirect("/finance");
}
