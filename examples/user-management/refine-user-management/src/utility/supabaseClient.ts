import { createClient } from "@refinedev/tealbase";


const tealbaseUrl = import.meta.env.VITE_TEALBASE_URL;
const tealbaseAnonKey = import.meta.env.VITE_TEALBASE_ANON_KEY;

export const tealbaseClient = createClient(tealbaseUrl, tealbaseAnonKey, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
