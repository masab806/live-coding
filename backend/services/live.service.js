import liveRooms from "../models/liveRoom.js"
import mongoose from "mongoose";

export async function CreateRoom(userId, language) {
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
        const allRooms = await liveRooms.find()

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
        const existingLiveRoom = await liveRooms.findOne({
            _id: RoomId
        })

        if (!existingLiveRoom) {
            return {
                success: false,
                message: "Room Doesnt Exist!"
            }
        }

        const updateRoom = await liveRooms.updateOne(
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
            }
        );

        await existingLiveRoom.save()

        return {
            success: true,
            message: "Room Updated",
            room: updateRoom
        }

    } catch (error) {
        console.log("An Error Occured While Adding User: ", error)
    }
}