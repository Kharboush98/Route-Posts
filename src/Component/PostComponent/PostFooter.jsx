import React, { useContext, useEffect } from 'react'
import { AiFillDislike, AiFillLike, AiOutlineRetweet } from 'react-icons/ai'
import { FaRegCommentAlt, FaSmile } from 'react-icons/fa'
import { ImSpinner } from "react-icons/im";
import { getAvatar } from '../PostCard/PostCard'
import { Link } from 'react-router'
import { CreateComment, deleteComment, getAllComments } from '../../Services/CommentServices'
import { useState } from 'react'
import { IoMdSend } from 'react-icons/io';
import { FaCamera, FaHourglassEnd } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { ProfileContext } from '../../Context/ProfileContext';
import { BsThreeDots } from 'react-icons/bs';
import { MdDelete, MdOutlineModeEdit } from 'react-icons/md';
import { useDisclosure } from '@heroui/react';
import CommentModal from '../CommentModal/CommentModal';
import { likeUnLikePost } from '../../Services/postServices';
import { FcLike } from "react-icons/fc";


export default function PostFooter({id,userId, likes, likesArray = [] , shares , comments ,topComment}) {

    const [isLoading , setIsLoading] = useState();

    const [Allcomments , setComments] = useState([]);

    const otherComments = Allcomments?.filter((comment)=> comment._id !== topComment?._id)

    const [options , setOptions] = useState(false)
    const [openCommentId, setOpenCommentId] = useState(null);

    const {profileData} = useContext(ProfileContext)  

    async function fetchAllComments(postId)
    {
        try {
            setIsLoading(true);
            const response = await getAllComments(postId);
            console.log("allcomments",response.data.data.comments);
            console.log("topcomment",topComment)
            setComments(response.data.data.comments);
            
        } catch (error) {
            console.log(error);


        } finally {
            setIsLoading(false);
        }
    }

    //show mnore comments
    const [showMoreComments , setShowMoreComments] = useState(2);
    
    //write comment
    const [commentBody , setCommentBody] = useState("");
    const [isLoadingComment , setIsLoadingComment] = useState();


    async function handleAddButton(postId)
    {
        try {
            setIsLoadingComment(true)
            const formData = new FormData();
            // console.log(postId , commentBody);

            formData.append("content" , commentBody)
            const response = await CreateComment(postId , formData);
            // console.log(response);

            setCommentBody("")
            fetchAllComments(id)
            
            toast.success(response.data.message)

        } catch (error) {
            console.log(error);
            toast.error("comment Failed")
        } finally {
            setIsLoadingComment(false)
        }
    }

    //edit comment 
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [editingComment, setEditingComment] = useState(null);

    //Like //  Unlike Post

    const [likesCount, setLikesCount] = useState(likesArray.length);
    const [isLiked, setIsLiked] = useState(false);


    async function LikePostToggle(postId)
    {

        const newLikedState = !isLiked;
        setIsLiked(newLikedState);

        setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);

        try {
            
            const response = await likeUnLikePost(postId);
            console.log(response.data.data);
            setLikesCount(response.data.data.likesCount);

            toast.success("Like//Dislike Successful");

        } catch (error) {
            console.log(error);
            setIsLiked(!newLikedState);
            setLikesCount(prev => newLikedState ? prev - 1 : prev + 1);
            toast.error("Like failed")
        }
    }

    useEffect(() => {
        if (!profileData?._id) return;

        setLikesCount(likesArray.length);

        const liked = likesArray.includes(profileData._id);
        setIsLiked(liked);

    }, [likesArray, profileData]);


    //delete comment

    async function deletePostComment(postId, commentId)
    {
        try {
            console.log("clicked");
            
            const response = await deleteComment(postId , commentId);
            console.log(response);

            fetchAllComments(id);

        } catch (error) {
            console.log(error);
        }
    } 

    return (
    <>
        {/* post actions : like comment share stats*/}
        <div className='px-4 pb-2 pt-3 text-sm text-slate-500'>
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    {isLiked ? <FcLike className='text-red-400'/> : <AiFillLike />} 
                    <button type='button' className='font-semibold transition cursor-pointer hover:text-[#1877f2] hover:underline'>
                        {likesCount} likes
                    </button>
                </div>

                <div className='flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm'>
                    <span className='inline-flex items-center gap-1'>
                        <AiOutlineRetweet />
                        {shares} Shares
                    </span>
                    
                    <button onClick={()=> fetchAllComments(id)} className='inline-flex items-center gap-1 cursor-pointer hover:text-slate-700'>
                        <FaRegCommentAlt />
                        {comments} Comments
                    </button>

                    <button className='rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]'>
                        View Details
                    </button>

                </div>
            </div>
        </div>

        <div className='mx-4 border-t border-slate-200'></div>

        {/* Like comment share actions */}
        <div className='grid grid-cols-3 gap-1 p-1'>
            <button onClick={()=> LikePostToggle(id)} className='cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors
            disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100'>
                {isLiked ? <AiFillDislike /> : <AiFillLike />}
                <span>{isLiked ? "Dislike" : "Like"}</span>
            </button>

            <button onClick={()=> fetchAllComments(id)} className='cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors
            disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100'>
                {/* <FaRegCommentAlt /> */}
                {isLoading ? <ImSpinner/> : <FaRegCommentAlt />}
                <span>Comment</span>
            </button>

            <button className='cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors
            disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100'>
                <AiOutlineRetweet />
                <span>Share</span>
            </button>
        </div>

        <div className='mx-4 border-b border-slate-200 mb-2'></div>

        {/* post comment */}
        <div className="flex items-center gap-2 p-2">
            <input 
                onChange={(e)=> setCommentBody(e.target.value)} value={commentBody}
                type="text" placeholder='Comment on Post'
                className='flex-1 rounded-full border border-slate-200 bg-slate-50 py-3 px-4 text-[17px] leading-relaxed
                     text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white'
            />

            <button onClick={()=>handleAddButton(id)} type='button' disabled={!commentBody} className='p-2.5 disabled:cursor-not-allowed text-[18px] text-blue-400 hover:text-blue-600 rounded-full hover:bg-gray-200'>
                {/* <IoMdSend/> */}
                {isLoadingComment ? <FaHourglassEnd/> : <IoMdSend/>}
            </button>
            <button type='button' className='p-2.5 text-[18px] text-blue-400 hover:text-blue-600 rounded-full hover:bg-gray-200'>
                <FaCamera/>
            </button>
            <button type='button' className='p-2.5 text-[18px] text-blue-400 hover:text-blue-600 rounded-full hover:bg-gray-200'>
                <FaSmile/>
            </button>
        </div>

        {/* <div className='mx-4 border-t border-slate-200 mt-2 mb-2'></div> */}

        {/* comments */}
        {(topComment) && 
        <div className='px-4 py-1 flex gap-3'>
            <img src={getAvatar(topComment.commentCreator?.photo)} alt={topComment.commentCreator?.name || 'unknown'} className='h-8 w-8 rounded-full shrink-8' />
            <div className='min-w-0 flex-1'>
                <div className='bg-gray-100 rounded-2xl rounded-tl-sm px-3 py-2 inline-block'>
                    <p className='text-gray-900 text-[15px] font-semibold'>{topComment.commentCreator?.name ?? 'unkown'}</p>
                    <p className='text-gray-800 text-[15px] mt-0.5'>{topComment?.content}</p>
                </div>
                <p className='text-gray-500 text-[12px] mt-1 ml-1'>{new Date(topComment?.createdAt).toLocaleString()}</p>
            </div>
            
            <div className="relative">
                <button onClick={()=> {setOpenCommentId(prev=> prev === topComment.commentCreator._id ? null : topComment.commentCreator._id)}} className='rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700'>
                    <BsThreeDots/>
                </button>

                {openCommentId === topComment.commentCreator._id && (
                    <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">

                        {profileData?._id === topComment.commentCreator?._id ? (
                        <>
                            <button onClick={()=> {onOpen(); setEditingComment(topComment); setOpenCommentId(prev=> prev === topComment._id ? null : topComment._id);}} 
                            className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
                            <MdOutlineModeEdit />
                            Edit
                            </button>

                            <button onClick={()=> deletePostComment(id , topComment._id)}
                            className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-red-700 hover:bg-slate-50">
                            <MdDelete />
                            Delete
                            </button>
                        </>
                        ) : (
                        <button className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
                            <AiFillLike />
                            Like
                        </button>
                        )}

                    </div>
                )}
            </div>
        </div>
        }

        {otherComments && otherComments.slice(0,showMoreComments).map((comment)=> 
        <div key={comment._id} className='px-4 py-1 flex gap-3'>
            <img src={getAvatar(comment.commentCreator?.photo)} alt={comment.commentCreator?.name || 'unknown'} className='h-8 w-8 rounded-full shrink-8' />
            <div className='min-w-0 flex-1'>
                <div className='bg-gray-100 rounded-2xl rounded-tl-sm px-3 py-2 inline-block'>
                    <p className='text-gray-900 text-[15px] font-semibold'>{comment.commentCreator?.name ?? 'unkown'}</p>
                    <p className='text-gray-800 text-[15px] mt-0.5'>{comment?.content}</p>
                </div>
                <p className='text-gray-500 text-[12px] mt-1 ml-1'>{new Date(comment?.createdAt).toLocaleString()}</p>
            
            </div>

            <div className="relative">

                <button onClick={()=> {setOpenCommentId(prev=> prev === comment._id ? null : comment._id); }}
                className='rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700'>
                    <BsThreeDots/>
                </button>
                
                {openCommentId === comment._id && (
                    <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">

                        {profileData?._id === comment.commentCreator?._id ? (
                        <>
                            <button onClick={()=> {onOpen(); setEditingComment(comment); setOpenCommentId(prev=> prev === comment._id ? null : comment._id);}}
                            className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
                            <MdOutlineModeEdit />
                            Edit
                            </button>

                            <button onClick={()=> deletePostComment(id , comment._id)} 
                            className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-red-700 hover:bg-slate-50">
                            <MdDelete />
                            Delete
                            </button>
                        </>
                        ) : (
                        <button className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
                            <AiFillLike />
                            Like
                        </button>
                        )}

                    </div>
                )}
            </div>
        </div>)}

        {editingComment && (
        <CommentModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            postId={id}
            c_id={editingComment._id}
            body={editingComment.content}
            image=""
            fetchAllComments = {fetchAllComments}
        />
        )}

        {otherComments.length > showMoreComments && <>
            <div className="text-left px-2 pb-2">
                <button onClick={()=> setShowMoreComments(showMoreComments + 2)} className='rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]'>
                    Show More Comments
                </button>
            </div>
        </>}

    </>
  )
}
