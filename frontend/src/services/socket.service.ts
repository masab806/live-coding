import {io, Socket} from "socket.io-client"
import type { ClientToServerEvents, ServerToClientEvents } from "../lib/types"

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null

export const initSocket = ()=> {
    if(!socket){
        socket = io("http://localhost:3000", {
        })
    }

    socket.on("connect", ()=> {
        console.log("Connected: ", socket?.id)
    })

    socket.off("disconnect", ()=>{
        console.log("Disconnected: ", socket?.id)
    })

    return socket
}

export const sendMessage = (data)=> {
    socket?.emit("message", data)
}

export const ShowMessage = (callback)=> {
    socket?.on("message", callback)
}

export const createRoom = (data: {_id: string, language: string})=> {
    socket?.emit("createRoom", data)
}

export const addUser = (data: {roomId: string, userId: string, participantId: string })=> {
    socket?.emit("addUser", data)
}

export const showRooms = (callback)=> {
    socket?.on("showRooms", callback)
}

export const getSocket = () => socket