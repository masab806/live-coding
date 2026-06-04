import React, { useState } from 'react'
import { Editor } from '@monaco-editor/react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const CodeEditor = () => {

    const [openSidebar, setSidebar] = useState<boolean>(true)

    return (
        <div className='w-full h-full'>
            <Navbar />
            <div className='flex w-full'>
                <Sidebar openSidebar={openSidebar} setSidebar={setSidebar} />
                <div className='flex-1 min-w-0'>
                    <Editor
                        height="70vh"
                        width="100%"
                        theme='vs-dark'
                        defaultLanguage='javascript'
                        defaultValue='Hello'
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeEditor