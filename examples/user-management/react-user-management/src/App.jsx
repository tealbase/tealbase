import { useState, useEffect } from 'react'
import './App.css'
import { tealbase } from './tealbaseClient'
import Auth from './Auth'
import Account from './Account'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    tealbase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data } = tealbase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => data.subscription.unsubscribe();
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  )
}

export default App
