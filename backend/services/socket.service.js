import { Server } from "socket.io";
import { AddParticipant, AddUser, CreateRoom, SaveCode, ShowRooms } from "./live.service.js";
import liveRooms from "../models/liveRoom.js";
import userModel from "../models/user.js";

export function initServer(server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    const roomStates = {}


    io.on("connection", (socket) => {
        console.log(`Socket is Connected ${socket.id}`)

        let SocketRoomId;


        socket.on("createRoom", async (data, callback) => {
            try {


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
                console.log("Error On Code Change: ", error)
            }
        })

        socket.on("joinRoom", async (data, callback) => {
            const { roomId, userId } = data

            socket.join(roomId)
            console.log(`Socket ${socket.id} joined room ${roomId}`)

            const room = io.sockets.adapter.rooms.get(roomId)

            return callback?.({
                success: true,
                code: roomStates[roomId]?.code || "",
                language: roomStates[roomId]?.language || "javascript",
                typingUsers: new Set()
            })
        })

        socket.on("startTyping", async (roomId, userId) => {
            try {
                const state = roomStates[roomId]

                if (!state) return

                const user = await userModel.findOne({
                    _id: userId
                })

                if (!state.typingUsers) {
                    state.typingUsers = new Set()
                }

                state.typingUsers.add(user?.fullName)

                io.to(roomId).emit("typingUpdate", {
                    users: Array.from(state?.typingUsers)
                })



            } catch (error) {
                console.log("Error: ", error)
            }
        })

        socket.on("stopTyping", async (roomId, userId) => {
            try {
                const state = roomStates[roomId]

                if (!state?.typingUsers) return

                const user = await userModel.findOne({
                    _id: userId
                })

                state?.typingUsers.delete(user?.fullName)

                io.to(roomId).emit("typingUpdate", {
                    users: Array.from(state?.typingUsers)
                })

            } catch (error) {
                console.log("An Error Occured: ", error)
            }

        })

        socket.on("disconnect", () => {
            try {
                for (const roomId in roomStates) {
                    const state = roomStates[roomId]

                    if (state?.typingUsers.has(socket.id)) {
                        state?.typingUsers.delete(socket.id)
                    }

                    io.to(roomId).emit("typingUpdate", {
                        users: Array.from(state?.typingUsers)
                    })
                }
            } catch (error) {
                console.log("Error: ", error)
            }
        })


        socket.on("logoutRoom", (roomId) => {
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