"use server"

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

export async function signIn(prevState: { error: string } | null, formData: FormData) {
    const supabase = await createClient();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validate that email and password are not empty
    if (!email || !password) {
        return { error: "Missing email or password" };
    }

    const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    console.log(data, "data_login");

    if (error) {
        console.error("Error signing in:", error);
        return { error: error.message };
    }

    redirect("/admin/rsvps");
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
}