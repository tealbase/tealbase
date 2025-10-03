import { createClient } from '@tealbase/tealbase-js'
import type { Database } from './schema'

const tealbaseUrl = import.meta.env.VITE_TEALBASE_URL
const tealbaseAnonKey = import.meta.env.VITE_TEALBASE_ANON_KEY

export const tealbase = createClient<Database>(tealbaseUrl, tealbaseAnonKey)
