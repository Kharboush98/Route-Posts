import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router';

export default function AppProtectedRoute({children}) {
  const navigate = useNavigate();

  // let token = localStorage.getItem("userToken");
  const {token} = useContext(AuthContext);

  useEffect(()=>{
        if(!token){
            navigate("/login");
        }
    }, [token])


  return children
}
