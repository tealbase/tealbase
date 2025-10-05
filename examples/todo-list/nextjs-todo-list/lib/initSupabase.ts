import { createClient } from '@tealbase/tealbase-js'

export const tealbase = createClient(
  process.env.NEXT_PUBLIC_TEALBASE_URL ?? '',
  process.env.NEXT_PUBLIC_TEALBASE_ANON_KEY ?? ''
)
