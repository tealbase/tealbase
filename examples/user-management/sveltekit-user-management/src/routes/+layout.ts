// src/routes/+layout.ts
import { PUBLIC_TEALBASE_ANON_KEY, PUBLIC_TEALBASE_URL } from '$env/static/public'
import type { LayoutLoad } from './$types'
import { createBrowserClient, createServerClient, isBrowser } from '@tealbase/ssr'

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('tealbase:auth')

  const tealbase = isBrowser()
    ? createBrowserClient(PUBLIC_TEALBASE_URL, PUBLIC_TEALBASE_ANON_KEY, {
        global: {
          fetch,
        },
      })
    : createServerClient(PUBLIC_TEALBASE_URL, PUBLIC_TEALBASE_ANON_KEY, {
        global: {
          fetch,
        },
        cookies: {
          getAll() {
            return data.cookies
          },
        },
      })

  /**
   * It's fine to use `getSession` here, because on the client, `getSession` is
   * safe, and on the server, it reads `session` from the `LayoutData`, which
   * safely checked the session using `safeGetSession`.
   */
  const {
    data: { session },
  } = await tealbase.auth.getSession()

  return { tealbase, session }
}