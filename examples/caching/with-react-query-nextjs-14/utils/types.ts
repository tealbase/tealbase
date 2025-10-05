import { TealbaseClient } from '@tealbase/tealbase-js'
import type { Database } from '@/utils/database.types'

export type TypedTealbaseClient = TealbaseClient<Database>
