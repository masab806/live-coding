import { AddUser, CreateRoom } from "../services/live.service.js"

export async function CreateLiveRoom(req,res) {
    try {
        // Use AuthMiddlware but later
        const {userId} = req.params
        const language = req.body

        const result = await CreateRoom(userId, language)

        if(!result?.success){
            return res.status(400).json(result)
        }

        return res.status(200).json(result)

    } catch (error) {
        console.log("Error While Creating Live Room: ", error)        
    }
}

export async function AddUserToRoom(req,res) {
    try {
        const {roomId} = req.query
        const {userId, participantId} = req.params

        const result = await AddUser(roomId, userId, participantId)

        if(!result.success){
            return res.status(400).json(result)
        }

        return res.status(200).json(result)

    } catch (error) {
        console.log("Error While Adding User To Room: ", error)
    }
}