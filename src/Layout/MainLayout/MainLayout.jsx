import React from 'react'
import NavbarComponent from '../../Component/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../../Component/Footer/Footer'
import ScrollToTop from '../../Functions/Scroll/ScrollToTop'

export default function MainLayout() {
  return (
    <>
      <ScrollToTop/>
      <NavbarComponent/>
      <Outlet/>
      {/* <Footer/> */}
    </>
  )
}
