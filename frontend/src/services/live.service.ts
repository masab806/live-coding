import api from "../api/api";
import type { RoomData } from "../lib/types";

const liveService = {
    fetchRoomId: async (userId: string) => {

        console.log(userId)

        try {
            const res = await api.get(`/api/live/room/${userId}`)

            const responseData = res.data

            return responseData

        } catch (error) {
            console.log("Error While Fetching Room Id (Client): ", error)
            throw error
        }
    }
}

export default liveService