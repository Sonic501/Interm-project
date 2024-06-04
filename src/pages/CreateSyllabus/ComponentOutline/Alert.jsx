import React from 'react'

const AlertLearningHours = () => {
    return (
        <div>
            <div className='bg-black h-screen w-screen fixed z-10 top-0 left-0 bg-opacity-70 flex items-center justify-center'>
                <div className='w-3/12 py-2 px-4 bg-white  relative'>
                    <div className='flex items-center border-b pb-2'>
                        <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 3.99L18.53 17H3.47L11 3.99ZM11 0L0 19H22L11 0ZM12 14H10V16H12V14ZM12 8H10V12H12V8Z" fill="#E74A3B" />
                        </svg>
                        <span className='ml-2 font-bold text-[#2A4365]'>Learning hours</span>
                    </div>
                    <div className='mt-4 '>
                        <div className='mb-10'>Learning hours of a day cannot exceed 8 hours.
                            Save and modify later?</div>
                        <div className='flex justify-end items-center'>
                            <span className='mr-4 text-[#E74A3B] font-semibold underline'>Cancel</span>
                            <button className='bg-[#2D3748] py-1 px-4 rounded-lg text-white font-semibold'>Save as draft</button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

const AlertDay = (props) => {
    return (
        <div>
            <div className='bg-black h-screen w-screen fixed z-10 top-0 left-0 bg-opacity-10 flex items-center justify-center'>
                <div className='w-3/12 py-2 px-4 bg-white  relative'>
                    <div className='flex items-center border-b pb-2'>
                        <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 3.99L18.53 17H3.47L11 3.99ZM11 0L0 19H22L11 0ZM12 14H10V16H12V14ZM12 8H10V12H12V8Z" fill="#E74A3B" />
                        </svg>
                        <span className='ml-2 font-bold text-[#2A4365]'>Delete Day</span>
                    </div>
                    <div className='mt-4 '>
                        <div className='mb-10 text-black'>Delete all content of the Day?</div>
                        <div className='flex justify-end items-center'>
                            <span
                                onClick={() => { 
                                    props.setAlert(false)
                                     }}
                                className='mr-4 text-[#2D3748] font-semibold underline'>Cancel</span>
                            <button
                                onClick={() => {
                                    props.handleDeleteDay(props.index)
                                    props.setAlert(false)}}
                            className='bg-[#E74A3B]  py-1 px-4 rounded-lg text-white font-semibold'>Delete</button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}


export { AlertLearningHours, AlertDay };