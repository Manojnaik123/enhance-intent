import React from 'react'

const Footer = () => {
    return (
        <div className='bg-white-bg w-full flex justify-center items-center  border-muted-text/10 border-t text-muted-text/80'>
            <div className="w-full max-w-5xl text-center flex flex-col gap-1 p-4">
                <span className='text-xs md:text-md'>Powered by AI-Enhanced Intent Suggestionss</span>
                <span className='text-[8px] md:text-[10px] text-muted-text/50'>Helping you craft clear, effective requests every time.</span>
            </div>
        </div>
    )
}

export default Footer