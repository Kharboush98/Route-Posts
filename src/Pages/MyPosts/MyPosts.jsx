import React, { useContext, useEffect, useState } from 'react'
import { ProfileContext } from '../../Context/ProfileContext';
import Tabs from '../../Component/Tabs/Tabs';
import FriendReq from '../../Component/FriendReq/FriendReq';
import { getAllUserPosts } from '../../Services/authServices';
import PostCard from '../../Component/PostCard/PostCard';
import { useQuery } from '@tanstack/react-query';
import PostSkeleton from '../../Component/Skeletons/PostSkeleton';

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
                <div className="grid grid-cols-4 gap-5">
        
                    <div className="col-span-1 hidden lg:block">
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
                                    You have not posted yet.
                                </p>
                            )
                        }
                    </div>
                    
                    <div className="col-span-1 hidden lg:block">
                    <FriendReq/>
                    </div>
        
                </div>
            </div>
        </div>
    </>
  )
}