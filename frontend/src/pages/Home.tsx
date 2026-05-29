import React from 'react'
import HomeNavbar from '../components/HomeNavbar'

const HomePage = () => {
    return (
        <div >
            <div><HomeNavbar /></div>
            <div className='grid grid-cols-2 w-full h-full'>

                {/* 1st Grid */}
                <div className='bg-[#080A0E] w-full h-[100vh]'
                    style={{
                        backgroundImage: `
      linear-gradient(rgba(0,229,160,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,229,160,0.04) 1px, transparent 1px)
    `,
                        backgroundSize: '40px 40px'
                    }}>

                </div>

                {/* 2nd Grid */}
                <div>

                </div>
            </div>
        </div>
    )
}

export default HomePage