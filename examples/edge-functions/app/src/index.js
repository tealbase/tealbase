import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Auth } from '@tealbase/auth-ui-react'
import { tealbase } from './utils/tealbaseClient'

ReactDOM.render(
  <React.StrictMode>
    <Auth.UserContextProvider tealbaseClient={tealbase}>
      <App />
    </Auth.UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
