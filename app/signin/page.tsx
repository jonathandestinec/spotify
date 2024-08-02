"use client"

import { BackgroundBeams } from '@/components/ui/background-beams'

// Server Functions
import { signin } from '@/utils/server/signin'

function page() {

    const handleSignin = async () => {
        await signin()
    }

    return (
        <div>
            <div className=' flex items-center justify-center w-full h-screen'>

                <div className=' w-max h-max'>
                    <h1 className=' bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-600 text-center font-sans font-bold text-7xl'>Spotify Login</h1>

                    <div className='ml-auto mr-auto w-max mt-8'>

                        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 focus:ring-offset-slate-800 pl-7 pr-7 cursor-pointer" onClick={handleSignin}>

                            <h4 className='font-sans text-center font-medium text-[18px]'>Login</h4>

                            <i className="fi fi-brands-spotify text-[#1DB954] opacity-50 text-[25px] flex items-center justify-center w-max h-max ml-5"></i>

                        </button>

                    </div>

                </div>
            </div>
            <BackgroundBeams className=' -z-20' />
        </div>
    )
}

export default page