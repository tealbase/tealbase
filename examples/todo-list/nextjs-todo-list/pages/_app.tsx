import { tealbase } from '@/lib/initTealbase'
import '@/styles/app.css'
import { SessionContextProvider } from '@tealbase/auth-helpers-react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider tealbaseClient={tealbase}>
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
