'use client'
import React, { useState, useEffect } from 'react'
import { PiBagSimpleBold } from 'react-icons/pi'
import { LuCalendarRange } from 'react-icons/lu'
import { CgKeyboard } from 'react-icons/cg'
import { FaRegUser } from 'react-icons/fa'
import Link from 'next/link'
import Contents from './Contents'
import { AiOutlineSetting } from 'react-icons/ai'
import { MdArrowBackIosNew } from 'react-icons/md'
import { MoonLoader } from 'react-spinners'


const Sidebar = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false);
        }, 3000)
    }, [])

    return (
        <>
            <div className=' md:block md:fixed md:h-full md:w-full px-5 '>
                <div className='border-2 '>
                    <div className=' md:h-full  p-2 md:w-[270px] md:fixed    border-2 bg-black-200 bg-violet-100 '>
                        <div className='p-2 border-b-2'>
                            <div className='flex items-center gap-2 cursor-pointer'>
                                <div className='flex justify-center items-center w-10 h-10 bg-orange-400 rounded-full'>
                                    <p className='text-white font-bold text-md'>CG</p>
                                </div>
                                <h1 className='font-bold md:text-[20px] text-[25px]'>Common Ground</h1>
                            </div>

                        </div>
                        <div className='py-5 px-3 '>
                            <div className='flex flex-col gap-5 text-sm font-semibold'>
                                <Link href='/' className='flex items-center md:justify-start  p-2 gap-2 h-10  bg-white rounded-xl cursor-pointer 
                        focus:text-sky-600 focus:bg-violet-100  '>
                                    <PiBagSimpleBold size={25} />
                                    <h1>Project</h1>
                                </Link>
                                <Link href='/' className='flex items-center p-2  gap-2 h-10 bg-white rounded-xl cursor-pointer
                        focus:text-sky-600 focus:bg-violet-100    '>
                                    <LuCalendarRange size={25} />
                                    <h1>Calendar</h1>
                                </Link>
                                <Link href='/' className='flex items-center p-2  gap-2 h-10 bg-white rounded-xl cursor-pointer
                        focus:text-sky-600 focus:bg-violet-100'>
                                    <CgKeyboard size={25} />
                                    <h1>Board</h1>
                                </Link>
                                <Link href='/' className='flex items-center p-2  gap-2 h-10 bg-white rounded-xl cursor-pointer
                        focus:text-sky-600 focus:bg-violet-100'>
                                    <FaRegUser size={25} />
                                    <h1>Users management</h1>
                                </Link>
                                <div className='md:mt-[550px] '>
                                    <Link href='/' className='flex items-center p-2  gap-2 h-10  cursor-pointer '>
                                        <AiOutlineSetting size={25} />
                                        <h1>Setting</h1>
                                    </Link>
                                    <div className='flex justify-end'>
                                        <MdArrowBackIosNew />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* {calendar} */}
                    <div className='md:ml-[270px] '>
                        {isLoading ? (
                            // ถ้า Components ยังโหลดไม่เสร็จให้แสดง "isLoading"
                            <div className='fixed  h-full w-full'>
                                <div className='md:flex items-center  justify-center h-full    '>
                                    <MoonLoader
                                        color="#3b50ce"
                                        loading={isLoading}
                                        size={200}
                                    />

                                </div>
                            </div>
                        ) : (
                            // ถ้า isLoading เป็น false แสดง <Contents />
                            <Contents />
                        )}
                    </div>
                </div >
            </div>
        </>
    )
}

export default Sidebar