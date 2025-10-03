import { createClient } from '@tealbase/tealbase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const tealbaseUrl = 'https://project.tealbase.co'
const tealbaseAnonKey = 'your-anon-key'

export const tealbase = createClient(tealbaseUrl, tealbaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
