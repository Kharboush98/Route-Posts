import React from 'react'
import { MdFeed } from 'react-icons/md'
import { FaRegBookmark } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { BsStars } from "react-icons/bs";
import { Link, NavLink } from 'react-router';


const tabs = [
    {to: '/', name: 'Feed' , icon: MdFeed},
    {to: '/myPosts', name: 'My Posts' , icon: BsStars},
    {to: '/community', name: 'Community' , icon: TbWorld},
    {to: '/saved', name: ' Saved' , icon: FaRegBookmark},
]

export default function MobileTabs() {

    return (
      <>
        <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm lg:hidden">
          <div className="grid grid-cols-2 gap-2">
                {tabs.map(({to, name , icon:Icon , isActive}) =>(
                    <NavLink 
                        key={name}
                        // className={`${isActive ? 'tabs-btn-active' : 'tabs-btn'}`}
                        className={({ isActive }) => isActive ? 
                        'tabs-btn-active flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold' 
                        :
                        'tabs-btn flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold'}
                        to={to}
                        end>
                        <Icon className="text-lg font-extrabold"/>
                        {name}
                    </NavLink>
                ))}
          </div>
        </div>
      </>
    );
}
