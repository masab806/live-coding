import api from "../api/api";
import type { LoginFormData, SignupFormData } from "../lib/types";

const authService = {
    login: async (data: LoginFormData) => {
        try {
            const res = await api.post("/api/auth/login", data)

            const responseData = res.data

            if (responseData) {
                return responseData
            }

        } catch (error) {
            console.log("Error On Login (Client): ", error)
            throw error
        }
    },

    signup: async (data: SignupFormData) => {
        try {
            const res = await api.post("/api/auth/register", data)

            const responseData = res.data

            return responseData


        } catch (error) {
            console.log("Error Occured On Register (Client): ", error)
            throw error
        }
    },

    getUsers: async (q: string)=> {
        try {
            const res = await api.post("/api/auth/getUsers", {fullName: q})

            const responseData = res.data

            return responseData?.users || []

        } catch (error) {
            console.log("Error In Getting Users (Client): ", error)
            throw error
        }
    },

    resetPassword: async ()=> {
        
    }
}

export default authService