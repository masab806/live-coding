import React from 'react'
import { PencilIcon, SquareAsterisk } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='w-full bg-black h-[80px] flex'>
      <div className='flex items-center w-full h-full ml-5 gap-3'>
        <SquareAsterisk color='white' size={42} />
        <div>
          <div className='flex items-center gap-2'>
            <p className='text-white text-2xl font-ubuntu font-bold'>Untitled</p>
            <button onClick={() => console.log("Edit Clicked!!")} className='cursor-pointer'><PencilIcon color='white' size={22} /></button>
          </div>
          <p className='text-white'>Anonymous</p>
        </div>
      </div>

      <div className='flex items-center gap-5 p-5'>
        <button className='bg-green-600 p-4 w-[100px] rounded-xl'><p className='text-white text-lg font-bold font-ubuntu'>Sign Up</p></button>
        <button className='bg-gray-500 p-4 w-[100px] rounded-xl'><p className='text-white font-ubuntu text-xl font-bold'>Log In</p></button>
      </div>
    </div>
  )
}

export default Navbar