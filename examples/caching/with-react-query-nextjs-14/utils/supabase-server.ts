import { createServerClient } from '@tealbase/ssr'
import { cookies } from 'next/headers'
import { Database } from './database.types'

export default function useTealbaseServer(
  cookieStore: ReturnType<typeof cookies>
) {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_TEALBASE_URL!,
    process.env.NEXT_PUBLIC_TEALBASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
