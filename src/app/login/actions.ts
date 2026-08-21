"use server";

import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;
  
  if (password === process.env.ADMIN_PASSWORD) {
    await createSession();
    // Redirect must be called outside try/catch if any, it throws an error to work
    redirect("/admin");
  } else {
    return { error: "Mot de passe incorrect" };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
