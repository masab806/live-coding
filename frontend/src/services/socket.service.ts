import {io, Socket} from "socket.io-client"

let socket: any | null = null

export const initSocket = ()=> {
    if(!socket){
        socket = io("http://localhost:3000")

        socket.on("connect", ()=> {
            console.log("Connected: ", socket?.id)
        })
    
        socket.on("disconnect", ()=>{
            console.log("Disconnected: ", socket?.id)
        })
    }


    return socket
}

export const sendMessage = (data)=> {
    socket?.emit("message", data)
}

export const ShowMessage = (callback)=> {
    socket?.on("message", callback)
}

export const createRoom = (data: { _id: string; language: string }) => {
    return new Promise((resolve, reject) => {
        (socket as any)?.emit("createRoom", data, (response: any) => {
            if (!response) {
                reject("No response from server");
                return;
            }

            response.success ? resolve(response) : reject(response);
        });
    });
};

export const addUser = (data: {roomId: string, userId: string, participantId: string })=> {
    return new Promise((resolve, reject)=> {
        (socket as any)?.emit("addUser", data, (response: any)=> {
            if(!response){
                reject("No Response From Server!")
                return
            }

            response.success ? resolve(response) : reject(response)
        })
    })
}

export const joinRoom = (data: { roomId: string }) => {
    return new Promise((resolve, reject) => {
        (socket as any)?.emit("joinRoom", data, (response: any) => {
            if (!response) {
                reject("No response from server")
                return
            }
            response.success ? resolve(response) : reject(response)
        })
    })
}

export const showRooms = (callback)=> {
    socket?.on("showRooms", callback)
}

export const getSocket = () => socket