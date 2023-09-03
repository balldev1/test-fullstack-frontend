import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'


const Dashboard = () => {
    return (
        <div className='h-full relative '>
            <Navbar />
            <div className=' py-2 border-2 md:fixed h-full w-full'>
                <Sidebar />
            </div>
        </div>
    )
}

export default Dashboard