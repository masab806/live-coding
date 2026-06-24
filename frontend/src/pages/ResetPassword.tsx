import { useState } from 'react'

const ResetPassword = () => {

    const [steps, setSteps] = useState<"1" | "2">("1")

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

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="e.g. masab@example.com"
                                className="w-full bg-[#1a1a1a] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#00f5a040] focus:ring-1 focus:ring-[#00f5a015] transition-all"
                            />
                            <button className="w-full mt-5 bg-[#00f5a0] hover:bg-[#00e090] active:bg-[#00cc80] text-black font-semibold text-sm rounded-xl py-3 flex items-center justify-center gap-2 transition-colors">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <path d="M2 7.5h11M8.5 3l4.5 4.5L8.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Send OTP
                            </button>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                                    OTP Code
                                </label>
                                <button className="text-[11px] text-[#00f5a0] hover:text-[#00e090] transition-colors">
                                    Resend code
                                </button>
                            </div>
                            <div className="flex gap-2">
                                {[0, 1, 2, 3, 4, 5].map((i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        className="w-full aspect-square bg-[#1a1a1a] border border-white/[0.08] rounded-lg text-center text-sm text-white outline-none focus:border-[#00f5a040] focus:ring-1 focus:ring-[#00f5a015] transition-all"
                                    />
                                ))}
                            </div>
                        </div>

                    </>
                )}

                {steps === "2" && (
                    <>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    className="w-full bg-[#1a1a1a] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#00f5a040] focus:ring-1 focus:ring-[#00f5a015] transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Re-enter new password"
                                    className="w-full bg-[#1a1a1a] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#00f5a040] focus:ring-1 focus:ring-[#00f5a015] transition-all"
                                />
                            </div>
                        </div>

                        {/* CTA */}
                        <button className="w-full bg-[#00f5a0] hover:bg-[#00e090] active:bg-[#00cc80] text-black font-semibold text-sm rounded-xl py-3 flex items-center justify-center gap-2 transition-colors">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <path d="M2 7.5h11M8.5 3l4.5 4.5L8.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Reset password
                        </button>
                    </>
                )}


                <p className="text-center text-xs text-white/25">
                    Remembered it?{" "}
                    <a href="#" className="text-[#00f5a0] hover:underline">Back to login</a>
                </p>

            </div>
        </div>
    )
}

export default ResetPassword