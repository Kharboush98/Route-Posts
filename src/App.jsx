import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'

import MainLayout from './Layout/MainLayout/MainLayout'
import AppProtectedRoute from './Component/ProtectedRoutes/AppProtectedRoute'
import NewsFeed from './Pages/NewsFeed/NewsFeed'
import NotFound from './Pages/NotFound/NotFound'
import AuthLayout from './Layout/AuthLayout/AuthLayout'
import AuthProtectedRoute from './Component/ProtectedRoutes/AuthProtectedRoute'
import Register from './Pages/Auth/Register/Register'
import Login from './Pages/Auth/Login/Login'
import PostDetails from './Pages/PostDetails/PostDetails'
import SettingsPage from './Pages/SettingsPage/SettingsPage'
import UserProfile from './Pages/UserProfile/UserProfile'

function App() {

  const routes = createBrowserRouter
  ([
    {
      path: "/" , element: <MainLayout/> , children :[
        {index:true , element: <AppProtectedRoute> <NewsFeed/> </AppProtectedRoute>},
        {path:"post/:id" , element: <AppProtectedRoute> <PostDetails/> </AppProtectedRoute>},
        {path:"settings" , element: <AppProtectedRoute> <SettingsPage/> </AppProtectedRoute>},
        {path:"profile" , element: <AppProtectedRoute> <UserProfile/> </AppProtectedRoute>},
        {path:"*" , element: <NotFound/>}
      ]
    },
    {
      path:"/" , element: <AuthLayout/> , children :[
        {path:"login" , element: <AuthProtectedRoute><Login/></AuthProtectedRoute> },
        {path:"register" , element: <AuthProtectedRoute><Register/></AuthProtectedRoute> },
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
