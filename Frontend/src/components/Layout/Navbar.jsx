import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Navbar = () => {
  const [isAuthorized,setIsAuthorized,user,setUser]=useContext(Context)
  const [show,setShow]=useState(false);

  const navigateTo=useNavigate()
  const handleLogout=async()=>{
    try {
      const response=await axios.get("http://localhost:4000/api/v1/user/logout",{withCredentials:true})
      setIsAuthorized(false)
      toast.success(response.data.message)
      navigateTo('/login')
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthorized(true)
    }
  }
  return (
    <div>
      
    </div>
  )
}

export default Navbar
