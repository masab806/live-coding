import React, { useState, type Dispatch, type SetStateAction } from 'react'
import { PencilIcon, PlayIcon, PlusIcon, SquareAsterisk, XIcon } from 'lucide-react'
import { useAuthStore } from '../store/auth.store'
import { getMyRoom } from '../lib/hooks/roomHook'

interface NavbarProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const Navbar = ({ setOpenModal }: NavbarProps) => {

  const { user } = useAuthStore()
  const [edit, setEdit] = useState<Boolean>(false)
  const { data: room } = getMyRoom()

  return (
    <div className='w-full bg-black min-h-[60px] sm:h-[80px] flex items-center'>
      <div className='flex items-center w-full h-full ml-3 sm:ml-5 gap-2 sm:gap-3 min-w-0'>
        <SquareAsterisk color='white' size={32} className='sm:w-[42px] sm:h-[42px] shrink-0' />
        <div className='min-w-0'>
          <div className='flex items-center gap-2'>
            {edit ? (
              <div className='flex items-center gap-2 border-2 border-gray-600 p-1.5 sm:p-2 rounded-2xl'>
                <input type="text" className='w-full text-white outline-none text-sm sm:text-base' placeholder='Project Name....' />
                <button onClick={() => setEdit(false)} className='cursor-pointer shrink-0'><XIcon color='white' size={18} /></button>
              </div>
            ) : (
              <p className='text-white text-base sm:text-2xl font-ubuntu font-bold truncate'>{room?.roomName || "Untitled"}</p>
            )}
            {!edit && <button onClick={() => setEdit(!edit)} className='cursor-pointer shrink-0'><PencilIcon color='white' size={18} className='sm:w-[22px] sm:h-[22px]' /></button>}
          </div>
          <p className='text-white text-xs sm:text-base truncate'>{user?.fullName || "Anonymous"}</p>
        </div>
      </div>

      <div className='hidden md:flex p-4 shrink-0'>
        <p className='text-white font-syne font-semibold mr-5 text-sm truncate max-w-[200px]'>Room Id: {room?._id}</p>
      </div>

      <div className='flex items-center gap-5 hover:opacity-80 cursor-pointer shrink-0'>
        <button className='bg-green-600 p-2 sm:p-4 w-[70px] sm:w-[100px] rounded-xl'>
          <p className='text-white text-sm sm:text-lg font-bold font-ubuntu flex items-center gap-1 sm:gap-2 cursor-pointer'><PlayIcon size={16} className='sm:w-5 sm:h-5' /> Run</p>
        </button>
      </div>

      <div className='flex items-center gap-5 p-3 sm:p-5 hover:opacity-80 cursor-pointer shrink-0'>
        <button onClick={() => setOpenModal(true)} className='bg-gray-600 p-2 sm:p-4 w-[70px] sm:w-[100px] rounded-xl'>
          <p className='text-white text-sm sm:text-lg font-bold font-ubuntu flex items-center gap-1 sm:gap-2 cursor-pointer'><PlusIcon size={16} className='sm:w-5 sm:h-5' /> Add</p>
        </button>
      </div>
    </div>
  )
}

export default Navbar