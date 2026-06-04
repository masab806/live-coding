import { LockIcon } from 'lucide-react'
import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

const Auth = () => {
    const [Auth, setAuth] = useState<"Login" | "Signup">()

    return (
        <div className='w-full h-full overflow-auto'>
            <div className='bg-[#161B22] w-full h-fit text-white'>
                <div className='flex flex-col py-40 w-full h-full '>

                    <div className='flex flex-col items-center'>
                        <div className='bg-[#1C2128] w-[500px] h-[100px] border-2 border-[#2C3137] rounded-2xl flex items-center justify-around overflow-hidden'>
                            <button onClick={() => setAuth("Login")} className='font-syne text-2xl hover:bg-white hover:text-black w-full h-full transition-all cursor-pointer'>Log In</button>
                            <button onClick={() => setAuth("Signup")} className='font-syne text-2xl w-full h-full hover:bg-white hover:text-black transition-all cursor-pointer'>Create Account</button>
                        </div>

                    </div>

                    {Auth === "Login" ? <Login/> : <Signup/>}
                  
                </div>
            </div>
        </div>
    )
}

export default Auth