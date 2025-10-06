import { useTealbaseClient, useUser } from '@tealbase/auth-helpers-react'
import { Auth, ThemeSupa } from '@tealbase/auth-ui-react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const LoginPage: NextPage = () => {
  const tealbaseClient = useTealbaseClient()
  const user = useUser()

  if (!user) {
    return (
      <main className={styles.main}>
        <Auth
          redirectTo="http://localhost:3000/"
          appearance={{ theme: ThemeSupa }}
          tealbaseClient={tealbaseClient}
        />
      </main>
    )
  }

  return (
    <>
      <button onClick={() => tealbaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}

export default LoginPage
