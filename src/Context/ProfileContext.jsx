import React, { createContext, useEffect, useState } from 'react'
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const ProfileContext = createContext()

export default function ProfileContextProvider({children}) {

    const [profileData , setProfileData] = useState(null);

    const token = localStorage.getItem("userToken");
  
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
        }
    }, [token])
  
    return <ProfileContext.Provider value={{profileData}} >{children}</ProfileContext.Provider>
}