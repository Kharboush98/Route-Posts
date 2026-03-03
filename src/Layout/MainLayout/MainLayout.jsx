import React from 'react'
import NavbarComponent from '../../Component/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../../Component/Footer/Footer'

export default function MainLayout() {
  return (
    <>
      <NavbarComponent/>
      <Outlet/>
      {/* <Footer/> */}
    </>
  )
}
