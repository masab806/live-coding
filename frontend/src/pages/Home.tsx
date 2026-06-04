import React from 'react'
import HomeNavbar from '../components/HomeNavbar'
import { useState } from 'react'
import { ZapIcon } from 'lucide-react' // Removed unused BoltIcon
import { Editor } from '@monaco-editor/react'
import Auth from '../components/Auth'
import type { LanguageType } from '../lib/types'


const HomePage = () => {
    const languages: LanguageType[] = [
        {
            name: "Python",
            TextColor: "text-blue-500",
            border: "border-blue-500",
            CircleDot: "bg-blue-500"
        },
        {
            name: "JavaScript",
            TextColor: "text-yellow-500",
            border: "border-yellow-500",
            CircleDot: "bg-yellow-500"
        },
        {
            name: "Ruby",
            TextColor: "text-red-500",
            border: "border-red-500",
            CircleDot: "bg-red-500"
        },
        {
            name: "Node",
            TextColor: "text-green-500",
            border: "border-green-500",
            CircleDot: "bg-green-500"
        },
        {
            name: "C#",
            TextColor: "text-purple-500",
            border: "border-purple-500",
            CircleDot: "bg-purple-500"
        }
    ]

    return (
        <div className="w-full min-h-screen overflow-hidden">
            <div><HomeNavbar /></div>
            <div className='grid grid-cols-[4fr_2fr] w-full h-screen'>

                {/* 1st Grid */}
                <div className='bg-[#080A0E] text-white w-full h-full'
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0,229,160,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,229,160,0.04) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}>

                    <div className='py-36 px-5 text-2xl h-full'>
                        <div className='flex items-start justify-between'>
                            <div>
                                <div className='text-[#00E5A0] bg-[#0B2B27] flex w-fit items-center border-[#076C51] gap-2 rounded-lg  border-2  p-2 mb-6'>
                                    <span><ZapIcon size={22} /></span>
                                    <p className="text-xl font-semibold">real-time collaborative IDE</p>
                                </div>

                                <div className='w-[600px] font-syne text-gray-500 leading-relaxed'>Built for modern engineering teams.Break down silos with instantaneous, zero-latency pairing environments.Deploy pipelines straight from the browser without context switching.</div>
                            </div>

                            <div className='mr-10 border-2 w-fit border-[#2C3137] rounded-xl overflow-hidden shadow-2xl'>
                                <Editor
                                    height="20vh"
                                    width="30vw"
                                    theme='vs-dark'
                                    defaultValue={`# live session — 3 users editing
async def merge_sort(arr):
  if len(arr) <= 1:
    return arr
  mid = len(arr) // 2`}
                                    defaultLanguage="python"
                                    options={{
                                        readOnly: true,
                                        minimap: { enabled: false },
                                        renderLineHighlight: "none",
                                        automaticLayout: true,
                                        scrollbar: {
                                            vertical: 'hidden',
                                            horizontal: 'hidden'
                                        }
                                    }}
                                />
                            </div>


                        </div>

                        <div className='flex justify-between items-center w-full'>
                            <div className='flex flex-col justify-center h-[300px] w-full'>
                                <div className='flex items-center justify-between h-[100px] w-full '>
                                    <p className='text-[#00E5A0] text-7xl font-syne font-bold '>Ship Faster.</p>
                                    <div className='px-40 mt-20'>
                                        <div className='grid grid-cols-3 gap-10 '>
                                            {languages.map((language)=> (
                                                <div className={`border-2  p-2 cursor-pointer transition-all duration-300 ease-out hover:translate-y-1 rounded-lg hover: ${language.TextColor} ${language.border} flex items-center gap-2 w-fit`}>
                                                    <p className={`w-1 p-1 ${language.CircleDot} rounded-full`}></p>
                                                    <p className='font-syne text-lg'>{language.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className='text-gray-400 font-bold font-syne text-xl leading-relaxed'>
                                        Pair program across 8 runtimes. <br />
                                        No setup. Share a link. <br />
                                        Start coding instantly.
                                    </p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                {/* 2nd Grid */}
               <div className='overflow-auto h-full'>
                    <Auth/>
               </div>
            </div>
        </div>
    )
}

export default HomePage
