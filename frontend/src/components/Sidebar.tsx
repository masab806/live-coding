import { AlignJustify, DoorClosed } from 'lucide-react'
import React, { type Dispatch, type SetStateAction, useEffect } from 'react'
import { disconnectRoom, initSocket } from '../services/socket.service'
import { useAuthStore } from '../store/auth.store'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

interface SidebarProps {
  openSidebar: boolean,
  setSidebar: Dispatch<SetStateAction<boolean>>,
  roomId: string
}

const Sidebar = ({ openSidebar, setSidebar, roomId }: SidebarProps) => {

  useEffect(() => {
    initSocket()
  }, [])

  const {logout} = useAuthStore()

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const result = disconnectRoom(roomId)

      logout()

      navigate('/')

      toast.success("Logged Out!")

    } catch (error) {
        console.log("Error While Logging Out: ", error)
    }

  }

  return (
    <div className={`h-screen transition-all duration-300 overflow-hidden ${openSidebar ? "w-64" : "w-16"} bg-[#080A0E]`}>
      <div className='p-5 flex items-center gap-5'>
        <button onClick={() => setSidebar(prev => !prev)} className='cursor-pointer'><AlignJustify color='white' /></button>
        {openSidebar && <p className='text-white font-syne text-lg'>Main Menu</p>}
      </div>
      <div className=''>
        <button onClick={() => handleLogout()} className='flex items-end gap-2 p-5 max-h-full min-h-[700px] cursor-pointer'>
          <DoorClosed color='white' />
          {openSidebar && <div className='text-white'>Logout</div>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar