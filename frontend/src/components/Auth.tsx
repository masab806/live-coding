import { LockIcon } from 'lucide-react'
import React, { useState } from 'react'

const Auth = () => {
    const [Auth, setAuth] = useState<"Login" | "Signup">()
    return (
        <div className='w-full h-[100vh]'>
            <div className='bg-[#161B22] w-full h-full text-white'>
                <div className='flex flex-col py-40 w-full h-full '>

                    <div className='flex flex-col items-center'>
                        <div className='bg-[#1C2128] w-[500px] h-[100px] border-2 border-[#2C3137] rounded-2xl flex items-center justify-around overflow-hidden'>
                            <button onClick={() => setAuth("Login")} className='font-syne text-2xl hover:bg-white hover:text-black w-full h-full transition-all cursor-pointer'>Log In</button>
                            <button onClick={() => setAuth("Signup")} className='font-syne text-2xl w-full h-full hover:bg-white hover:text-black transition-all cursor-pointer'>Create Account</button>
                        </div>

                    </div>

                    {Auth === "Login" ? (
                        <>
                            <div className='mt-10 flex flex-col gap-10'>
                                <div className='flex flex-col gap-2 items-start ml-20'>
                                    <p className='text-xl font-syne text-gray-400'>@ email or username</p>
                                    <input className='p-3 bg-gray-800 w-[500px] rounded-lg' placeholder='you@example.com' />
                                </div>
                                <div className='flex flex-col gap-2 items-start ml-20'>
                                    <p className='text-xl font-syne text-gray-400 flex gap-2'><LockIcon size={22} /> Password</p>
                                    <input className='p-3 bg-gray-800 w-[500px] rounded-lg' placeholder='• • • • • •' />
                                    <p className='flex items-center justify-end w-[500px] text-green-500 font-syne'>Forgot Password?</p>
                                </div>

                                <div className='flex items-center justify-center'><button className='p-2 bg-green-500 w-[300px] rounded-lg font-syne text-lg'>Log In</button></div>

                                <div className='flex justify-center items-center gap-2'>
                                    <div className='h-0.5 bg-gray-600 w-[100px]' />
                                    <p className='font-syne text-gray-600'>Or Continue With</p>
                                    <div className='h-0.5 bg-gray-600 w-[100px]' />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='mt-10 flex flex-col gap-5'>
                                <div className='flex flex-col gap-2 items-start ml-20'>
                                    <p className='text-xl font-syne text-gray-400'>Full Name</p>
                                    <input className='p-3 bg-gray-800 w-[500px] rounded-lg' placeholder='Full Name' />
                                </div>
                                <div className='flex flex-col gap-2 items-start ml-20'>
                                    <p className='text-xl font-syne text-gray-400'>@ email or username</p>
                                    <input className='p-3 bg-gray-800 w-[500px] rounded-lg' placeholder='you@example.com' />
                                </div>
                                <div className='flex flex-col gap-2 items-start ml-20'>
                                    <p className='text-xl font-syne text-gray-400 flex gap-2'><LockIcon size={22} /> Password</p>
                                    <input className='p-3 bg-gray-800 w-[500px] rounded-lg' placeholder='• • • • • •' />
                                </div>
                                <div className='flex flex-col gap-2 items-start ml-20'>
                                    <p className='text-xl font-syne text-gray-400 flex gap-2'><LockIcon size={22} />Confirm Password</p>
                                    <input className='p-3 bg-gray-800 w-[500px] rounded-lg' placeholder='• • • • • •' />
                                </div>

                                <div className='flex items-center justify-center'><button className='p-2 bg-green-500 w-[300px] rounded-lg font-syne text-lg'>Sign Up</button></div>

                                <div className='flex justify-center items-center gap-2'>
                                    <div className='h-0.5 bg-gray-600 w-[100px]' />
                                    <p className='font-syne text-gray-600'>Or Continue With</p>
                                    <div className='h-0.5 bg-gray-600 w-[100px]' />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Auth