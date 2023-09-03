import Image from 'next/image'
import React from 'react'
import { AiOutlineBell } from 'react-icons/ai'

const Navbar = () => {
    return (
        <>
            <div className='flex justify-between px-5 py-2 w-full'>
                <Image src='https://kross.app/images/logo.svg' alt='logo' width="170" height="100" className='cursor-pointer' />
                <div className='flex items-center md:gap-5'>
                    <div className='flex cursor-pointer'>
                        <div className='relative left-5 top-1  w-2 h-2 bg-rose-600 rounded-full ' />
                        <AiOutlineBell size={23} />
                    </div>
                    <div className='flex border-2 md:px-2 px-1 md:py-2 py-1  rounded-xl gap-2 '>
                        <div className='flex justify-center items-center md:w-7 md:h-7 w-5 h-5 bg-gray-300 rounded-full'>
                            <p className='text-gray-500 font-bold text-md'>A</p>
                        </div>
                        <select className='border-none font-bold md:text-sm text-[3px] cursor-pointer'>
                            <option>Account Test</option>
                            <option>Account Test</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar