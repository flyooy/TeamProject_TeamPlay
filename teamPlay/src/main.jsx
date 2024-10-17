import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute'
import FightPage from './Pages/FightPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import RegistrationPage from './Pages/RegistrationPage.jsx'
import TeamPage from './Pages/TeamPage.jsx'
import UserPage from './Pages/UserPage.jsx'
import UserSelectionPage from './Pages/UserSelectionPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/registration",
    element: <RegistrationPage />
  },
  {
    path: "/fight",
    element: <ProtectedRoute element={<FightPage />} />
  },
  {
    path: "/user",
    element: <ProtectedRoute element={<UserPage />} />
  },
  {
    path: "/userselection",
    element: <ProtectedRoute element={<UserSelectionPage />} />
  }
  ,
  {
    path: "/createteam",
    element: <ProtectedRoute element={<TeamPage />} /> 
  }
  
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)