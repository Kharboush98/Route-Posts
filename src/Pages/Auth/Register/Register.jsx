import { Alert, Button, Input, Select, SelectItem } from '@heroui/react'
import React from 'react'
import { FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../../lib/ValidationSchemas/authSchema';
import { userRegister } from '../../../Services/authServices';
import { toast } from 'react-toastify';


export default function Register() {

    const [showPassword , setShowPassword] = useState(false);
    const [showRePassword , setShowRePassword] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, seterrorMessege] = useState("");
    const navigate = useNavigate();


    let {register ,  handleSubmit, formState:{errors , isSubmitting}} = useForm({
        mode:'onChange',
        resolver: zodResolver(registerSchema),

        defaultValues:{
            name:"",
            username:"",
            email:"",
            password:"",
            rePassword:"",
            dateOfBirth:"",
            gender:"", 
        }
    })

    async function submit(data){
        console.log(data);
        setSuccessMessage("");
        seterrorMessege("");

        try {
            let response = await userRegister(data);
            console.log(response)
            
            setSuccessMessage(response.data.message);
            toast.success(response.data.message);

            navigate("/login");

        } catch (error) {
            console.log(error);
            seterrorMessege(error.response?.data?.message || "Something went wrong");
            toast.error("Something went wrong");
        }
    }

  return (
    <>
      <div className="rounded-2xl bg-white p-4 sm:p-6">
        <div className='mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1'>
            <button type='button' className='rounded-lg py-2 text-sm font-extrabold transition text-slate-600 hover:text-slate-800 cursor-pointer'>
                <Link to="/login">login</Link>
            </button>
            <button type='button' className='rounded-lg py-2 text-sm font-extrabold transition bg-white text-routeBlue shadow-sm'>
                Register
            </button>
        </div>

        <h2 className='text-2xl font-extrabold text-routeBlue'>Create a new account</h2>
        <p className='mt-1 text-sm text-slate-600'>It is quick and easy.</p>

        <form className='mt-5 space-y-3.5' onSubmit={handleSubmit(submit)}>
            {successMessage && <Alert color="success" title={successMessage} />}
            {errorMessage && <Alert color="danger" title={errorMessage} />}

            <div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input 
                        {...register('name')} labelPlacement="outside" placeholder="Full Name"
                        isInvalid={errors.name} errorMessage={errors.name?.message}
                        startContent={<FaUser className="text-xl text-default-400 pointer-events-none shrink-0 mr-2.5" />}
                        type="text"
                    />
                </div>
            </div>
            
            <div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input 
                        {...register('username')} labelPlacement="outside" placeholder="Username"
                        isInvalid={errors.username} errorMessage={errors.username?.message}
                        startContent={<MdAlternateEmail  className="text-xl text-default-400 pointer-events-none shrink-0 mr-2.5" />}
                        type="text"
                    />
                </div>
            </div>
            
            <div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input 
                        {...register('email')} labelPlacement="outside" placeholder="Email address"
                        isInvalid={errors.email} errorMessage={errors.email?.message}
                        startContent={<MdAlternateEmail className="text-xl text-default-400 pointer-events-none shrink-0 mr-2.5" />}
                        type="email"
                    />
                </div>
            </div>
            
            <div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Select 
                        {...register('gender')} labelPlacement="outside" placeholder="Select gender" aria-label='gender'
                        isInvalid={errors.gender} errorMessage={errors.gender?.message}
                        startContent={<FiUsers className="text-xl text-default-400 pointer-events-none shrink-0 mr-2.5" />}>
                        
                        <SelectItem key="male">Male</SelectItem>
                        <SelectItem key="female" >Female</SelectItem>
                    </Select>
                </div>
            </div>

            <div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input 
                        {...register('dateOfBirth')} labelPlacement="outside" placeholder="Birth date"
                        isInvalid={errors.dateOfBirth} errorMessage={errors.dateOfBirth?.message}
                        startContent={<SlCalender className="text-xl text-default-400 pointer-events-none shrink-0 mr-2.5" />}
                        type="date"
                    />
                </div>
            </div>

            <div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input 
                        {...register('password')} labelPlacement="outside" placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        isInvalid={errors.password} errorMessage={errors.password?.message}
                        startContent={<FaKey className="text-xl text-default-400 pointer-events-none shrink-0 mr-2.5" />}
                        
                        endContent = {showPassword? 
                        <FaEye className="text-xl text-default-600 cursor-pointer" onClick={()=> setShowPassword(!showPassword)} /> 
                        : <FaEyeSlash className="text-xl text-default-600 cursor-pointer" onClick={()=> setShowPassword(!showPassword)}/>} />
                </div>
            </div>

            <div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input 
                        {...register('rePassword')} labelPlacement="outside" placeholder="Confirm Password"
                        type={showRePassword ? "text" : "password"}
                        isInvalid={errors.rePassword} errorMessage={errors.rePassword?.message}
                        startContent={<FaKey className="text-xl text-default-400 pointer-events-none shrink-0 mr-2.5" />}
                        
                        endContent = {showRePassword? 
                        <FaEye className="text-xl text-default-600 cursor-pointer" onClick={()=> setShowRePassword(!showRePassword)} /> 
                        : <FaEyeSlash className="text-xl text-default-600 cursor-pointer" onClick={()=> setShowRePassword(!showRePassword)}/>} />
                </div>
            </div>

            <Button isLoading={isSubmitting} type='submit' className='w-full rounded-xl py-3 text-base font-extrabold text-white 
                transition disabled:opacity-60 bg-routeBlue hover:bg-[#001f6b] cursor-pointer'> Create a new Account
            </Button>
        </form>
      </div>
    </>
  )
}
