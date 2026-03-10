import React from 'react'
import userImg from "../../assets/imgs/route.jpg"
import { BiWorld } from "react-icons/bi";
import { AiFillLike, AiOutlineRetweet } from "react-icons/ai";
import { FaRegCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router';
import PostHeader from '../PostComponent/PostHeader';
import PostBody from '../PostComponent/PostBody';
import PostFooter from '../PostComponent/PostFooter';

function CommentTime(iso)
{
    if(iso) return ''

    const d = new Date(iso)
    const mins = Math.floor((Date.now() - d) / 60000)

    if(mins < 1) return 'just now'
    if(mins < 60) return `${mins}m`
    if(mins < 1440) return `${Math.floor(mins / 60)}h`
    return `${Math.floor(mins/1440)}d`

}

export function getAvatar(photo){
    return photo && !String(photo).includes('undefined') ? photo : userImg
}

export default function PostCard({post , fetchAllPosts}) {
    // console.log(post);
    
    function HandlePostWithoutImage(image ,post)
    {
        if(!image)
        {
            return <>
                <div className='w-full h-50 bg-blue-200 text-white flex items-center justify-content'>
                    <p>{post}</p>
                </div>
            </>
        }
    }

  return (
    <>
      <div className='space-y-4'>
        <article className='overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm'>
            {/* header */}
            <PostHeader fetchAllPosts={fetchAllPosts} body={post.body} image={post.image} userId={post.user._id} id={post.id} photo={post.user?.photo} name={post.user?.name} username={post.user?.username} createdAt={post.createdAt} privacy={post?.privacy}/>

            {/* Body */}
            <PostBody id={post.id} body={post.body} image={post.image}/>
            
            
            {/* post actions : like comment share stats*/}
            <PostFooter id={post.id} userId={post.user._id} likes={post.likesCount} likesArray={post.likes} shares={post.sharesCount} comments={post.commentsCount} topComment={post.topComment}/>

        </article>
      </div>
    </>
  )
}
