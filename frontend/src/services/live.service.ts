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
        const token = useAuthStore.getState().token
        try {
            const res = await api.get("/api/live/allRooms", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const responseData = res.data?.allRooms

            return responseData

        } catch (error) {
            console.log("Error: ", error)            
        }
    },

    saveRoomName: async (data: {roomId: string, roomName: string})=> {
        const token = useAuthStore.getState().token
        try {
            const res = await api.post("/api/live/saveRoom", data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const responseData = res.data

            return responseData

        } catch (error) {
            console.log("An Error Occured: ", error)
        }
    },

    deleteRoom: async (data: {roomId: string})=> {
        const token = useAuthStore.getState().token
        try {
            const res = await api.delete("/api/live/deleteRoom", {
                data, 
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const responseData = res.data

            return responseData

        } catch (error) {
            console.log("An Error Occured: ", error)
        }

    }

}

export default liveService