import liveRooms from "../models/liveRoom.js"
import mongoose from "mongoose";

export async function CreateRoom(roomName, userId, language) {

    try {
        const existingLiveRoom = await liveRooms.findOne({
            host: userId
        })

        if (existingLiveRoom) {
            return {
                success: true,
                message: "Room already exists for this host!",
                room: existingLiveRoom
            };
        }

        const newLiveRoom = await liveRooms.create({
            roomName: roomName,
            host: userId,
            language: language
        })

        return {
            success: true,
            message: "New Room Created!",
            room: newLiveRoom
        };

    } catch (error) {
        console.log("Error While Creating Room: ", error)
    }
}

export async function ShowRooms() {
    try {
        const allRooms = await liveRooms.find().select('_id roomName').lean()

        return {
            success: true,
            allRooms
        }

    } catch (error) {
        console.log(error)
    }
}

export async function AddUser(RoomId, userId, participantId) {
    try {
        const updatedRoom = await liveRooms.findOneAndUpdate(
            { _id: RoomId },
            {
                $addToSet: {
                    participants: {
                        $each: [
                            new mongoose.Types.ObjectId(userId),
                            new mongoose.Types.ObjectId(participantId)
                        ]
                    }
                }
            },
            {
                returnDocument: "after"
            }
        );

        
        if (!updatedRoom) {
            return {
                success: false,
                message: "Room Doesn't Exist!"
            };
        }

        return {
            success: true,
            message: "Room Updated",
            room: updatedRoom
        };
    } catch (error) {
        console.log("An Error Occured While Adding User: ", error);
    }
}


export async function getRoomId(userId) {
    try {
        const room = await liveRooms.findOne({
            $or: [
                { host: userId },
                { participants: userId }
            ]
        });

        return {
            success: true,
            room
        }

    } catch (error) {
        console.log("Error While Getting Room Id: ", error)
    }
}

export async function SaveCode(roomId, code) {

    try {
        const room = await liveRooms.findOne({
            _id: roomId
        })

        if (!room) {
            return {
                success: false,
                message: "No Room Found!"
            }
        }

        room.code = code

        await room.save()

    } catch (error) {
        console.log("Error While Saving Code: ", error)
    }
}

export async function GetAllRooms() {
    try {
        const allRooms = await liveRooms.find().select('_id roomName').lean()

        return {
            success: true,
            allRooms
        }

    } catch (error) {
        console.log("Error: ", error)
    }
}

export async function AddParticipant(roomId, userId) {
    try {
        const updateRoom = await liveRooms.updateOne(
            { _id: roomId },
            {
                $addToSet: {
                    participants: new mongoose.Types.ObjectId(userId)
                }
            }
        );

        if (!updateRoom) {
            return {
                success: false,
                message: "Not Updated!"
            }
        }

        return {
            success: true
        }



    } catch (error) {
        console.log("Error To Add Participant: ", error)
    }
}

export async function DeleteRoom(roomId) {

    try {
        const room = await liveRooms.findOne({
            _id: roomId
        })

        if (!room) {
            return {
                success: true,
                message: "No Room Found!"
            }
        }

        await room.deleteOne()


    } catch (error) {
        console.log("Error While Deleting Room: ", error)
    }
}

export async function SaveRoomName(roomId, roomName) {
    try {
        if (!roomId || !roomName) {
            return {
                success: false,
                message: "Not Found!"
            }
        }

        const room = await liveRooms.findOne({
            _id: roomId
        })


        room.roomName = roomName

        await room.save()



    } catch (error) {
        console.log("Error While Saving Room: ", error)
    }
}