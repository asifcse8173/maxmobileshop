import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// null when keys are missing, so the website still works with the local data files
export const supabase = url && key ? createClient(url, key) : null;

// Readable message for admin screens. 42501 = blocked by the database security rules.
export const errText = (e) =>
  e && e.code === "42501"
    ? "Not allowed: this login is not in the admin list (see README, step 4)."
    : e && e.message ? e.message : "Something went wrong.";
