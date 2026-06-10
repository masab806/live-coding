import React from 'react'
import { Link } from 'react-router-dom'
import HomeNavbar from './HomeNavbar'
import { useAuthStore } from '../store/auth.store'

const Unauthorized = () => {

    const { logout } = useAuthStore()

    return (
        <div>
            <HomeNavbar />
            <div className='bg-[#080A0E] text-white w-full h-screen'
                style={{
                    backgroundImage: `
                            linear-gradient(rgba(0,229,160,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,229,160,0.04) 1px, transparent 1px)
                        `,
                    backgroundSize: '40px 40px'
                }}>
                <div className='flex items-center justify-center w-full h-full'>
                    <div className='flex flex-col gap-2 items-center justify-center'>
                        <p className='text-gray-500 text-9xl font-ubuntu'>403</p>
                        <p className='text-gray-500 text-5xl font-syne'>Forbidden! Unauthorized Access</p>
                        <Link onClick={() => logout()} to="/" className='p-2 mt-5 bg-[#00E5A0] rounded-lg hover:opacity-80 cursor-pointer font-syne text-gray-600 text-lg'>Return To Auth Page</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Unauthorized