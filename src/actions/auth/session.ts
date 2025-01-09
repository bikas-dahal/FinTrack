'use server'

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function getUserSession() {
    const session = await auth();
  
    if (!session?.user) {
      return redirect("/login");
    }
  
    return session?.user;
  }