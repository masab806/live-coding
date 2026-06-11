import { Server } from "socket.io";
import { AddUser, CreateRoom, ShowRooms } from "./live.service.js";

export function initServer(server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    const roomStates = {}
    let SocketRoomId;

    console.log("Socket IO Initialized")

    io.on("connection", (socket) => {
        console.log(`Socket is Connected ${socket.id}`)

        socket.on("message", (data) => {
            console.log("Data Recieved!", data)

            io.emit("message", data)
        })

        socket.on("createRoom", async (data, callback) => {
            try {

                console.log("Started!!!")

                const result = await CreateRoom(data?._id, data?.language)

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

        socket.on("showRooms", async (data) => {
            try {
                const result = await ShowRooms()

                io.emit("showRooms", result)
            } catch (error) {
                console.log(error)
            }
        })

        socket.on("codeChange", async (data) => {
            try {
                const { roomId, code } = data

                if (roomStates[roomId]) {
                    roomStates[roomId].code = code
                }

                socket.to(roomId).emit("codeUpdate", { code })

            } catch (error) {

            }
        })

        socket.on("joinRoom", (data, callback) => {
            const { roomId } = data

            socket.join(roomId)
            console.log(`Socket ${socket.id} joined room ${roomId}`)

            return callback?.({
                success: true,
                code: roomStates[roomId]?.code || "",
                language: roomStates[roomId]?.language || "javascript"
            })
        })

        socket.on("addUser", async (data, callback) => {
            try {

                const { roomId, userId, participantId } = data

                const result = await AddUser(roomId, userId, participantId)

                socket.join(roomId)

                const state = roomStates[roomId]

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