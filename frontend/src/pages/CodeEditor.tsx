import React from 'react'
import { Editor } from '@monaco-editor/react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const CodeEditor = () => {
    return (
        <div className='w-full h-full'>
            <Navbar/>
        <div className='flex '>

            <Sidebar />
            <Editor
                height="70vh"
                width="100vw"
                theme='vs-dark'
                defaultLanguage='javascript'
                defaultValue='Hello'
                />
        </div>
        </div>
    )
}

export default CodeEditor