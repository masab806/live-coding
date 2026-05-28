import userModel from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default async function registerUser(fullName, email, password) {
    try {
        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return {
                success: true,
                error: "User Already Exists!"
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            fullName,
            email,
            password: hashedPassword
        })

        return {
            success: true,
            message: "User Created Successfully!",
            newUser
        }


    } catch (error) {
        console.log("Error Occured While Creating User: ", error)
    }    
}

export default async function loginUser(email, password){
    try {
        const user = await userModel.findOne({email})

        if(!user){
            return {
                success: true,
                error: "Invalid Credentials"
            }
        }

        const isMatch = await bcrypt.compare(password, user?.password)

        if(!isMatch){
            return {
                success: true,
                message: "Invalid Credentials!"
            }
        }

        const payload = {
            email: user?.email,
            fullName: user?.fullName
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "7h"})

        return {
            success: true,
            message: "Login Successful!",
            token
        }

    } catch (error) {
        console.log("Error While Logging In: ", error)
    }
}

