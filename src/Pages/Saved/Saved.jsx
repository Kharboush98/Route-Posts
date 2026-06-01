import React, { useContext, useEffect, useState } from 'react'
import Tabs from '../../Component/Tabs/Tabs'
import FriendReq from '../../Component/FriendReq/FriendReq'
import PostCard from '../../Component/PostCard/PostCard'
import { ProfileContext } from '../../Context/ProfileContext'
import { getAllBookmarks } from '../../Services/authServices'
import { useQuery } from '@tanstack/react-query'
import PostSkeleton from '../../Component/Skeletons/PostSkeleton'

export default function Saved() {

    const {profileData} = useContext(ProfileContext)
    // const [posts , setPosts]= useState([]);

    // async function getUsersPosts() {
    //     const response = await getAllBookmarks();
    //     console.log(response.data.data.bookmarks);
    //     setPosts(response.data.data.bookmarks);
    // }

    // useEffect(()=> {
    //     if(profileData?._id)
    //     {
    //         getUsersPosts(profileData?._id);
    //     }
    // },[profileData])

    const {data : posts , isLoading} = useQuery({
        queryKey:["getBookmarks"],
        queryFn: ()=> getAllBookmarks(),
        select:(data) => data?.data.data.bookmarks,
        enabled: !!profileData?._id
    })


  return (
    <>
      <div className='bg-[#F0F2F5] min-h-screen'>
            <div className="container pt-5 pb-5">
                <div className="grid grid-cols-4 gap-5 items-start">
        
                    <div className="col-span-1 hidden lg:block xl:sticky xl:top-20">
                        <Tabs/>
                    </div>
                    
                    <div className="col-span-4 lg:col-span-2 space-y-5">
                        {isLoading ? [...Array(10)].map((_, index) => <PostSkeleton key={index} />) 
                        : 
                        posts?.length > 0 ? 
                            (    
                                <div className='space-y-5 m-auto'>
                                    {posts && posts.map((post)=> <PostCard key={post.id} post={post} />)}
                                </div>          
                            )
                            :
                            (
                                <p className='rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500'>
                                    You have no bookmarked posts yet.
                                </p>
                            )
                        }
                    </div>
                    
                    <div className="col-span-1 hidden lg:block xl:sticky xl:top-20">
                        <FriendReq/>
                    </div>
        
                </div>
            </div>
        </div>
    </>
  )
}
