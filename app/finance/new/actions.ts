"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createInvoice(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const client_name = formData.get("client_name") as string;
  const amount = formData.get("amount") as string;
  const status = formData.get("status") as string;
  const issue_date = formData.get("date") as string;

  const { error } = await supabase.from("invoices").insert({
    user_id: user.id,
    client_name,
    amount: Number(amount),
    status: status || "sent",
    issue_date: issue_date || null,
  });

  if (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }

  revalidatePath("/finance");
  revalidatePath("/dashboard");
  redirect("/finance");
}
