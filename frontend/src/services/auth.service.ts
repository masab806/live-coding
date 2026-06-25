import api from "../api/api";
import type { LoginFormData, resetPasswordType, sendOtpType, SignupFormData } from "../lib/types";
import { useAuthStore } from "../store/auth.store";

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

    getUsers: async (q: string) => {

        const token = useAuthStore.getState().token

        try {
            const res = await api.post("/api/auth/getUsers", { fullName: q }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const responseData = res.data

            return responseData?.users || []

        } catch (error) {
            console.log("Error In Getting Users (Client): ", error)
            throw error
        }
    },

    sendOTP: async (data: sendOtpType) => {
        try {
            const res = await api.post("/api/auth/forgot", data)

            const responseData = res.data

            return responseData

        } catch (error: any) {
            console.log("Error In Sending OTP: ", error)
            return error.response?.data || { success: false, message: "Internal Server Error" }
        }
    },

    resetPassword: async (data: resetPasswordType) => {
        try {
            const res = await api.post("/api/auth/reset", data)

            const responseData = res.data

            return responseData

        } catch (error: any) {
            console.log("Error While Resetting Password: ", error)
            return error.response?.data || { success: false, message: "Internal Server Error" }
        }
    }
}

export default authService