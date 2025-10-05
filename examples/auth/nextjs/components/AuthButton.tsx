import { createClient } from '@/utils/tealbase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AuthButton() {
  const tealbase = await createClient()

  const {
    data: { user },
  } = await tealbase.auth.getUser()

  const signOut = async () => {
    'use server'

    const tealbase = await createClient()
    await tealbase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  )
}
