import api from "../api/api";
import { useAuthStore } from "../store/auth.store";

const liveService = {
    fetchRoomId: async () => {

        const token = useAuthStore.getState().token

        try {
            const res = await api.get(`/api/live/room`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const responseData = res.data?.room

            return responseData

        } catch (error) {
            console.log("Error While Fetching Room Id (Client): ", error)
            throw error
        }
    },

    fetchAllRooms: async ()=> {
        try {
            const res = await api.get("/api/live/allRooms")

            const responseData = res.data?.allRooms

            return responseData

        } catch (error) {
            console.log("Error: ", error)            
        }
    }
}

export default liveService