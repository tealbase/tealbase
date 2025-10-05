import { createBrowserClient } from "@tealbase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_TEALBASE_URL!,
    process.env.NEXT_PUBLIC_TEALBASE_ANON_KEY!
  )
}
