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
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ProfileContext } from "../../Context/ProfileContext";
import { FaImage, FaRegSmile } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateComment } from "../../Services/CommentServices";

export default function CommentModal({ isOpen, onOpenChange, postId, c_id , body , image , fetchAllComments }) {

    const {profileData} = useContext(ProfileContext)
    
    const [sendPhoto , SetSendPhoto] = useState(image)
    const [postContent , SetPostContent] = useState(body)
    const [displayPhoto , SetDisplayPhoto] = useState("")

    const [isLoading , setIsLoading] = useState();

    const inputPhoto = useRef();

    useEffect(() => {
        SetPostContent(body);
        SetSendPhoto(image);
        SetDisplayPhoto("");
        }, [body, image]);

    function handleSelectedImage()
    {
        console.log(inputPhoto.current.files[0]);
        //format for photo to send to the end point
        SetSendPhoto(inputPhoto.current.files[0])

        //format to display the photo
        SetDisplayPhoto(URL.createObjectURL(inputPhoto.current.files[0]))
    }

    async function handleUpdatingComment(id , commentId) {
        try {
            setIsLoading(true)
            const formData = new FormData()
            formData.append("content", postContent)
            if (sendPhoto) {
                formData.append("image", sendPhoto)
            }
            
            const response = await updateComment(id , commentId , formData);
            toast.success(response.data.message)

            SetSendPhoto("")
            SetPostContent("")
            SetDisplayPhoto("")
            if (inputPhoto.current) {
                inputPhoto.current.value = ""
            }

            fetchAllComments(postId);

        } catch (error) {
            console.log(error);
            toast.error("Post wasn't created");
            
        } finally {
            setIsLoading(false)
        }
    }
    

  return (
    <>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Comment
              </ModalHeader>
              <ModalBody>
                  <div className="relative">
                    <textarea
                      onChange={(e) => SetPostContent(e.target.value)}
                      value={postContent}
                      rows="4"
                      placeholder={body? body : `What's on your mind, ${profileData ? profileData.name : "Name"}?`}
                      className="w-full min-h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed
                     text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
                    ></textarea>

                    {image && <img src={displayPhoto? displayPhoto : image} className='w-full max-h-125 object-cover rounded-2xl'/>}

                  </div>
              </ModalBody>

              <ModalFooter>

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
                        <Button color="danger" variant="flat" onPress={onClose}>
                            Cancel
                        </Button>

                        <Button color="primary" onPress={()=>{onClose(); handleUpdatingComment(postId , c_id);}} disabled={!body && !image} isLoading={isLoading}>
                            Edit
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
