import AccountForm from './account-form'
import { createClient } from '@/utils/tealbase/server'

export default async function Account() {
  const tealbase = await createClient()

  const {
    data: { user },
  } = await tealbase.auth.getUser()

  return <AccountForm user={user} />
}
