import React, { useContext, useRef, useState } from 'react'
import { FaImage } from "react-icons/fa6";
import { FaRegSmile } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { BiWorld } from "react-icons/bi";

import userImg from "../../assets/imgs/route.jpg"
import { Button, Input, Skeleton } from '@heroui/react';
import { createPost } from '../../Services/postServices';
import { toast } from 'react-toastify';
import { ProfileContext } from '../../Context/ProfileContext';

export default function CreatePost({callback}) {

    const [displayPhoto , SetDisplayPhoto] = useState("")
    const [sendPhoto , SetSendPhoto] = useState("")
    const [postContent , SetPostContent] = useState("")

    const [isLoading , setIsLoading] = useState();
    

    const inputPhoto = useRef();

    const {profileData} = useContext(ProfileContext)
    


    function handleSelectedImage()
    {
        console.log(inputPhoto.current.files[0]);
        //format for photo to send to the end point
        SetSendPhoto(inputPhoto.current.files[0])

        //format to display the photo
        SetDisplayPhoto(URL.createObjectURL(inputPhoto.current.files[0]))
    }

    async function handleFetchingPost() {

        try {
            setIsLoading(true)
            const formData = new FormData()
            formData.append("body", postContent)
            if (sendPhoto) {
                formData.append("image", sendPhoto)
            }
            
            const response = await createPost(formData);
            toast.success(response.data.message)

            SetSendPhoto("")
            SetPostContent("")
            SetDisplayPhoto("")
            if (inputPhoto.current) {
                inputPhoto.current.value = ""
            }

            callback()

        } catch (error) {
            console.log(error);
            toast.error("Post wasn't created");
            
        } finally {
            setIsLoading(false)
        }
    }

    return (
    <>
      <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm mb-3'>
        <div className='mb-3 flex items-center gap-3'>
            {profileData?.photo ? 
                <img src={profileData?.photo} alt="profile-pic" className='h-11 w-11 rounded-full object-cover'/>
                : <Skeleton className="flex rounded-full w-11 h-11" />
            }
            <div className='flex-1'>
                <p className='text-base font-extrabold text-slate-900'>{profileData?.name}</p>
                
                <div className='mt-1 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700'>
                    <BiWorld className='text-sm'/>
                    <select className='bg-transparent outline-none'>
                        <option value="public">Public</option>
                        <option value="following">Followers</option>
                        <option value="only_me">Only me</option>
                    </select>
                </div>
            </div>
        </div>

        <div className='relative'>
            <textarea 
                onChange={(e)=> SetPostContent(e.target.value)} value={postContent}
                rows="4" placeholder= {`What's on your mind, ${profileData ? profileData.name : "Name"}?`}
                className="w-full min-h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed
                     text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white">
            </textarea>

            {displayPhoto && <img src={displayPhoto} className='w-full max-h-125 object-cover rounded-2xl'/>}
        </div>

        <div className='mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3'>
            <div className='relative flex items-center gap-2'>
                <label className='flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100'>
                    <FaImage className='text-green-500 text-medium'/>
                    <span className='hidden sm:inline'>Photo/Video</span>
                    <Input onInput={()=> handleSelectedImage()} ref={inputPhoto} type="file" accept='image/*' className='hidden'/>
                </label>

                <button type='button' className='flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100'>
                    <FaRegSmile className='text-yellow-500 text-medium'/>
                    <span className='hidden sm:inline'>Feeling/Activity</span>
                </button>
            </div>

            <div className='flex items-center gap-3'>
                <Button 
                    disabled={!postContent && !displayPhoto} isLoading={isLoading} onClick={()=>handleFetchingPost()} 
                    className='flex items-center gap-2 rounded-lg bg-[#1877f2] px-4 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:opacity-60'>
                    Post
                    <IoIosSend className='text-large'/>
                </Button>
            </div>
        </div>
      </div>
    </>
  )
}
