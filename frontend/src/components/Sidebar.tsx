import { AlignJustify } from 'lucide-react'
import React, { type Dispatch, type SetStateAction } from 'react'

interface SidebarProps{
    openSidebar: boolean,
    setSidebar: Dispatch<SetStateAction<boolean>>
}

const Sidebar = ({openSidebar, setSidebar}: SidebarProps) => {
  return (
    <div className={`h-screen transition-all duration-300 overflow-hidden ${openSidebar ? "w-64" : "w-16"} bg-[#080A0E]`}>
      <div className='p-5 flex items-center gap-5'>
        <button onClick={()=> setSidebar(prev => !prev)} className='cursor-pointer'><AlignJustify color='white'/></button>
        {openSidebar && <p className='text-white font-syne text-lg'>Main Menu</p>}
      </div>
    </div>
  )
}

export default Sidebar