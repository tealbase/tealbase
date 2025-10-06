import { createBrowserClient } from "@tealbase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_TEALBASE_URL!,
    process.env.NEXT_PUBLIC_TEALBASE_ANON_KEY!,
  );
