import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./config";

export function createAdminClient() {
  const cle = process.env.SUPABASE_SECRET_KEY;
  if (!cle) {
    throw new Error("SUPABASE_SECRET_KEY manquante");
  }
  return createClient(SUPABASE_URL, cle, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
