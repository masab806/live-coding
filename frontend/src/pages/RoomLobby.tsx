import { MoveLeftIcon, Plus, LogIn, Sparkles, QrCode } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createRoom, initSocket, joinRoom } from '../services/socket.service'
import { useAuthStore } from '../store/auth.store'
import { fetchAllRooms, getMyRoom } from '../lib/hooks/roomHook'
import type { RoomData } from '../lib/types'

const RoomLobby = () => {
    const navigate = useNavigate()
    const { user } = useAuthStore()

    const [roomName, setRoomName] = useState('')
    const [language, setLanguage] = useState('javascript')
    const [maxParticipants, setMaxParticipants] = useState(5)

    const [joinRoomId, setJoinRoomId] = useState('')
    const [joinRoomName, setJoinRoomName] = useState('')

    const { data: allRooms } = fetchAllRooms()

    useEffect(() => {
        initSocket()
    }, [])



    const handleCreateRoom = async () => {
        try {
            const room = await createRoom({
                _id: user?._id,
                language,
            })
            const createdRoomId = room?.room?._id
            if (createdRoomId) {
                navigate('/editor', { state: { roomId: createdRoomId } })
            }
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }

    const handleJoinRoom = async () => {
        if (!joinRoomId) return

        console.log(allRooms)

        const room = allRooms?.find((r) => r._id === joinRoomId)

        console.log(room, joinRoomId)

         if (joinRoomId) {
                    const result = await joinRoom({ roomId: joinRoomId })

                    console.log("roomJoined: ", result)
                }

        navigate('/editor', {
            state: {
                roomId: joinRoomId,
                roomName: joinRoomName,
            },
        })
    }

    const initials = user?.fullName
        ? user.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
        : 'U'

    return (
        <div
            className="min-h-screen bg-[#080A0E] text-white w-full"
            style={{
                backgroundImage: `
                    linear-gradient(rgba(0,229,160,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,229,160,0.04) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
            }}
        >
            {/* Topbar */}
            <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                    <Link
                        to="/"
                        className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <MoveLeftIcon size={16} />
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Rooms</h1>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-gray-400">5 active sessions</span>
                </div>
            </div>

            {/* Cards */}
            <div className="flex items-start justify-center px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl">

                    {/* Create Room Card */}
                    <div className="rounded-2xl bg-[#111318] border border-white/10 overflow-hidden">
                        <div className="flex items-center gap-3 p-6 border-b border-white/[0.07]">
                            <div className="w-10 h-10 rounded-xl bg-[#00E5A0]/10 flex items-center justify-center text-[#00E5A0]">
                                <Plus size={18} />
                            </div>
                            <div>
                                <h2 className="text-base font-medium">Create room</h2>
                                <p className="text-xs text-gray-500 mt-0.5">Start a new collaborative session</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 p-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                                    Room name
                                </label>
                                <input
                                    type="text"
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                    placeholder="e.g. Backend sprint #3"
                                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-200 placeholder:text-gray-600 outline-none focus:border-white/25 focus:bg-white/[0.07] transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                                    Language
                                </label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-white/25 focus:bg-white/[0.07] transition-all appearance-none cursor-pointer"
                                >
                                    <option value="javascript">JavaScript</option>
                                    <option value="typescript">TypeScript</option>
                                    <option value="python">Python</option>
                                    <option value="rust">Rust</option>
                                    <option value="go">Go</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                                    Max participants
                                </label>
                                <div className="flex items-center justify-between bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5">
                                    <span className="text-sm text-gray-200">{maxParticipants}</span>
                                    <div className="flex gap-1.5">
                                        <button
                                            onClick={() => setMaxParticipants((p) => Math.max(2, p - 1))}
                                            className="w-6 h-6 rounded-md bg-white/[0.08] border border-white/10 text-white text-base flex items-center justify-center hover:bg-white/15 transition-colors"
                                        >
                                            −
                                        </button>
                                        <button
                                            onClick={() => setMaxParticipants((p) => Math.min(20, p + 1))}
                                            className="w-6 h-6 rounded-md bg-white/[0.08] border border-white/10 text-white text-base flex items-center justify-center hover:bg-white/15 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                                    Host
                                </label>
                                <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5">
                                    <div className="w-5 h-5 rounded-full bg-[#00E5A0]/20 flex items-center justify-center text-[9px] font-semibold text-[#00E5A0] flex-shrink-0">
                                        {initials}
                                    </div>
                                    <span className="text-sm text-gray-400">{user?.fullName || 'User'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 pb-6">
                            <button
                                onClick={handleCreateRoom}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#00E5A0] text-[#080A0E] text-sm font-medium hover:opacity-85 transition-opacity cursor-pointer"
                            >
                                <Sparkles size={15} />
                                Create room
                            </button>
                        </div>
                    </div>

                    {/* Join Room Card */}
                    <div className="rounded-2xl bg-[#111318] border border-white/10 overflow-hidden">
                        <div className="flex items-center gap-3 p-6 border-b border-white/[0.07]">
                            <div className="w-10 h-10 rounded-xl bg-[#8B9FFF]/10 flex items-center justify-center text-[#8B9FFF]">
                                <LogIn size={18} />
                            </div>
                            <div>
                                <h2 className="text-base font-medium">Join room</h2>
                                <p className="text-xs text-gray-500 mt-0.5">Enter an existing session</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 p-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                                    Room ID
                                </label>
                                <input
                                    type="text"
                                    value={joinRoomId}
                                    onChange={(e) => setJoinRoomId(e.target.value)}
                                    placeholder="e.g. rm_8f3kx92"
                                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-200 placeholder:text-gray-600 outline-none focus:border-white/25 focus:bg-white/[0.07] transition-all font-mono tracking-wide"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                                    Room name
                                </label>
                                <input
                                    type="text"
                                    value={joinRoomName}
                                    onChange={(e) => setJoinRoomName(e.target.value)}
                                    placeholder="Enter room name"
                                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-200 placeholder:text-gray-600 outline-none focus:border-white/25 focus:bg-white/[0.07] transition-all"
                                />
                            </div>

                            <div className="flex items-center gap-2 my-1">
                                <div className="flex-1 h-px bg-white/[0.07]" />
                                <span className="text-xs text-gray-600">or scan</span>
                                <div className="flex-1 h-px bg-white/[0.07]" />
                            </div>

                            <div className="flex flex-col items-center gap-2 p-5 rounded-xl border border-dashed border-white/10 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors">
                                <QrCode size={28} className="text-gray-600" />
                                <span className="text-xs text-gray-600">Scan QR code</span>
                            </div>
                        </div>

                        <div className="px-6 pb-6">
                            <button
                                onClick={handleJoinRoom}
                                disabled={!joinRoomId}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#8B9FFF]/15 text-[#8B9FFF] border border-[#8B9FFF]/30 text-sm font-medium hover:bg-[#8B9FFF]/22 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <LogIn size={15} />
                                Join room
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RoomLobby