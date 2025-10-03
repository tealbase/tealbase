import { createClient } from '@/utils/tealbase/server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const tealbase = await createClient()

  // Check if a user's logged in
  const {
    data: { user },
  } = await tealbase.auth.getUser()

  if (user) {
    await tealbase.auth.signOut()
  }

  revalidatePath('/', 'layout')
  return NextResponse.redirect(new URL('/login', req.url), {
    status: 302,
  })
}
