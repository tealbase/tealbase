// Caching data with Next.js 13 and Tealbase
// See the docs: https://beta.nextjs.org/docs/data-fetching/caching
import 'server-only'
import { createClient } from '@tealbase/tealbase-js'

const tealbase = createClient(
  process.env.NEXT_PUBLIC_TEALBASE_URL ?? 'http://localhost:54321',
  process.env.TEALBASE_SERVICE_ROLE_KEY ??
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSJ9.vI9obAHOGyVVKa3pD--kJlyxp-Z2zV9UUMAhKpNLAcU',
  { global: { fetch } } // Note: this is not required as tealbase-js uses the global fetch when available!
)

export const revalidate = 60 // revalidate this page at most every 60 seconds

export default async function PostList() {
  const { data, error } = await tealbase.from('articles').select('*')

  return <pre>{JSON.stringify({ data, error }, null, 2)}</pre>
}
