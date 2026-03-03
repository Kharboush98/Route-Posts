import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import { ToastContainer } from 'react-toastify'
import AuthContextProvider from './Context/AuthContext.jsx'
import ProfileContextProvider from './Context/ProfileContext.jsx'

createRoot(document.getElementById('root')).render(
  <HeroUIProvider>
    <AuthContextProvider>
      <ProfileContextProvider>


        <ToastContainer />
        <App />

      </ProfileContextProvider>
    </AuthContextProvider>
  </HeroUIProvider>
)
