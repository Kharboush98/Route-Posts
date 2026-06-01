import React, { useEffect } from 'react'
import Tabs from '../../Component/Tabs/Tabs'
import PostCard from '../../Component/PostCard/PostCard'
import FriendReq from '../../Component/FriendReq/FriendReq'
import CreatePost from '../../Component/CreatePost/CreatePost'
import { getAllPosts } from '../../Services/postServices'
import { useState } from 'react'
import PostSkeleton from '../../Component/Skeletons/PostSkeleton'
import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@heroui/react'

export default function NewsFeed() {

  // const [posts , setPosts]= useState([]);

  // async function fetchAllPosts() {
    
  //   const response = await getAllPosts();
  //   // console.log(response.data.data.posts);
  //   setPosts(response.data.data.posts);
    
  // }

  // useEffect(()=>{

  //   fetchAllPosts();
  // },[])

  //pagination
  const [page , setPage] = useState(1)
  const [totalPages , setTotalPages] = useState(0)

  //react query : -

  const {data , isLoading} = useQuery({
    queryKey:["getPosts" , page],
    queryFn: ()=>getAllPosts(page),
    refetchInterval:10000,
    select:(data) => data?.data
    // select:(data) => data?.data.data.posts

  })

  console.log(data)

  useEffect(()=>{
    if(data?.meta.pagination.numberOfPages)
    {
      setTotalPages(data?.meta.pagination.numberOfPages)
    }
  },[data])

  useEffect(()=>{
    window.scroll({top:0 , behavior:"smooth"})
  },[page])

  return (
    <>
      <div className='bg-[#F0F2F5] min-h-screen'>
        <div className="container pt-5 pb-5">
          <div className="grid grid-cols-4 gap-5 items-start">

            <div className="col-span-1 hidden lg:block xl:sticky xl:top-20">
              <Tabs/>
            </div>
            
            <div className="col-span-4 lg:col-span-3 xl:col-span-2 space-y-5">
              {/*
              Non-react query way
              <CreatePost callback={fetchAllPosts}/>
              {posts.length === 0 ? [...Array(10)].map((_, index) => <PostSkeleton key={index} />) : <>
              {posts && posts.map((post)=> <PostCard key={post.id} post={post} fetchAllPosts={fetchAllPosts}/>)}
              </>} */}

              <CreatePost/>

              {isLoading ? [...Array(10)].map((_, index) => <PostSkeleton key={index} />) : <>
              
              {data?.data.posts && data?.data.posts.map((post)=> <PostCard key={post.id} post={post}/>)}
              </>}

              <div className="flex justify-center py-3">
                 <Pagination 
                 page={page} 
                 key={data?.meta.pagination.numberOfPages} 
                 total={data?.meta.pagination.numberOfPages || totalPages} 
                 onChange={setPage}/>
              </div>
              
            </div>
            
            <div className="col-span-1 hidden lg:hidden xl:block xl:sticky xl:top-20">
              <FriendReq/>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
 