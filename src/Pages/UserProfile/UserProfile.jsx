import React, { useContext, useEffect, useState } from 'react'
import logo from "../../assets/imgs/route.jpg"
import { MdOutlineEmail } from 'react-icons/md'
import { FiUsers } from 'react-icons/fi'
import { ProfileContext } from '../../Context/ProfileContext'
import { getAllUserPosts } from '../../Services/authServices'
import PostCard from '../../Component/PostCard/PostCard'

export default function UserProfile() {

    const {profileData} = useContext(ProfileContext)
    const [posts , setPosts]= useState([]);
    
    
    async function getUsersPosts(userId) {
        const response = await getAllUserPosts(userId);
        console.log(response.data.data.posts);
        setPosts(response.data.data.posts);
    }

    useEffect(()=> {
        if(profileData?._id)
        {
            getUsersPosts(profileData?._id);
        }
    },[profileData])

    return (
    <>
        <div className='bg-[#F0F2F5] min-h-screen'>
            <div className="container px-3 py-4">
                <section className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,.06)] sm:rounded-[28px]'>
                    {/* CoverPhoto */}
                    <div className='group/cover relative h-44 rounded-2xl bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)] sm:h-52 lg:h-60'>
                        <div className='pointer-events-none absolute right-2 top-2 z-10 flex max-w-[90%] flex-wrap items-center justify-end gap-1.5 opacity-100 transition 
                        duration-200 sm:right-3 sm:top-3 sm:max-w-none sm:gap-2 sm:opacity-0 sm:group-hover/cover:opacity-100 sm:group-focus-within/cover:opacity-100'>
                            <label className='pointer-events-auto inline-flex cursor-pointer items-center gap-1 rounded-lg
                                bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs'>
                                Add Cover photo
                                <input type="file" className='hidden' accept='image/*' />
                            </label>
                        </div>
                    </div>

                    {/* User Details */}
                    <div className='relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6'>
                        <div className='rounded-3xl border border-white/60 bg-white/92 p-5 backdrop-blur-xl sm:p-7'>

                            <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
                                <div className='min-w-0'>
                                    <div className="flex items-end gap-4">
                                        <div className='group/avatar relative shrink-0'>
                                            <button type='button' className='cursor-zoom-in rounded-full'>
                                                <img src={profileData?.photo} alt={profileData?.name} className='h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe]'/>
                                            </button>
                                        </div>

                                        <div className='min-w-0 pb-1'>
                                            <h2 className='truncate text-2xl font-black tracking-tight text-slate-900 sm:text-4xl'>{profileData?.name}</h2>
                                            <p className='mt-1 text-lg font-semibold text-slate-500 sm:text-xl'>@{profileData?.username}</p>
                                            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0]">
                                                Route Posts Member
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='grid w-full grid-cols-3 gap-2 lg:w-130'>
                                    <div className='rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4'>
                                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">Followers</p>
                                        <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{profileData?.followersCount}</p>
                                    </div>

                                    <div className='rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4'>
                                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">Following</p>
                                        <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{profileData?.followersCount}</p>
                                    </div>

                                    <div className='rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4'>
                                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">Bookmarks</p>
                                        <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{profileData?.bookmarksCount}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='my-5 grid gap-4 lg:grid-cols-[1.3fr_.7fr]'>
                                <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                                    <h3 className='text-sm font-extrabold text-slate-800'>About</h3>
                                    <div className='mt-3 space-y-2 text-sm text-slate-600'>
                                        <p className='flex items-center gap-2'>
                                            <MdOutlineEmail/>
                                            {profileData?.email}
                                        </p>
                                        <p className='flex items-center gap-2'>
                                            <FiUsers />
                                            Active on Route Posts
                                        </p>
                                    </div>
                                </div>
                            
                                <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-1'>
                                    <div className='rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3'>
                                        <p className='text-xs font-bold uppercase tracking-wide text-[#1f4f96]'>My Posts</p>
                                        <p className='mt-1 text-2xl font-black text-slate-900'>{posts.length}</p>
                                    </div>

                                    <div className='rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3'>
                                        <p className='text-xs font-bold uppercase tracking-wide text-[#1f4f96]'>Saved Posts</p>
                                        <p className='mt-1 text-2xl font-black text-slate-900'>0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className='my-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm'>
                        <div className='grid w-full grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5 sm:inline-flex sm:w-auto sm:gap-0'>
                            <button className='inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition bg-white text-[#1877f2] shadow-sm'>
                                My Posts
                            </button>

                            <button className='inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition text-slate-600 hover:text-slate-900'>
                                Saved
                            </button>
                        </div>
                    </div>

                    <div className='space-y-3'>
                        {posts.length > 0 ? 
                            <>              
                                {posts && posts.map((post)=> <PostCard key={post.id} post={post} />)}
                            </>
                            :
                            <p className='rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500'>
                                You have not posted yet.
                            </p>
                        }
                    </div>

                </section>




            </div>
        </div>
    </>
  )
}
