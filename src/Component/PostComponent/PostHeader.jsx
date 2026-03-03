import React, { useContext, useEffect, useState } from 'react'
import { BiWorld } from 'react-icons/bi'
import { getAvatar } from '../PostCard/PostCard'
import { BsThreeDots } from 'react-icons/bs'
import { FaBookmark } from 'react-icons/fa'
import { ProfileContext } from '../../Context/ProfileContext'
import { MdDelete, MdOutlineModeEdit } from 'react-icons/md'
import { FiDelete } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { deletePostByID } from '../../Services/postServices'
import PostModal from '../PostModal/PostModal'
import { useDisclosure } from '@heroui/react'

export default function PostHeader({fetchAllPosts, body, image, userId, id, photo , name, username, createdAt , privacy}) {

    const [options , setOptions] = useState(false)

    const {isOpen, onOpen, onOpenChange} = useDisclosure();


    const {profileData} = useContext(ProfileContext)    

    // console.log(id, id.toString());

    async function deletePost(postId)
    {
        try {
            const response = await deletePostByID(postId);
            console.log(response , "response");
            toast.success("Deleted")

            fetchAllPosts();

        } catch (error) {
            console.log(error);
        }
    }
    

  return (
    <>
      <div className='p-4'>
            <div className='mb-3 flex items-center gap-3'>
                <img src={getAvatar(photo)} alt={name || 'unknown'} className='h-11 w-11 rounded-full object-cover'/>
                <div className='flex-1'>
                    <a className='truncate text-sm font-bold text-foreground hover:underline'
                        href=''>{name || 'unknown'}
                    </a>
                    <div className='flex flex-wrap items-center gap-1 text-xs text-muted-foreground space-x-1.5'>
                        <span>@{username || 'unknown'}.</span>

                        <span>{new Date(createdAt).toLocaleString()}.</span>

                        <div className='inline-flex items-center'>
                            <BiWorld className='text-xs'/>
                            <p className='capitalize'>{privacy || 'unknown'}.</p>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <button onClick={()=> setOptions(!options)} className='rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700'>
                        <BsThreeDots/>
                    </button>

                    {profileData?._id === userId ? 
                        options && (
                            <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                            <button onClick={()=> {onOpen(); setOptions(!options); }} className='cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50'>
                                <MdOutlineModeEdit />
                                Edit
                            </button>
                            <button onClick={()=> deletePost(id)} className='cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-red-700 hover:bg-slate-50'>
                                <MdDelete />
                                Delete
                            </button>
                        </div>
                        )
                        :  
                        options && (
                            <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                            <button className='cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50'>
                                <FaBookmark/>
                                Bookmark
                            </button>
                        </div>
                        )
                    }
                </div>
                <PostModal isOpen={isOpen} onOpenChange={onOpenChange} id={id} body={body} image={image} fetchAllPosts={fetchAllPosts}/>
            </div>
        </div>
    </>
  )
}
