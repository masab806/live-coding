import z from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(5, "Password Is Required!")
})

export const SignupSchema = z.object({
    fullName: z.string().min(1, "Full Name Required!"),
    email: z.string().email(),
    password: z.string().min(5, "Password Is Required!"),
    confirmPassword: z.string().min(1, "Please Confirm Your Password.")
})
.refine((data)=> data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords Donot Match!"
})

export const resetPasswordSchema = z.object({
    email: z.string().email(),
    otp: z.string().min(6, "Invalid OTP"),
    password: z.string().min(5, "Password Is Required!"),
    confirmPassword: z.string().min(1, "Please Confirm Your Password.")
})
.refine((data)=> data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords Donot Match!"
})

