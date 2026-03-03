import { Button, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaKey } from 'react-icons/fa'
import { UpdatePasswordSchema } from '../../lib/ValidationSchemas/authSchema';
import { useForm } from 'react-hook-form';
import { updatePost } from '../../Services/postServices';
import { changePassword } from '../../Services/authServices';
import { toast } from 'react-toastify';

export default function SettingsPage() {

    const [showOldPassword , setShowOldPassword] = useState(false);
    const [showNewPassword , setShowNewPassword] = useState(false);
    const [showRePassword , setShowRePassword] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, seterrorMessege] = useState("");


    let {register , handleSubmit , formState:{errors , isSubmitting} } = useForm({
        mode:'onChange',
        resolver: zodResolver(UpdatePasswordSchema),

        defaultValues:{
            password:"",
            newPassword:"",
            rePassword:"",
        }
    });

    async function submit(data)
    {
        console.log(data);
        setSuccessMessage("");
        seterrorMessege("");

        try {

            const { rePassword, ...body} = data;
            
            let response = await changePassword(body)
            console.log(data);
            
            setSuccessMessage(response.data.message)
            toast.success(response.data.message);

        } catch (error) {
            console.log(error);
            seterrorMessege(error.response?.data?.message || "Something went wrong");
            toast.error("Something went wrong");
        }
    }

  return (
    <>
     <div className='bg-[#F0F2F5] min-h-screen'>
        <div className="container px-3 py-4">
            <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6'>
                <div>
                    <h1 class="text-xl font-extrabold text-slate-900 sm:text-2xl">Change Password</h1>
                    <p class="text-sm text-slate-500">Keep your account secure by using a strong password.</p>
                </div>

                <form className='space-y-3.5 mt-5' onSubmit={handleSubmit(submit)}>
                <div>
                    <div className="flex w-full flex-col flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2">
                        <div>Old password</div>
                        <Input 
                            {...register('password')}
                            labelPlacement="outside" placeholder="Password"
                            type={showOldPassword ? "text" : "password"}
                            isInvalid={errors.password} errorMessage={errors.password?.message}
                            startContent={<FaKey className="text-xl text-default-400 pointer-events-none shrink-0 mr-2.5" />}
                            
                            endContent = {showOldPassword? 
                            <FaEye className="text-xl text-default-600 cursor-pointer" onClick={()=> setShowOldPassword(!showOldPassword)} /> 
                            : <FaEyeSlash className="text-xl text-default-600 cursor-pointer" onClick={()=> setShowOldPassword(!showOldPassword)}/>} 
                        />
                    </div>
                </div>

                <div>
                    <div className="flex w-full flex-col flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2">
                        <div>New Password</div>
                        <Input 
                            {...register('newPassword')}
                            labelPlacement="outside" placeholder="Confirm Password"
                            type={showNewPassword ? "text" : "password"}
                            isInvalid={errors.newPassword} errorMessage={errors.newPassword?.message}
                            startContent={<FaKey className="text-xl text-default-400 pointer-events-none shrink-0 mr-2.5" />}
                            
                            endContent = {showNewPassword? 
                            <FaEye className="text-xl text-default-600 cursor-pointer" onClick={()=> setShowNewPassword(!showNewPassword)} /> 
                            : <FaEyeSlash className="text-xl text-default-600 cursor-pointer" onClick={()=> setShowNewPassword(!showNewPassword)}/>} 
                        />
                    </div>
                </div>
                
                <div>
                    <div className="flex w-full flex-col flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2">
                        <div>Confirm New Password</div>
                        <Input 
                            {...register('rePassword')}
                            labelPlacement="outside" placeholder="Confirm Password"
                            type={showRePassword ? "text" : "password"}
                            isInvalid={errors.rePassword} errorMessage={errors.rePassword?.message}
                            startContent={<FaKey className="text-xl text-default-400 pointer-events-none shrink-0 mr-2.5" />}
                            
                            endContent = {showRePassword? 
                            <FaEye className="text-xl text-default-600 cursor-pointer" onClick={()=> setShowRePassword(!showRePassword)} /> 
                            : <FaEyeSlash className="text-xl text-default-600 cursor-pointer" onClick={()=> setShowRePassword(!showRePassword)}/>} 
                        />
                    </div>
                </div>

                <Button isLoading={isSubmitting} type='submit' className='w-full rounded-xl py-3 text-base font-extrabold text-white 
                    transition disabled:opacity-60 bg-routeBlue hover:bg-[#001f6b] cursor-pointer mt-5'> Upadte your Password
                </Button>
            </form>

            </div>
        </div>
    </div> 
    </>
  )
}
