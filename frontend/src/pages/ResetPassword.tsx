import { zodResolver } from '@hookform/resolvers/zod'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { resetPasswordSchema, sendOTPSchema } from '../lib/schema'
import type { resetPasswordType, sendOtpType } from '../lib/types'
import authService from '../services/auth.service'
import toast from 'react-hot-toast'
import { Circle, LoaderCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {

    const [steps, setSteps] = useState<"1" | "2">("1")
    const [otpLoading, setotpLoading] = useState<boolean | null>(null)
    const [passLoading, setpassLoading] = useState<boolean | null>(null)
    const [digits, setDigits] = useState<string[]>(Array(6).fill(""))
    const [email, setEmail] = useState<string>("")
    const inputRef = useRef<(HTMLInputElement | null)[]>([])
    const navigate = useNavigate()

    const {
        register: registerEmail,
        handleSubmit: handleEmailSubmit,
        formState: { errors: emailErrors }
    } = useForm({
        resolver: zodResolver(sendOTPSchema)
    })

    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
        setValue
    } = useForm({
        resolver: zodResolver(resetPasswordSchema)
    })

    const onEmailSubmit = async (data: sendOtpType) => {
        setotpLoading(true)
        setEmail(data?.email)
        const result = await authService.sendOTP(data)

        if (result.success) {
            setSteps("2")
            setotpLoading(false)
            toast.success("OTP Sent!")
        } else {
            toast.error(result?.message || "Internal Server Error")
            setTimeout(() => {
                setotpLoading(false)
            }, 5000)
        }
    }


    const onPasswordSubmit = async (data: resetPasswordType) => {
        setpassLoading(true)
        setValue("email", email)
        const result = await authService.resetPassword(data)

        if (result.success) {
            setpassLoading(false)
            toast.success(result?.message || "Password Changed!")
            navigate("/")
        } else {
            toast.error(result?.message || "Internal Server Error")
            setTimeout(() => {
                setpassLoading(false)
            }, 5000)
        }

    }

    const resendCode = async () => {

        const result = await authService.sendOTP({ email: email })

        if (result.success) {
            toast.success("OTP Sent!")
        } else {
            toast.error(result?.message || "Internal Server Error")
            setTimeout(() => {
                setotpLoading(false)
            }, 5000)
        }
    }

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newDigits = [...digits]
        newDigits[index] = value.slice(-1)
        setDigits(newDigits)

        setValue("otp", newDigits.join(""))

        if (value && index < 5) inputRef.current[index + 1]?.focus()
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !digits[index] && index < 0) {
            inputRef.current[index - 1]?.focus()
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex items-center justify-center px-4">
            <div className="w-full max-w-[420px] bg-[#111111] border border-white/[0.07] rounded-2xl p-8 flex flex-col gap-6">

                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0d1f18] border border-[#00f5a020] flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <rect x="3" y="8" width="12" height="8" rx="2" stroke="#00f5a0" strokeWidth="1.4" />
                            <path d="M6 8V5.5a3 3 0 016 0V8" stroke="#00f5a0" strokeWidth="1.4" strokeLinecap="round" />
                            <circle cx="9" cy="12" r="1.2" fill="#00f5a0" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-white">Reset Password</p>
                        <p className="text-xs text-white/40">We'll send a code to your email</p>
                    </div>
                </div>

                <div className="w-full h-px bg-white/[0.06]" />

                {steps === "1" && (
                    <>
                        <form onSubmit={handleEmailSubmit(onEmailSubmit)}>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                                    Email Address
                                </label>
                                <input
                                    {...registerEmail("email")}
                                    type="email"
                                    placeholder="e.g. masab@example.com"
                                    className="w-full bg-[#1a1a1a] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#00f5a040] focus:ring-1 focus:ring-[#00f5a015] transition-all"
                                />
                                {emailErrors.email && (<p>{emailErrors.email.message}</p>)}
                                <button type='submit' className="w-full cursor-pointer mt-5 bg-[#00f5a0] hover:bg-[#00e090] active:bg-[#00cc80] text-black font-semibold text-sm rounded-xl py-3 flex items-center justify-center gap-2 transition-colors">
                                    {otpLoading ? (
                                        <p><LoaderCircle className='animate-spin' size={20} /></p>
                                    ) : (
                                        <>
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                                <path d="M2 7.5h11M8.5 3l4.5 4.5L8.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Send OTP
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </>
                )}

                {steps === "2" && (
                    <>
                        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                                            OTP Code
                                        </label>
                                        <button onClick={()=> resendCode()} type='button' className="text-[11px] cursor-pointer text-[#00f5a0] hover:text-[#00e090] transition-colors">
                                            Resend code
                                        </button>
                                    </div>
                                    <div className="flex gap-2">
                                        <input type="hidden" {...registerPassword("email")} value={email} />
                                        <input type='hidden' {...registerPassword("otp")} />
                                        {[0, 1, 2, 3, 4, 5].map((i) => (
                                            <input
                                                key={i}
                                                ref={(el) => { inputRef.current[i] = el }}
                                                inputMode='numeric'
                                                value={digits[i]}
                                                onChange={(e) => handleChange(i, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(i, e)}
                                                type="text"
                                                maxLength={1}
                                                className="w-full aspect-square bg-[#1a1a1a] border border-white/[0.08] rounded-lg text-center text-sm text-white outline-none focus:border-[#00f5a040] focus:ring-1 focus:ring-[#00f5a015] transition-all"
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                                        New Password
                                    </label>
                                    <input
                                        {...registerPassword("password")}
                                        type="password"
                                        placeholder="Enter new password"
                                        className="w-full bg-[#1a1a1a] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#00f5a040] focus:ring-1 focus:ring-[#00f5a015] transition-all"
                                    />
                                    {passwordErrors.password && (<p>{passwordErrors.password.message}</p>)}
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                                        Confirm Password
                                    </label>
                                    <input
                                        {...registerPassword("confirmPassword")}
                                        type="password"
                                        placeholder="Re-enter new password"
                                        className="w-full bg-[#1a1a1a] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#00f5a040] focus:ring-1 focus:ring-[#00f5a015] transition-all"
                                    />
                                </div>
                            </div>

                            {/* CTA */}
                            <button type='submit' className="w-full mt-5 cursor-pointer bg-[#00f5a0] hover:bg-[#00e090] active:bg-[#00cc80] text-black font-semibold text-sm rounded-xl py-3 flex items-center justify-center gap-2 transition-colors">
                                {passLoading ? (
                                    <p><LoaderCircle className='animate-spin' size={20} /></p>
                                ) : (
                                    <>
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                            <path d="M2 7.5h11M8.5 3l4.5 4.5L8.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Reset Password
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                )}


                <p className="text-center text-xs text-white/25">
                    Remembered it?{" "}
                    <a href="#" className="text-[#00f5a0] hover:underline">Back to login</a>
                </p>

            </div>
        </div >
    )
}

export default ResetPassword