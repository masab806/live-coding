import liveRooms from "../models/liveRoom.js"
import mongoose from "mongoose";

export async function CreateRoom(roomId, userId, language) {
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
            roomId: roomId,
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
    console.log("userId:", userId, "participantId:", participantId, "RoomId:", RoomId);

    try {
        const existingLiveRoom = await liveRooms.findOne({
            roomId: RoomId
        })

        const fakeParticipantId = new mongoose.Types.ObjectId().toString();


        if (!existingLiveRoom) {
            return {
                success: false,
                message: "Room Doesnt Exist!"
            }
        }

        await liveRooms.updateOne(
            { roomId: RoomId },
            {
                $addToSet: {
                    participants: {
                        $each: [
                            new mongoose.Types.ObjectId(userId),
                            new mongoose.Types.ObjectId(fakeParticipantId)
                        ]
                    }
                }
            }
        );

        await existingLiveRoom.save()

        return {
            success: true,
            message: "Room Updated"
        }

    } catch (error) {
        console.log("An Error Occured While Adding User: ", error)
    }
}