import userModel from "../models/user.js"
import bcrypt from "bcrypt"

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