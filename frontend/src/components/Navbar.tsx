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
  const {data: room} = getMyRoom()

  console.log(room)

  return (
    <div className='w-full bg-black h-[80px] flex'>
      <div className='flex items-center w-full h-full ml-5 gap-3'>
        <SquareAsterisk color='white' size={42} />
        <div>
          <div className='flex items-center gap-2'>

            {edit ? (
              <div className='flex items-center gap-2 border-2 border-gray-600 p-2 rounded-2xl'>
                <input type="text" className='w-full text-white outline-none' placeholder='Project Name....' />
                <button onClick={() => setEdit(false)} className='cursor-pointer'><XIcon color='white' /></button>
              </div>
            ) : (
              <p className='text-white text-2xl font-ubuntu font-bold'>{room?.roomName || "Untitled"}</p>
            )}

            {!edit && <button onClick={() => setEdit(!edit)} className='cursor-pointer'><PencilIcon color='white' size={22} /></button>}
          </div>
          <p className='text-white'>{user?.fullName || "Anonymous"}</p>
        </div>
      </div>

      <div className='p-4'>
        <p className='text-white font-syne font-semibold mr-5'>Room Id: {room?._id}</p>
      </div>

      <div className='flex items-center gap-5  hover:opacity-80 cursor-pointer'>
        <button className='bg-green-600 p-4 w-[100px] rounded-xl'><p className='text-white text-lg font-bold font-ubuntu flex items-center gap-2 cursor-pointer '><PlayIcon /> Run</p></button>
      </div>

      <div className='flex items-center gap-5 p-5 hover:opacity-80 cursor-pointer'>
        <button onClick={() => setOpenModal(true)} className='bg-gray-600 p-4 w-[100px] rounded-xl'><p className='text-white text-lg font-bold font-ubuntu flex items-center gap-2 cursor-pointer '><PlusIcon /> Add</p></button>
      </div>
    </div>
  )
}

export default Navbar