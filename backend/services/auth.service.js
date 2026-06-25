import userModel from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import nodemailer from "nodemailer"
import client from "../config/redis.js"

export async function registerUser(fullName, email, password) {
    try {
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
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

export async function loginUser(email, password) {
    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            return {
                success: true,
                error: "Invalid Credentials (Email)"
            }
        }

        const isMatch = await bcrypt.compare(password, user?.password)


        if (!isMatch) {
            return {
                success: true,
                error: "Invalid Credentials! (Pass)"
            }
        }

        const payload = {
            _id: user?._id,
            email: user?.email,
            fullName: user?.fullName
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7h" })

        return {
            success: true,
            message: "Login Successful!",
            user: payload,
            token
        }

    } catch (error) {
        console.log("Error While Logging In: ", error)
    }
}

export async function getUsersByName(fullName) {
    try {
        if (!fullName) {
            return {
                success: false,
                error: "Invalid Name!"
            }
        }

        const users = await userModel.find({
            fullName: { $regex: fullName, $options: 'i' }
        }).select('_id fullName')


        if (users.length === 0) {
            return {
                success: true,
                error: "No User Found!"
            }
        }

        return {
            success: true,
            message: "User: ",
            users
        }

    } catch (error) {
        console.log("Error In Getting User By Name: ", error)
    }
}

async function generateCode(userId){
    try {
        const cachedKey = `otp:${userId}`

        const otpCode = crypto.randomInt(100000, 1000000)

        await client.set(cachedKey, otpCode, 'EX', 120)

        return otpCode

    } catch (error) {
        console.log("Error While Generating Code: ", error)
    }
}

export async function sendOtp(email){
    try {
        const existingUser = await userModel.findOne({
            email: email
        })

        if(!existingUser){
            return {
                success: false,
                message: "Invalid User!"
            }
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        const userId = existingUser?._id
        const userEmail = existingUser?.email

        const otpCode = await generateCode(userId)

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "OTP Code",
            html: `Your OTP Code is: ${otpCode}`
        }
        
        const info = await transporter.sendMail(mailOptions)

        return {
            success: true,
            message: "OTP Sent!",
            OTP: otpCode
        }

    } catch (error) {
        console.log("Error Occured: ", error)
    }
}

export async function resetPassword(email, otp, password){
    try {
        if(!email){
            return {
                success: false,
                message: "No Mail Found!"
            }
        }

        const existingUser = await userModel.findOne({
            email: email
        })

        if(!existingUser){
            return {
                success: false,
                message: "No User Found!"
            }
        }

        const userId = existingUser?._id

        const storedOtp = await client.get(`otp:${userId}`)

        if(!storedOtp){
            return {
                success: false,
                message: "OTP Expired!"
            }
        }
        
        if(otp !== storedOtp){
            return {
                success: false,
                message: "Invalid Otp"
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        existingUser.password = hashedPassword

        await existingUser.save()

        await client.del(`otp:${userId}`)
    
        return {
            success: true,
            message: "Password Changed Successfully!"
        }
        
    } catch (error) {
        console.log("An Error Occured: ", error)
    }
}
