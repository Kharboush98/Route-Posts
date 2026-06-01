import React, { createContext, useEffect } from 'react'
import { useState } from 'react'

export const AuthContext = createContext()

export default function AuthContextProvider({children}) {

//   const [token , setToken] = useState(null);

//   const userToken = localStorage.getItem("userToken");

//   useEffect(() => {
//       if(userToken){
//           setToken(userToken);
//       }
//   }, []);

    const [token, setToken] = useState(localStorage.getItem("userToken")); // ← initialize directly, no useEffect needed


  return <AuthContext.Provider value={{token , setToken}}>{children}</AuthContext.Provider>
}
