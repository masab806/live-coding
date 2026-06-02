import React from 'react'
import HomeNavbar from '../components/HomeNavbar'
import { useState } from 'react'
import { BoltIcon, ZapIcon } from 'lucide-react'

const HomePage = () => {

    const [login, setLogin] = useState<Boolean>(null)

    return (
        <div >
            <div><HomeNavbar /></div>
            <div className='grid grid-cols-[4fr_2fr] w-full h-full'>

                {/* 1st Grid */}
                <div className='bg-[#080A0E] text-white w-full h-[100vh]'
                    style={{
                        backgroundImage: `
      linear-gradient(rgba(0,229,160,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,229,160,0.04) 1px, transparent 1px)
    `,
                        backgroundSize: '40px 40px'
                    }}>
                    
                    <div className='py-36 px-5  text-2xl h-full '>
                        <div className='bg-[#0B2B27] flex items-center w-fit justify-center gap-2 rounded-lg text-[#00E5A0] border-2 border-[#076C51] p-2'>
                            <span><ZapIcon size={22}/></span>
                             <p>real-time collaborative IDE</p>
                        </div>

                   <div className='flex flex-col justify-center h-[400px]'>

                        <div className='flex items-center h-[100px] w-[700px] '>
                            <p className='text-[#00E5A0] text-5xl font-syne font-bold '>Ship Faster.</p>
                        </div>

                        <div>
                            <p className='text-gray-600 font-bold font-syne'>Pair program across 8 runtimes. <br />No setup.
Share a link. <br />Start coding instantly.</p>
                        </div>
                   </div>
                        

                        <div>
                            
                        </div>
                    </div>
                </div>

                {/* 2nd Grid */}
                <div className='bg-[#161B22]'>
                    <div className='flex items-center w-full h-[600px]  justify-center'>
                    <div className='bg-[#1C2128] w-[500px] h-[100px] border-2 border-[#2C3137] rounded-2xl flex items-center justify-around'>
                        <button className='font-syne text-2xl hover:bg-white w-full h-full hover:rounded-2xl transition-all cursor-pointer'>Log In</button>
                        <button className='font-syne text-2xl w-full h-full hover:bg-white hover:rounded-2xl transition-all cursor-pointer'>Create Account</button>
                    </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage