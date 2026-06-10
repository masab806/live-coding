import { Server } from "socket.io";
import { AddUser, CreateRoom, ShowRooms } from "./live.service.js";

export function initServer(server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    console.log("Socket IO Initialized")

    io.on("connection", (socket) => {
        console.log(`Socket is Connected ${socket.id}`)

        socket.on("message", (data) => {
            console.log("Data Recieved!", data)

            io.emit("message", data)
        })

        socket.on("createRoom", async (data)=> {
            try {

                console.log("Started!!!")

                const result = await CreateRoom(123, data?._id, data?.lanugage)

                if(!result){
                    return socket.emit("roomError", {
                        message: "Missing Required Fields!"
                    })
                }

                console.log(data)

                console.log(result)

                socket.join(result?.room?._id.toString())

            } catch (error) {
                console.log(error)
            }
        })

        socket.on("showRooms", async (data)=> {
            try {
                const result = await ShowRooms()

                io.emit("showRooms", result)
            } catch (error) {
                console.log(error)
            }
        })

        socket.on("addUser", async (data)=> {
            try {
                const result = await AddUser("123", data?.userId, "456")

                console.log(result)
            } catch (error) {
                console.log(error)
            }
        })
    })
    
}