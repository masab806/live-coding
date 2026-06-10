import mongoose from "mongoose"

const liveRoomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        unique: true,
    },

    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        }
    ],

    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },

    language: {
        type: String,
    }

})

const liveRooms = mongoose.model('liveRooms', liveRoomSchema)

export default liveRooms