import { useSession } from '@clerk/nextjs'
import { createClient } from '@tealbase/tealbase-js'

export function useTealbaseClient() {
  const { session } = useSession()
  const tealbaseClient = createClient(
    process.env.NEXT_PUBLIC_TEALBASE_URL!,
    process.env.NEXT_PUBLIC_TEALBASE_ANON_KEY!,
    {
      // Session accessed from Clerk SDK, either as Clerk.session (vanilla
      // JavaScript) or useSession (React)
      accessToken: async () => session?.getToken() ?? null,
    }
  )
  return tealbaseClient
}
