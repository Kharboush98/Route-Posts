import React, { useEffect, useState } from 'react'
import { getAllUserPosts, getAllUserProfiles } from '../../Services/authServices';
import { useParams } from 'react-router';
import { MdOutlineEmail } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import PostCard from '../../Component/PostCard/PostCard';

export default function ProfileDetails() {

    const {id} = useParams();
    const [posts , setPosts]= useState([]);
    const [user, setUser] = useState(null);

    
    async function getUser(UserId) {
        const response = await getAllUserProfiles(UserId);
        console.log(response.data.data)
        setUser(response.data.data);
    }

    async function getUserposts(userId) {
        const response = await getAllUserPosts(userId);
        console.log(response.data.data.posts);
        setPosts(response.data.data.posts);
    }

    useEffect(()=> {
        if (id) {
            getUser(id);
            getUserposts(id);
        }
    },[id])

    return (
        <>
            <div className='bg-[#F0F2F5] min-h-screen'>
                <div className="container px-3 py-4">
                    <section className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,.06)] sm:rounded-[28px]'>
                        {user?.user.cover ? 
                            <img src={user?.user.cover} alt={user?.user.name} className='relative w-full object-cover h-44 rounded-2xl sm:h-52 lg:h-60'></img> 
                        : 
                            <div className='group/cover relative h-44 rounded-2xl bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)] sm:h-52 lg:h-60'>  </div>
                        }

                        <div className='relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6'>
                            <div className='rounded-3xl border border-white/60 bg-white/92 p-5 backdrop-blur-xl sm:p-7'>

                                <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
                                    <div className='min-w-0'>
                                        <div className="flex items-end gap-4">
                                            <div className='group/avatar relative shrink-0'>
                                                <button type='button' className='cursor-zoom-in rounded-full'>
                                                    <img src={user?.user.photo} alt={user?.user.name} className='h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe]'/>
                                                </button>
                                            </div>

                                            <div className='min-w-0 pb-1'>
                                                <h2 className='truncate text-2xl font-black tracking-tight text-slate-900 sm:text-4xl'>{user?.user.name}</h2>
                                                <p className='mt-1 text-lg font-semibold text-slate-500 sm:text-xl'>@{user?.user.username}</p>
                                                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0]">
                                                    Route Posts Member
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-wrap w-full gap-2 lg:w-130'>
                                        <div className='flex-1 min-w-20 flex-wrap rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4'>
                                            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">Followers</p>
                                            <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{user?.user.followersCount}</p>
                                        </div>

                                        <div className='flex-1 min-w-20 flex-wrap rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4'>
                                            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">Following</p>
                                            <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{user?.user.followingCount}</p>
                                        </div>

                                        {user?.isFollowing ? 
                                        (
                                            <button className='group flex-1 min-w-20 flex-wrap flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white hover:bg-gray-200 cursor-pointer px-3 py-3 text-center sm:px-4 sm:py-4'>
                                                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-sm">
                                                    <span className='group-hover:hidden'>Followed ✔</span>
                                                    <span className='hidden group-hover:block text-red-500'>UnFollow</span>
                                                </p>
                                            </button>
                                        ) 
                                        : 
                                        (
                                            <button className='flex-1 min-w-20 flex-wrap flex flex-col items-center justify-center rounded-2xl border border-[#d7e7ff] bg-[#eef6ff] hover:bg-gray-200 cursor-pointer px-3 py-3 text-center sm:px-4 sm:py-4'>
                                                <p className="text-[11px] font-bold uppercase tracking-wide text-[#0b57d0] sm:text-sm">Follow</p>
                                            </button>
                                        )
                                        }
                                    </div>
                                </div>

                                <div className='my-5 grid gap-4 lg:grid-cols-[1.3fr_.7fr]'>
                                    <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                                        <h3 className='text-sm font-extrabold text-slate-800'>About</h3>
                                        <div className='mt-3 space-y-2 text-sm text-slate-600'>
                                            <p className='flex items-center gap-2'>
                                                <MdOutlineEmail/>
                                                {user?.user.email}
                                            </p>
                                            <p className='flex items-center gap-2'>
                                                <FiUsers />
                                                Active on Route Posts
                                            </p>
                                        </div>
                                    </div>
                                
                                    <div>
                                        <div className='rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3'>
                                            <p className='text-xs font-bold uppercase tracking-wide text-[#1f4f96]'>{user?.user.name} Posts</p>
                                            <p className='mt-1 text-2xl font-black text-slate-900'>{posts.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className='space-y-3 pt-3'>
                            {posts.length > 0 ? 
                                <>    
                                    <div className='w-[75%] space-y-5 m-auto'>
                                        {posts && posts.map((post)=> <PostCard key={post.id} post={post} />)}
                                    </div>          
                                </>
                                :
                                <p className='rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500'>
                                    {user?.user.name} has not posted yet.
                                </p>
                            }
                        </div>

                    </section>
                </div>
            </div>
        </>
    )
}
