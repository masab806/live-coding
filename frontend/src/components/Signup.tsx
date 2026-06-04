import { LockIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import type { SignupFormData } from '../lib/types'
import { zodResolver } from "@hookform/resolvers/zod"
import { SignupSchema } from '../lib/schema'

const Signup = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignupFormData>({
        resolver: zodResolver(SignupSchema)
    })

    const onSignupSubmit = (data: SignupFormData)=> {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSignupSubmit)}>
            <div className='mt-10 flex flex-col gap-5'>
                <div className='flex flex-col gap-2 items-start ml-20'>
                    <p className='text-xl font-syne text-gray-400'>Full Name</p>
                    <input {...register("fullName")} className='p-3 bg-gray-800 w-[500px] rounded-lg' placeholder='Full Name' />
                    {errors.fullName && (<p className='text-red-500 text-xs font-syne'>{errors.fullName.message}</p>)}
                </div>
                <div className='flex flex-col gap-2 items-start ml-20'>
                    <p className='text-xl font-syne text-gray-400'>@ email or username</p>
                    <input {...register("email")} className='p-3 bg-gray-800 w-[500px] rounded-lg' placeholder='you@example.com' />
                    {errors.email && (<p className='text-red-500 text-xs font-syne'>{errors.email.message}</p>)}
                </div>
                <div className='flex flex-col gap-2 items-start ml-20'>
                    <p className='text-xl font-syne text-gray-400 flex gap-2'><LockIcon size={22} /> Password</p>
                    <input {...register("password")} className='p-3 bg-gray-800 w-[500px] rounded-lg' placeholder='• • • • • •' />
                    {errors.password && (<p className='text-red-500 text-xs font-syne'>{errors.password.message}</p>)}
                </div>
                <div className='flex flex-col gap-2 items-start ml-20'>
                    <p className='text-xl font-syne text-gray-400 flex gap-2'><LockIcon size={22} />Confirm Password</p>
                    <input {...register("confirmPassword")} className='p-3 bg-gray-800 w-[500px] rounded-lg' placeholder='• • • • • •' />
                    {errors.confirmPassword && (<p className='text-red-500 text-xs font-syne'>{errors.confirmPassword.message}</p>)}
                </div>

                <div className='flex items-center justify-center'><button className='p-2 bg-green-500 w-[300px] rounded-lg font-syne text-lg'>Sign Up</button></div>

                <div className='flex justify-center items-center gap-2'>
                    <div className='h-0.5 bg-gray-600 w-[100px]' />
                    <p className='font-syne text-gray-600'>Or Continue With</p>
                    <div className='h-0.5 bg-gray-600 w-[100px]' />
                </div>
            </div>
        </form>
    )
}

export default Signup