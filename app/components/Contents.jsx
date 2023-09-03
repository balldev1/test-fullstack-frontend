'use client'
import React, { useState, useEffect } from 'react'
//react-big-calendar ปฎิทิน react-datepicker เลือกวันที่จากปฏิทิน date-fns จัดการเวลาและวันที่ 
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { Calendar as DateCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import "react-big-calendar/lib/css/react-big-calendar.css";
import SelectDrop from './SelectDrop';
import InputDate from './InputDate';
import { addMonths } from 'date-fns';
import { AiOutlinePlus } from 'react-icons/ai'
import { LuCalendarRange } from 'react-icons/lu'
import { BsFilter } from 'react-icons/bs'
import { GrNext } from 'react-icons/gr'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import moment from "moment";
import { ImFacebook2 } from 'react-icons/im'
import { CiImageOn } from 'react-icons/ci'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { GrFormClose } from 'react-icons/gr'

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});



const Contents = () => {

    useEffect(() => {
        fetch('http://localhost:3333/content/')
            .then(res => res.json())
            .then(data => {
                setData(data)
            })

    }, []);

    const [data, setData] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('month');
    const [selectedEvent, setSelectedEvent] = useState(null); // เพิ่ม state สำหรับเก็บข้อมูล event ที่ถูกเลือก


    const events = data ? data.map((item) => ({
        title: item.content_name,
        allDay: true,
        start: new Date(item.update_at),
        end: new Date(item.update_at),
    })) : [];

    console.log(data)

    const handleCloseEvent = () => {
        setSelectedEvent(null);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handlePrevMonth = () => {
        setSelectedDate(addMonths(selectedDate, -1));
    };

    const handleNextMonth = () => {
        setSelectedDate(addMonths(selectedDate, 1));
    };

    const pageTitle = format(selectedDate, 'MMMM yyyy'); // รูปแบบข้อมูลเดือนและปี

    const handleViewChange = (event) => {
        setView(event.target.value);
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event); // เมื่อคลิกที่ event จะเซ็ตข้อมูล event ที่ถูกเลือกใน state
    };

    return (
        <>
            {/* {nav} */}
            <div className=' md:px-7 px-2  flex  items-center  border-b-[2px] w-full h-[68px] rounded-md'>
                {/* {head} */}
                <div className='flex gap-2 md:w-[150px] w-[100px] border-r-2'>
                    <LuCalendarRange size={25} />
                    <h1 className='font-bold text-md text-[13px]'>Calendar</h1>
                </div>
                <div className='flex items-center  gap-2 ml-2'>
                    <BsFilter size={25} />
                    {/* {from SelectDrop} */}
                    <div className=''>
                        <SelectDrop />
                    </div>
                </div>
                <button className='flex md:gap-2 items-center justify-center 
                ml-auto bg-sky-700 md:w-[155px] md:h-[40px] text-[10px]  rounded-md md:text-sm
                 text-white'>
                    <AiOutlinePlus size={18} />
                    <p>Create content</p>
                </button>
            </div>
            {/* {calendar} */}
            <div className='md:flex flex-col z-0 '>
                <div className='md:w-[250px] md:fixed  h-full px-2 py-2 '>
                    <div className=' flex items-center  justify-center mb-5'>
                        <DateCalendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            locale="en-US"
                        />
                    </div>
                    <div className='px-3 text-sm  md:text-start'>
                        <h1 className='text-center'>Filter date type</h1>
                        <div className='mt-3 '>
                            <InputDate />
                        </div>
                    </div>
                </div>


                <div className='md:ml-[250px] mt-3 z-0 '>
                    <div className='flex items-center pb-4'>
                        <button className='ml-3 md:ml-0 border-2 md:px-4 px-2 py-2 rounded-xl font-semibold md:text-md md:text-[14px] md:mr-5 mr-2'
                            onClick={() => handleDateChange(new Date())}>Today</button>
                        <button className='border-2 md:px-3 px-1 py-3 rounded-xl md:mr-2 mr-2'
                            onClick={() => handlePrevMonth()}><MdOutlineArrowBackIosNew /> </button>
                        <button className='border-2 md:px-3 px-1 py-3 rounded-xl md:mr-5 mr-1 '
                            onClick={() => handleNextMonth()}> <GrNext /></button>
                        <h1 className='font-semibold md:text-2xl md:text-md text-[10px]'>{pageTitle}</h1>
                        <div className='ml-auto pr-5'>
                            <div className='border-2 md:px-4 px-2 py-2 rounded-xl  md:text-[14px] font-semibold text-[10px]'>
                                <select value={view} onChange={handleViewChange}>
                                    <option value="month">Month</option>
                                    <option value="week">Week</option>
                                    <option value="day">Day</option>
                                    <option value="agenda">Agenda</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <BigCalendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 850, }}
                        date={selectedDate}
                        view={view} // กำหนดค่าของ view ที่มีการติดตามการเปลี่ยนแปลง
                        onView={(newView) => setView(newView)} // ตั้งค่า view เมื่อมีการเปลี่ยนแปลง
                        toolbar={false}
                        onNavigate={handleDateChange}
                        onSelectEvent={handleSelectEvent} // เพิ่มการจัดการเหตุการณ์เมื่อคลิกที่ event
                    />
                </div>

            </div>
            {/* แสดงข้อมูล event ที่ถูกเลือก */}
            {selectedEvent && (
                <div className=' absolute z-100 flex justify-center md:items-center md:mt-0 pt-20 inset-0  bg-black bg-opacity-20'>
                    <div className=' md:top-0 px-5 py-4  w-[350px] h-[600px]  bg-white border-2 rounded-xl  top-20  shadow-xl shadow-gray-400'>
                        <div className='relative'>
                            <GrFormClose onClick={handleCloseEvent}
                                className='absolute right-2 top-1 cursor-pointer' size={30} />
                        </div>
                        <div>
                            {data.map((item) => {
                                if (item.content_name === selectedEvent.title) {
                                    return (
                                        <div key={item.id}>
                                            <div className='flex flex-row items-center pb-3'>
                                                <div className='flex items-center justify-center  w-[50px] h-[40px] bg-gray-300 rounded-md'>
                                                    <h1 className='font-semibold text-gray-500 text-md'>P</h1>
                                                </div>
                                                <div className='flex flex-col ml-4 font-semibold px-2 py-2'>
                                                    <h1 className='text-[12px] text-gray-400'>{item.project_name}</h1>
                                                    <h1 className='text-md'>{item.content_name}</h1>
                                                </div>

                                            </div>
                                            <hr />
                                            <div className='py-5 flex flex-row gap-3'>
                                                <LuCalendarRange
                                                    size={20} />
                                                <div className='flex-col space-y-2'>
                                                    <div>
                                                        <h1 className='text-[12px] text-gray-400'>Due date</h1>
                                                        <h1 className='text-md '>{moment(item.date.due_date).format('DD MMM YYYY - HH:mm')}</h1>
                                                    </div>
                                                    <div>
                                                        <h1 className='text-[12px] text-gray-400'>Publishing date</h1>
                                                        <h1 className='text-md '>{moment(item.date.publishing_date).format('DD MMM YYYY - HH:mm')}</h1>
                                                    </div>
                                                    <div>
                                                        <h1 className='text-[12px] text-gray-400'>Shooting date</h1>
                                                        <h1 className='text-md '>{moment(item.date.shooting_date).format('DD MMM YYYY - HH:mm')}</h1>
                                                    </div>
                                                    <div>
                                                        <h1 className='text-[12px] text-gray-400'>Pitching date</h1>
                                                        <h1 className='text-md '>{moment(item.date.pitching_date).format('DD MMM YYYY - HH:mm')}</h1>
                                                    </div>
                                                    <div className='py-5'>
                                                        <h1 className='text-[12px] text-gray-400'>Type</h1>
                                                        <h1 className='text-md '>Creative</h1>
                                                    </div>
                                                    <div className='space-y-1'>
                                                        <h1 className='text-[12px] text-gray-400'>Channel</h1>
                                                        <div className='flex gap-2 items-center'>
                                                            <ImFacebook2 className='text-sky-600' size={17} />
                                                            <h1 className='text-md '>{item.channel}</h1>
                                                        </div>
                                                    </div>
                                                    <div className=''>
                                                        <h1 className='text-[12px] text-gray-400'>Channel</h1>
                                                        <div className='flex gap-2 items-center'>
                                                            <CiImageOn size={20} />
                                                            <h1 className='text-md '>{item.creative_type}</h1>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <button className='flex items-center justify-center gap-2 w-full h-[50px] bg-sky-700 font-semibold rounded-md text-white'>
                                                <BsBoxArrowUpRight />
                                                View content
                                            </button>
                                        </div>
                                    );
                                }
                                return null; // ถ้าไม่ตรงกับ event ที่ถูกคลิก
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}



export default Contents