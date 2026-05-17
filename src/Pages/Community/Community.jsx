import React, { useContext, useEffect, useState } from 'react'
import Tabs from '../../Component/Tabs/Tabs'
import FriendReq from '../../Component/FriendReq/FriendReq'
import { ProfileContext } from '../../Context/ProfileContext';
import { getAllUserFollowersPosts } from '../../Services/postServices';
import PostCard from '../../Component/PostCard/PostCard';

export default function Community() {

    const {profileData} = useContext(ProfileContext)
    const [posts , setPosts]= useState([]);

    async function getUsersPosts() {
        const response = await getAllUserFollowersPosts();
        // console.log(response.data.data.posts);
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
            <div className="container pt-5 pb-5">
                <div className="grid grid-cols-4 gap-5">
        
                    <div className="col-span-1 hidden lg:block">
                    <Tabs/>
                    </div>
                    
                    <div className="col-span-4 lg:col-span-2 space-y-5">
                        {posts.length > 0 ? 
                            <>    
                                <div className='space-y-5 m-auto'>
                                    {posts && posts.map((post)=> <PostCard key={post.id} post={post} />)}
                                </div>          
                            </>
                            :
                            <p className='rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500'>
                                You have not posted yet.
                            </p>
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
