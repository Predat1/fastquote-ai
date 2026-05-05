import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Return a dummy client or handle it in the component
    // This prevents the build from failing when env vars are missing
    return {} as any;
  }

  return createBrowserClient(url, key);
}
