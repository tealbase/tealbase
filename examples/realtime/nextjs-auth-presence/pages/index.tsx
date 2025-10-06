import { createServerTealbaseClient } from '@tealbase/auth-helpers-nextjs'
import { useTealbaseClient, useUser } from '@tealbase/auth-helpers-react'
import { RealtimePresenceState } from '@tealbase/tealbase-js'
import type { GetServerSidePropsContext, NextPage } from 'next'
import { useEffect, useState } from 'react'

const HomePage: NextPage = () => {
  const tealbaseClient = useTealbaseClient()
  const this_user = useUser()
  const [userState, setUserState] = useState<RealtimePresenceState>({})

  useEffect(() => {
    console.log('user: ', this_user)

    const channel = tealbaseClient.channel('online-users', {
      config: {
        presence: {
          key: this_user?.email ? this_user?.email : 'Unknown',
        },
      },
    })

    channel.on('presence', { event: 'sync' }, () => {
      const presentState = channel.presenceState()

      console.log('inside presence: ', presentState)

      setUserState({ ...presentState })
    })

    channel.on('presence', { event: 'join' }, ({ newPresences }) => {
      console.log('New users have joined: ', newPresences)
    })

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        const status = await channel.track({
          user_name: this_user?.email ? this_user?.email : 'Unknown',
        })
        console.log('status: ', status)
      }
    })
  }, [])
  return (
    <>
      <button onClick={() => tealbaseClient.auth.signOut()}>Sign out</button>

      <p> List of Currently Logged in Users: </p>
      {Object.keys(userState).map((key) => (
        <p key={key}>Hi {key}</p>
      ))}
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Tealbase Client
  const tealbase = createServerTealbaseClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await tealbase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  }
}

export default HomePage
