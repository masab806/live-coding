import { LockIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import type { LoginFormData } from '../lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../lib/schema'
import authService from '../services/auth.service'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/auth.store'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const {login: loginStore} = useAuthStore()
    const navigate = useNavigate()

    const onLoginSubmit = async (data: LoginFormData) => {
        try {
            const result = await authService.login(data)

            if(result?.success && result?.message){
                loginStore(result?.user, result?.token)
                navigate("/editor")

                toast.success(result?.message)
            } else {
                toast.error(result?.error || "Internal Server Error")
            }

        } catch (error) {
            throw error
        }
    }

    return (
        <form onSubmit={handleSubmit(onLoginSubmit)}>
            <div className='mt-22 flex flex-col gap-10'>
                <div className='flex flex-col gap-2 items-start ml-20'>
                    <p className='text-xl font-syne text-gray-400'>@ email or username</p>
                    <input {...register("email")} className='p-3 bg-gray-800 w-[500px] rounded-lg' placeholder='you@example.com' />
                    {errors.email && (<p className='flex justify-start items-center w-[500px] text-sm text-red-500'>{errors.email.message}</p>)}
                </div>
                <div className='flex flex-col gap-2 items-start ml-20'>
                    <p className='text-xl font-syne text-gray-400 flex gap-2'><LockIcon size={22} /> Password</p>
                    <input {...register("password")} className='p-3 bg-gray-800 w-[500px] rounded-lg' placeholder='• • • • • •' />
                    {errors.password && (<p className='flex justify-start items-center w-[500px] text-sm text-red-500'>{errors.password.message}</p>)}
                    <p className='flex items-center justify-end w-[500px] text-green-500 font-syne'>Forgot Password?</p>
                </div>

                <div className='flex items-center justify-center'><button className='p-2 cursor-pointer hover:opacity-80 transition-all duration-300 bg-green-500 w-[300px] rounded-lg font-syne text-lg'>Log In</button></div>

                <div className='flex justify-center items-center gap-2'>
                    <div className='h-0.5 bg-gray-600 w-[100px]' />
                    <p className='font-syne text-gray-600'>Or Continue With</p>
                    <div className='h-0.5 bg-gray-600 w-[100px]' />
                </div>
            </div>
        </form>
    )
}

export default Login