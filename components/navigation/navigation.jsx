import { history, logo } from '@/lib/icons'
import React from 'react'

const TopNavigation = () => {
    return (
        <nav className='bg-white-bg border-b border-muted-text/10 fixed h-14 md:h-16 w-full flex justify-center items-center text-muted-text'>
            <div className='flex h-full w-full max-w-5xl justify-between items-center px-4'>
                <div className='flex gap-4 items-center'>
                    <span>{logo}</span>
                    <span className='text-primary-text font-semibold text-lg'>
                        Intent Enhancer</span>
                </div>
                <div className='flex gap-4'>
                    <span className='flex items-center gap-1'>
                       {history} <span className='hidden md:flex'>History</span>
                    </span>
                    {/* <div>
                        Profile
                    </div> */}
                </div>
            </div>
        </nav>
    )
}

export default TopNavigation