import { Code } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const HomeNavbar = () => {
  return (
    <div className='bg-[#080A0E] h-[80px] flex items-center justify-between absolute inset-0 pointer-events-none border-b-2 border-gray-800' 
    style={{
    backgroundImage: `
      linear-gradient(rgba(0,229,160,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,229,160,0.04) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px'
  }}>
        <Link to="/"><div className='flex items-center h-full p-5 gap-5 cursor-pointer'>
            <p className='bg-[#00E5A0] max-w-fit p-3 rounded-2xl'><Code/></p>
            <p className='text-white text-2xl font-bold font-syne'>Code <span className='text-[#00E5A0]'>Jam</span></p>
        </div></Link>

        <div className='flex items-center justify-end'>
            <span className='border-2 p-2 flex items-center gap-2 border-gray-500 rounded-xl'>
                  <p className='w-1 h-1 bg-[#00E5A0]'/>
                  <p className='text-gray-500'>3 Active Sessions</p>
            </span>
        </div>
    </div>
  )
}

export default HomeNavbar