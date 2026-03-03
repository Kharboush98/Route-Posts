import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Skeleton,
} from "@heroui/react";

import { RiMessengerFill } from "react-icons/ri";
import { BsBellFill } from "react-icons/bs";
import { AuthContext } from "../../Context/AuthContext";
import { FaHome, FaUser } from "react-icons/fa";
import { IoChatbubbleSharp } from "react-icons/io5";
import logoImg from "../../assets/imgs/route.jpg";
import { ProfileContext } from "../../Context/ProfileContext";
import { NavLink, useNavigate } from "react-router";



export default function NavbarComponent() {

  const {token , setToken} = useContext(AuthContext)
  const {profileData} = useContext(ProfileContext)

  const navigate = useNavigate();

  console.log(profileData);
  

  function handleLogout()
  {
    localStorage.removeItem("userToken");
    setToken(null);
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur">
        <div className="container">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 py-1.5 sm:gap-3">
            <div onClick={()=> navigate("/")} className="cursor-pointer flex items-center gap-3">
              <img src={logoImg} alt="logo" className="h-9 w-9 rounded-xl object-cover"/>
              <h1 className="hidden text-xl font-extrabold text-slate-900 sm:block">Route Posts</h1>
            </div>

            <nav className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5">
              <NavLink className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"} 
                to="/">
                <FaHome className="text-current font-extrabold" />
                <span className="hidden sm:inline">Feed</span>
                <span className="sr-only sm:hidden">Feed</span>
              </NavLink>

              <NavLink className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"} 
                to="/profile">
                <FaUser className="text-current font-extrabold" />
                <span className="hidden sm:inline">Profile</span>
                <span className="sr-only sm:hidden">Profile</span>
              </NavLink>
              
              <NavLink className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"} 
                to="/notification">
                <IoChatbubbleSharp className="text-current font-extrabold" />
                <span className="hidden sm:inline">Notification</span>
                <span className="sr-only sm:hidden">Notification</span>
              </NavLink>
            </nav>

            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                {profileData?.photo ? 
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name={profileData?.name}
                  size="sm"
                  src={profileData?.photo}
                /> : <Skeleton className="flex rounded-full w-12 h-12" />}
                
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profilePic" className="h-14 gap-2" textValue="">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{profileData?.email}</p>
                </DropdownItem>

                <DropdownItem key="profile" onClick={()=> navigate("/profile")}>My Profile</DropdownItem>
                <DropdownItem key="settings" onClick={()=> navigate("/settings")}>Settings</DropdownItem>
                <DropdownItem onClick={()=> handleLogout()} key="logout" color="danger">
                  Log Out
                </DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </header>
    </>
  )
}
