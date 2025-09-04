"use server";

import { createClient } from "../utils/supabase/server";

export async function submitRSVP(formData: FormData) {

    const supabase = await createClient();

    const name = formData.get("name");
    const email = formData.get("email");
    const accompany = formData.get("accompany");
    const attendance = formData.get("attendance");
    const notes = formData.get("notes");

    const { data, error } = await supabase.from("rsvp").insert([
        {
            name,
            email,
            accompany,
            attendance,
            notes,
        },
    ]);

    console.log(data, "data_submitRSVP");

    if (error) {
        console.error("Error submitting RSVP:", error);
        return { success: false, message: 'Failed to submit RSVP', error }
    }

    return { success: true, message: 'RSVP submitted successfully', data };
}