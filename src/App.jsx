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
import MyPosts from './Pages/MyPosts/MyPosts'
import Community from './Pages/Community/Community'
import Saved from './Pages/Saved/Saved'
import ProfileDetails from './Pages/ProfileDetails/ProfileDetails'

function App() {

  const routes = createBrowserRouter
  ([
    {
      path: "/" , element: <MainLayout/> , children :[
        {index:true , element: <AppProtectedRoute> <NewsFeed/> </AppProtectedRoute>},
        {path:"post/:id" , element: <AppProtectedRoute> <PostDetails/> </AppProtectedRoute>},
        {path:"profile/:id" , element: <AppProtectedRoute> <ProfileDetails/> </AppProtectedRoute>},
        {path:"settings" , element: <AppProtectedRoute> <SettingsPage/> </AppProtectedRoute>},
        {path:"profile" , element: <AppProtectedRoute> <UserProfile/> </AppProtectedRoute>},
        {path:"myPosts" , element: <AppProtectedRoute> <MyPosts/> </AppProtectedRoute>},
        {path:"community" , element: <AppProtectedRoute> <Community/> </AppProtectedRoute>},
        {path:"saved" , element: <AppProtectedRoute> <Saved/> </AppProtectedRoute>},
        // {path:"*" , element: <AppProtectedRoute> <NewsFeed/> </AppProtectedRoute>}
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
