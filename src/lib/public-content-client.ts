import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// Published content is readable under the anonymous RLS policies. Keep these
// reads independent of admin session restoration and the preview auth broker.
let client: ReturnType<typeof createClient<Database>> | undefined;
export function getPublicContentClient() {
  if (!client) {
    client = createClient<Database>(
      import.meta.env["VITE_SUPABASE_URL"],
      import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"],
      { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } },
    );
  }
  return client;
}
