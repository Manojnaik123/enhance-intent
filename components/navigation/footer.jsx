import React from 'react'

const Footer = () => {
    return (
        <div className='bg-white-bg w-full flex justify-center items-center h-14 md:h-16 border-muted-text/10 border-t text-muted-text/80'>
            <div className="w-full max-w-5xl text-center flex flex-col gap-1">
                <span>Powered by AI-Enhanced Intent Suggestionss | Co-powered by Bino</span>
                <span className='text-xs text-muted-text/50'>Helping you craft clear, effective requests every time.</span>
            </div>
        </div>
    )
}

export default Footer