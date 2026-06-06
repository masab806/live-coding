import React from 'react'
import { useAuthStore } from '../store/auth.store'
import Unauthorized from '../components/Unauthorized'
import { Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {

    const {isAuthenticated, user} = useAuthStore()

    if(isAuthenticated && user){
        return <Outlet/>
    }

    return <Unauthorized/>
  
}

export default ProtectedRoutes