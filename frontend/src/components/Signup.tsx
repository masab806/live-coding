import { LockIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import type { SignupFormData } from '../lib/types'
import { zodResolver } from "@hookform/resolvers/zod"
import { SignupSchema } from '../lib/schema'
import authService from '../services/auth.service'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignupFormData>({
        resolver: zodResolver(SignupSchema)
    })

    const navigate = useNavigate()

    const onSignupSubmit = async (data: SignupFormData) => {
        try {
            const result = await authService.signup(data)
            if (result?.success && result?.message) {
                navigate("/")
                toast.success(result?.message)
            } else {
                toast.error(result?.error || "Internal Server Error!")
            }
        } catch (error) {
            toast.error("Internal Server Error")
            throw error
        }
    }

    const allFields = [
        {
            label: "Full Name",
            field: "fullName" as const,
            placeholder: "Full Name",
            icon: null,
            error: errors.fullName
        },
        {
            label: "@ email or username",
            field: "email" as const,
            placeholder: "you@example.com",
            icon: null,
            error: errors.email
        },
        {
            label: "Password",
            field: "password" as const,
            placeholder: "• • • • • •",
            icon: <LockIcon size={22} />, error: errors.password
        },
        {
            label: "Confirm Password",
            field: "confirmPassword" as const,
            placeholder: "• • • • • •",
            icon: <LockIcon size={22} />,
            error: errors.confirmPassword
        }
    ]

    return (
        <form onSubmit={handleSubmit(onSignupSubmit)}>
            <div className='mt-6 lg:mt-10 flex flex-col gap-4 lg:gap-5 px-4 sm:px-8 items-center lg:items-start'>
                {allFields.map(({ label, field, placeholder, icon, error }) => (
                    <div key={field} className='flex flex-col gap-2 items-start w-full max-w-[500px] lg:ml-12'>
                        <p className='text-base sm:text-xl font-syne text-gray-400 flex gap-2 items-center'>{icon}{label}</p>
                        <input {...register(field)} className='p-3 bg-gray-800 w-full rounded-lg' placeholder={placeholder} type={field.toLowerCase().includes("password") ? "password" : "text"} />
                        {error && (<p className='text-red-500 text-xs font-syne'>{error.message}</p>)}
                    </div>
                ))}

                <div className='flex items-center justify-center w-full max-w-[500px] lg:ml-12 mt-2 mb-2'>
                    <button type='submit' className='p-2 cursor-pointer bg-green-500 w-full sm:w-[300px] rounded-lg font-syne text-lg hover:opacity-80 transition-all'>Sign Up</button>
                </div>

                <div className='flex justify-center items-center gap-2 w-full max-w-[500px] lg:ml-12'>
                    <div className='h-0.5 bg-gray-600 w-[100px]' />
                    <p className='font-syne text-gray-600 text-sm'>Or Continue With</p>
                    <div className='h-0.5 bg-gray-600 w-[100px]' />
                </div>
            </div>
        </form>
    )
}

export default Signup