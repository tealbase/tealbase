import { createBrowserClient } from '@tealbase/ssr'
import type { Database } from '@/utils/database.types'
import type { TypedTealbaseClient } from '@/utils/types'
import { useMemo } from 'react'

let client: TypedTealbaseClient | undefined

function getTealbaseBrowserClient() {
  if (client) {
    return client
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_TEALBASE_URL!,
    process.env.NEXT_PUBLIC_TEALBASE_ANON_KEY!
  )

  return client
}

function useTealbaseBrowser() {
  return useMemo(getTealbaseBrowserClient, [])
}

export default useTealbaseBrowser
