import React, { useEffect, useState } from 'react'
import { Editor } from '@monaco-editor/react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { FileOutputIcon, PlusIcon, SearchIcon, XIcon } from 'lucide-react'
import { getAllUsers } from '../lib/hooks/UserHook'
import { useDebounce } from "use-debounce"
import { addUser, createRoom, initSocket, sendMessage, ShowMessage, showRooms } from '../services/socket.service'
import { useAuthStore } from '../store/auth.store'

type User = {
    _id: string
    fullName: string
}

const CodeEditor = () => {

    const [openSidebar, setSidebar] = useState<boolean>(true)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [input, setInput] = useState<string>("")

    const [debouncedSearch] = useDebounce(input, 500)

    const { data, isLoading, isError } = getAllUsers(debouncedSearch)
    const {user} = useAuthStore()

    const allUsers = data || []

    useEffect(() => {
        const socket = initSocket()


        const handleRooms = (rooms)=> {
            console.log(rooms)
        }

        showRooms(handleRooms)

        createRoom({
            _id: user?._id,
            language: "javascript"
        })

        addUser({
            roomId: "123",
            participantId: "456",
            userId: user?._id
        })


        console.log("Socket Connected!")

        return ()=> {
            socket.disconnect()
        }
    })

    return (
        <div className={`w-full h-full overflow-hidden transition-all duration-300`}>
            <Navbar setOpenModal={setOpenModal} />
            <div className='flex w-full overflow-hidden'>
                <Sidebar openSidebar={openSidebar} setSidebar={setSidebar} />
                <div className='flex-1 min-w-0'>
                    <Editor
                        height="50vh"
                        width="100%"
                        theme='vs-dark'
                        defaultLanguage='javascript'
                        defaultValue='Hello'
                    />

                    {/* Terminal */}
                    <div className='w-full bg-[#080A0E] min-h-[50vh] border-l-2 border-gray-800 overflow-auto'>
                        <div className='border-b-2 border-gray-800'>
                            <ul className='flex items-center p-4'>
                                <li className='text-white text-lg flex items-center font-syne gap-2'><FileOutputIcon /> Output</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {openModal && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-all duration-300
  ${openModal ? "opacity-100 visible" : "opacity-0 invisible"}`}
                >
                    <div
                        className={`w-[800px] h-[800px] rounded-2xl bg-gray-900 transition-all duration-300 transform
    ${openModal ? "scale-100" : "scale-95"}`}
                    >
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col p-10'>
                                <p className='text-white font-syne text-5xl'>Invite Friends!</p>
                                <p className='text-lg text-gray-500 font-ubuntu font-semibold'>
                                    Collaborate Together
                                </p>
                            </div>

                            <button
                                className='mr-5 cursor-pointer'
                                onClick={() => setOpenModal(false)}
                            >
                                <XIcon size={32} color='white' />
                            </button>
                        </div>
                        <div className='px-10'>
                            <div className='flex items-center justify-start bg-gray-400 rounded-2xl w-full p-3'>
                                <input value={input} onChange={(e) => setInput(e.target.value)} type="text" className='w-full outline-none text-lg font-syne' />
                                <SearchIcon />
                            </div>
                        </div>
                        <div className='px-10 py-5 grid gap-5'>
                            {allUsers.map((data: User) => (
                                <ul key={data?._id} className='flex items-center justify-between p-2'>
                                    <li className='text-white font-syne text-2xl'>{data?.fullName}</li>
                                    <li><button className='flex cursor-pointer'><PlusIcon size={32} color='white' /></button></li>
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default CodeEditor