import React, { useContext, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Skeleton,
} from "@heroui/react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ProfileContext } from '../../Context/ProfileContext';
import { FaRegSmile } from 'react-icons/fa';
import { FaImage } from 'react-icons/fa6';
import { sharePost } from '../../Services/postServices';

export default function ShareModal({ isOpen, id, onOpenChange , body , image, user }) {
    const {profileData} = useContext(ProfileContext)

    const [postContent , SetPostContent] = useState("")
    const queryClient = useQueryClient()

    // console.log("user in ShareModal:", user);

    const {mutate: handleFetchingPost , isPending : isLoading} = useMutation({
        mutationFn:(postId)=>{return sharePost(postId , {body : postContent})},
        onSuccess:(response)=>{
            SetPostContent("")
            toast.success("Post was shared!");
            queryClient.invalidateQueries({ queryKey: ["getPosts"] });
            queryClient.invalidateQueries({ queryKey: ["getCommunityPosts"] });
            queryClient.invalidateQueries({ queryKey: ["getMyPosts"] });        
        },
        onError:(error)=>{
            console.log(error);
            SetPostContent("")
            toast.error("Post wasn't created");
        },
    })


    return (
        <>
        <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">
                    Share Post
                </ModalHeader>
                <ModalBody>
                    <div className="mb-3 flex items-center gap-3">
                        {profileData?.photo ? (
                        <img
                            src={profileData?.photo}
                            alt="profile-pic"
                            className="h-11 w-11 rounded-full object-cover"
                        />
                        ) : (
                        <Skeleton className="flex rounded-full w-11 h-11" />
                        )}
                        <div className="flex-1">
                        <p className="text-base font-extrabold text-slate-900">
                            {profileData?.name}
                        </p>

                        <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                            {/* <BiWorld className="text-sm" /> */}
                            <select className="bg-transparent outline-none">
                            <option value="public">Public</option>
                            <option value="following">Followers</option>
                            <option value="only_me">Only me</option>
                            </select>
                        </div>
                        </div>
                    </div>

                    <div className="relative">
                        <textarea
                        onChange={(e) => SetPostContent(e.target.value)}
                        value={postContent}
                        rows="4"
                        placeholder={`What's on your mind, ${profileData ? profileData.name : "Route user"}?`}
                        className="w-full min-h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed
                        text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
                        ></textarea>
                    </div>

                    <div className='mx-4 mb-3 rounded-2xl border border-slate-200 bg-slate-50 p-3'>
                        {/* shared post user */}
                        <div className='flex items-center gap-2 mb-2'>
                            <img src={user?.photo} alt={user?.name} className='h-8 w-8 rounded-full object-cover'/>
                            <div>
                            <p className='text-sm font-bold text-slate-900'>{user?.name}</p>
                            <p className='text-xs text-slate-500'>@{user?.username}</p>
                            </div>
                        </div>

                        {/* shared post body */}
                        {body && (
                            <p className='text-sm leading-relaxed text-slate-700 whitespace-pre-line'>{body}</p>
                        )}

                        {/* shared post image */}
                        {image && (
                            <img src={image} alt='shared-post' className='mt-2 w-full max-h-80 object-cover rounded-xl'/>
                        )}
                    </div>

                </ModalBody>

                <ModalFooter>

                    <div className='mt-3 w-full flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3'>
                        <div className='relative flex items-start'>
                            <button type='button' className='flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100'>
                                <FaRegSmile className='text-yellow-500 text-medium'/>
                                <span className='hidden sm:inline'>Feeling/Activity</span>
                            </button>
                        </div>
            
                        <div className='flex items-center gap-3'>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Cancel
                            </Button>

                            <Button color="primary" onPress={()=>{onClose(); handleFetchingPost(id);}} disabled={!postContent} isLoading={isLoading}>
                                Share Post
                            </Button>
                        </div>
                    </div>

                    
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
        </>
    )
}
