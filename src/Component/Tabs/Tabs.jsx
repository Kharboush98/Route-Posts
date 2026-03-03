import React from 'react'
import { MdFeed } from 'react-icons/md'
import { FaRegBookmark } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { BsStars } from "react-icons/bs";
import { Link, NavLink } from 'react-router';

const tabs = [
    {to: '/', name: 'Feed' , icon: MdFeed, isActive: true},
    {to: '/profile', name: 'My Posts' , icon: BsStars, isActive: false},
    {to: '/', name: 'Community' , icon: TbWorld, isActive: false},
    {to: '/', name: ' Saved' , icon: FaRegBookmark, isActive: false},
]

export default function Tabs() {

  return (
    <>
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm space-y-2.5">
            {tabs.map(({to, name , icon:Icon , isActive}) =>(
                <NavLink key={name} className={`${isActive ? 'tabs-btn-active' : 'tabs-btn'}`} to={to}>
                    <Icon className="text-lg font-extrabold"/>
                    {name}
                </NavLink>
            ))}
            
            {/* <button className="tabs-btn-active">
                <MdFeed className="text-lg font-extrabold"/>
                Feed
            </button>
            <button className="tabs-btn">
                <BsStars className="text-lg font-extrabold"/>
                My Posts
            </button>
            <button className="tabs-btn">
                <TbWorld className="text-lg font-extrabold"/>
                Community
            </button>
            <button className="tabs-btn">
                <FaRegBookmark className="text-lg font-extrabold"/>
                Saved
            </button> */}
        </div>
    </>
  )
}
