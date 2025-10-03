import { createClient } from '@tealbase/tealbase-js'

const tealbaseUrl = import.meta.env.VITE_TEALBASE_URL
const tealbaseAnonKey = import.meta.env.VITE_TEALBASE_ANON_KEY

export const tealbase = createClient(tealbaseUrl, tealbaseAnonKey)
