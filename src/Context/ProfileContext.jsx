import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios";
import { AuthContext } from './AuthContext';

const baseURL = import.meta.env.VITE_BASE_URL;

export const ProfileContext = createContext()

export default function ProfileContextProvider({children}) {

    const [profileData , setProfileData] = useState(null);
    const [profileLoading, setProfileLoading] = useState(true);

    // const token = localStorage.getItem("userToken");
    const {token} = useContext(AuthContext);
  
    async function getUserProfile() {
        
        let data = await axios.get(`${baseURL}/users/profile-data` , {
            headers:{
                // "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        console.log(data.data.data.user);
        setProfileData(data.data.data.user);
    }

    useEffect(()=>{

        if(token){
            getUserProfile();
            setProfileLoading(true);
        }else{
            setProfileLoading(false);
        }
    }, [token])
  
    return <ProfileContext.Provider value={{profileData}} >{children}</ProfileContext.Provider>
}