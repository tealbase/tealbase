import { createClient } from "@tealbase/tealbase-js";
import type { Database } from "./schema";

export const tealbase = createClient<Database>(
  import.meta.env.VITE_TEALBASE_URL,
  import.meta.env.VITE_TEALBASE_ANON_KEY
);
