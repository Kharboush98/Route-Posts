import { Alert, Button, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react'
import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router';
import { LoginSchema } from '../../../lib/ValidationSchemas/authSchema';
import { userLogin } from '../../../Services/authServices';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Context/AuthContext';


export default function Login() {

  const [showPassword , setShowPassword] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, seterrorMessege] = useState("");
  
  const navigate = useNavigate();

  const {token , setToken} = useContext(AuthContext);

  let {register , handleSubmit , formState:{errors , isSubmitting} } = useForm({
    mode:'onChange',
    resolver: zodResolver(LoginSchema),

    defaultValues:{
      email:"",
      password:"",
    }
  });

  async function submit(data){
    console.log(data);
    setSuccessMessage("");
    seterrorMessege("");

    try {
      let response = await userLogin(data);
      console.log(response);

      localStorage.setItem("userToken", response.data.data.token);
      setToken(response.data.data.token);

      setSuccessMessage(response.data.message);
      toast.success(response.data.message);

      navigate("/");

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
            <button type='button' className='rounded-lg py-2 text-sm font-extrabold transition bg-white text-routeBlue shadow-sm'>
                login
            </button>
            <button type='button' className='rounded-lg py-2 text-sm font-extrabold transition text-slate-600 hover:text-slate-800 cursor-pointer'>
                <Link to="/register">Register</Link>
            </button>
        </div>

        <h2 className='text-2xl font-extrabold text-routeBlue'>Login to Route Posts</h2>
        <p className='mt-1 text-sm text-slate-600'>Log in and continue your social journey.</p>

        <form className='mt-5 space-y-3.5' onSubmit={handleSubmit(submit)}>
          {successMessage && <Alert color="success" title={successMessage} />}
          {errorMessage && <Alert color="danger" title={errorMessage} />}
            <div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input 
                      labelPlacement="outside" placeholder="email"
                      {...register("email")} isInvalid={errors.email} errorMessage={errors.email?.message}
                      startContent={<MdAlternateEmail  className="text-xl text-default-400 pointer-events-none shrink-0 mr-2.5" />}
                      type="email"
                    />
                </div>
            </div>
            
            <div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input 
                      labelPlacement="outside" placeholder="Password" type={showPassword ? "text" : "password"}
                      {...register("password")} isInvalid={errors.password} errorMessage={errors.password?.message}
                      startContent={<FaKey className="text-xl text-default-400 pointer-events-none shrink-0 mr-2.5" />}
                      
                      endContent = {showPassword? 
                      <FaEye className="text-xl text-default-600 cursor-pointer" onClick={()=> setShowPassword(!showPassword)} /> 
                      : <FaEyeSlash className="text-xl text-default-600 cursor-pointer" onClick={()=> setShowPassword(!showPassword)}/>} />
                </div>
            </div>

            <Button isLoading={isSubmitting} type='submit' className='w-full rounded-xl py-3 text-base font-extrabold text-white 
                transition disabled:opacity-60 bg-routeBlue hover:bg-[#001f6b] cursor-pointer'> Login
            </Button>

            <button  className='mx-auto block text-sm text-routeBlue font-semibold transition hover:underline cursor-pointer'>
              <Link to="/register" >Forgot password?</Link>
            </button>


        </form>
      </div>
    </>
  )
}
