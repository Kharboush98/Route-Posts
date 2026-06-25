import React, { useContext, useEffect, useState } from 'react'
import { ProfileContext } from '../../Context/ProfileContext';
import Tabs from '../../Component/Tabs/Tabs';
import FriendReq from '../../Component/FriendReq/FriendReq';
import { getAllUserPosts } from '../../Services/authServices';
import PostCard from '../../Component/PostCard/PostCard';
import { useQuery } from '@tanstack/react-query';
import PostSkeleton from '../../Component/Skeletons/PostSkeleton';
import MobileTabs from '../../Component/MobileTabs/MobileTabs';

export default function MyPosts() {

    const {profileData} = useContext(ProfileContext)
    // const [posts , setPosts]= useState([]);    

    // async function getUsersPosts(userId) {
    //     const response = await getAllUserPosts(userId);
    //     console.log(response.data.data.posts);
    //     setPosts(response.data.data.posts);
    // }

    // useEffect(()=> {
    //     if(profileData?._id)
    //     {
    //         getUsersPosts(profileData?._id);
    //     }
    // },[profileData])

    const {data : posts , isLoading} = useQuery({
        queryKey:["getMyPosts"],
        queryFn: ()=> getAllUserPosts(profileData?._id),
        select:(data) => data?.data.data.posts,
        enabled: !!profileData?._id
    })

  return (
    <>
        <div className='bg-[#F0F2F5] min-h-screen'>
            <div className="container pt-5 pb-5">
                <div className="container grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]">
        
                    <div className="hidden lg:block xl:sticky xl:top-20">
                        <Tabs/>
                    </div>
                    
                    <div className="space-y-5">
                        <MobileTabs/>

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
                                    You have not posted yet.
                                </p>
                            )
                        }
                    </div>
                    
                    <div className="hidden lg:hidden xl:block xl:sticky xl:top-20">
                        <FriendReq/>
                    </div>
        
                </div>
            </div>
        </div>
    </>
  )
}