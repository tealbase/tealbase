import { createBrowserClient } from '@tealbase/ssr'

export function createClient() {
  // Create a tealbase client on the browser with project's credentials
  return createBrowserClient(
    process.env.NEXT_PUBLIC_TEALBASE_URL!,
    process.env.NEXT_PUBLIC_TEALBASE_ANON_KEY!
  )
}