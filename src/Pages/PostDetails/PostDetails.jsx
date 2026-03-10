import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getPostById } from '../../Services/postServices';
import PostHeader from '../../Component/PostComponent/PostHeader';
import PostBody from '../../Component/PostComponent/PostBody';
import PostFooter from '../../Component/PostComponent/PostFooter';
import PostSkeleton from '../../Component/Skeletons/PostSkeleton';

export default function PostDetails() {

  const [post , setPost] = useState('');

  const {id} = useParams();

  useEffect(() => {

    async function fetchPostDetails(postId)
    {
      const response = await getPostById(postId);
      console.log(response.data.data.post , 'details');  
      setPost(response.data.data.post);
    }

    fetchPostDetails(id);
  },[id])


  return (
    <>
      <div className='bg-[#F0F2F5] p-5 min-h-screen'>
        {post ? <>
          <article className='overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm container'>
            {/* header */}
            <PostHeader userId={post.user._id} id={post.id} photo={post.user?.photo} name={post.user?.name} username={post.user?.username} createdAt={post.createdAt} privacy={post?.privacy}/>

            {/* Body */}
            <PostBody id={post.id} body={post.body} image={post.image}/>
            
            
            {/* post actions : like comment share stats*/}
            <PostFooter id={post.id} likes={post.likesCount} likesArrray={post.likes} shares={post.sharesCount} comments={post.commentsCount} topComment={post.topComment}/>

          </article>
        </> : <PostSkeleton/>}
      </div>
    </>
  )
}
