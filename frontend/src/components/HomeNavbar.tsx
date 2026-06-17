import { Code } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const HomeNavbar = () => {
  return (
    <div className='bg-[#080A0E] h-[60px] sm:h-[80px] flex items-center justify-between absolute inset-0 pointer-events-none border-b-2 border-gray-800 px-3 sm:px-6'
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,229,160,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,160,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}>
      <Link to="/">
        <div className='flex items-center h-full gap-3 sm:gap-5 cursor-pointer pointer-events-auto'>
          <p className='bg-[#00E5A0] max-w-fit p-2 sm:p-3 rounded-xl sm:rounded-2xl'><Code size={18} className="sm:w-6 sm:h-6" /></p>
          <p className='text-white text-lg sm:text-2xl font-bold font-syne'>Code <span className='text-[#00E5A0]'>Jam</span></p>
        </div>
      </Link>

      <div className='flex items-center justify-end pointer-events-auto'>
        <span className='border-2 p-1.5 sm:p-2 flex items-center gap-2 border-gray-500 rounded-xl'>
          <p className='w-1 h-1 bg-[#00E5A0] shrink-0' />
          <p className='text-gray-500 text-xs sm:text-base whitespace-nowrap'>3 Active Sessions</p>
        </span>
      </div>
    </div>
  )
}

export default HomeNavbar