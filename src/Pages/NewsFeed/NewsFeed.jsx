import React, { useEffect } from 'react'
import Tabs from '../../Component/Tabs/Tabs'
import PostCard from '../../Component/PostCard/PostCard'
import FriendReq from '../../Component/FriendReq/FriendReq'
import CreatePost from '../../Component/CreatePost/CreatePost'
import { getAllPosts } from '../../Services/postServices'
import { useState } from 'react'
import PostSkeleton from '../../Component/Skeletons/PostSkeleton'

export default function NewsFeed() {

  const [posts , setPosts]= useState([]);

  async function fetchAllPosts() {
    
    const response = await getAllPosts();
    // console.log(response.data.data.posts);
    setPosts(response.data.data.posts);
    
  }

  useEffect(()=>{

    fetchAllPosts();
  },[])

  return (
    <>
      <div className='bg-[#F0F2F5] min-h-screen'>
        <div className="container pt-5 pb-5">
          <div className="grid grid-cols-4 gap-5">

            <div className="col-span-1 hidden lg:block">
              <Tabs/>
            </div>
            
            <div className="col-span-4 lg:col-span-2 space-y-5">
              <CreatePost callback={fetchAllPosts}/>

              {posts.length === 0 ? [...Array(10)].map((_, index) => <PostSkeleton key={index} />) : <>
              
              {posts && posts.map((post)=> <PostCard key={post.id} post={post} fetchAllPosts={fetchAllPosts}/>)}
              </>}
              
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
 