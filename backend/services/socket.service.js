import { Server } from "socket.io";
import { AddParticipant, AddUser, CreateRoom, SaveCode, ShowRooms } from "./live.service.js";

export function initServer(server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    const roomStates = {}

    // console.log("Socket IO Initialized")

    io.on("connection", (socket) => {
        console.log(`Socket is Connected ${socket.id}`)

        let SocketRoomId;


        socket.on("message", (data) => {
            console.log("Data Recieved!", data)

            io.emit("message", data)
        })

        socket.on("createRoom", async (data, callback) => {
            try {

                // console.log("Started!!!")

                const result = await CreateRoom(data?.roomName, data?._id, data?.language)

                if (!result) {
                    return socket.emit("roomError", {
                        message: "Missing Required Fields!"
                    })
                }

                SocketRoomId = result?.room?._id.toString()

                socket.join(SocketRoomId)

                roomStates[SocketRoomId] = {
                    code: "hello",
                    language: data?.language || "javascript"
                }

                return callback?.({
                    success: true,
                    room: result?.room,
                })

            } catch (error) {
                console.log(error)
            }
        })

        socket.on("codeChange", async (data) => {
            try {
                const { roomId, code } = data

                if (roomStates[roomId]) {
                    roomStates[roomId].code = code
                    SaveCode(roomId, code)
                } else {
                    roomStates[roomId] = { code, language: "javascript" }
                }

                socket.to(roomId).emit("codeUpdate", { code })

            } catch (error) {

            }
        })

        socket.on("joinRoom", async (data, callback) => {
            const { roomId, userId } = data

            socket.join(roomId)
            console.log(`Socket ${socket.id} joined room ${roomId}`)

            // const result = await AddParticipant(roomId, userId)

            // if(result) {
            //     console.log("Participant added")
            // }

            const room = io.sockets.adapter.rooms.get(roomId)
            // console.log(`Room ${roomId} has ${room?.size} sockets:`, [...(room || [])])

            // console.log(roomStates[roomId]?.code)


            return callback?.({
                success: true,
                code: roomStates[roomId]?.code || "",
                language: roomStates[roomId]?.language || "javascript"
            })
        })

        socket.on("logoutRoom", (roomId)=>{
            try {
                socket.leave(roomId)

            } catch (error) {
                console.log("Error Occured: ", error)
            }
        })

        socket.on("addUser", async (data, callback) => {
            try {

                const { roomId, userId, participantId } = data

                const result = await AddUser(roomId, userId, participantId)

                // console.log(result)

                const state = roomStates[roomId]

                // console.log("addUser - room state:", state)


                return callback?.({
                    success: true,
                    result: result?.room,
                    code: state?.code || "1234",
                    language: state?.language || "javascript"
                })

            } catch (error) {
                console.log(error)
            }
        })
    })

}