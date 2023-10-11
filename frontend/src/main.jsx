import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store.js'
import {Provider} from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
const googleclientID=import.meta.env.VITE_GOOGLE_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={`${googleclientID}`} >
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)
