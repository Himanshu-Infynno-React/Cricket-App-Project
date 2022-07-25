import React from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BiUserCircle } from 'react-icons/bi'

function NavBar() {
    return (
        <>
            <section className=' z-[9999] fixed top-0 left-0 right-0 bg-navBar-bg-color flex justify-center items-center  pt-[5px] pb-[10px]  px-[163px] w-auto  '>
                <div className="container flex justify-center gap-[226px] items-center max-w-[1440px]">
                <div className="container flex justify-between items-center  w-auto">
                    <div className=' flex gap-[50px] justify-center items-center  pr-[39px]'>
                        <div className=''>
                            <img src="https://www.fancode.com/867f5c067d544a3f79567a893209f1c4.svg" className='w-[144px] cursor-pointer' alt="" />
                        </div>
                        <nav className='flex gap-[24px] justify-center items-center list-none relative'>
                            <li className='text-[14px] mt-[6px] font-[600] text-[#ff5000] cursor-pointer'>HOME</li>
                            <li className='text-[14px] mt-[6px] font-[600] text-[white] cursor-pointer'>SCHEDULE</li>
                            <li className='text-[14px] mt-[6px] font-[600] text-[white] cursor-pointer'>SHOP <sup className='text-[11px] font-[600] text-[white] px-[4px] bg-orange-600 rounded-[2px]'>NEW</sup></li> 
                        </nav>
                    </div>
                </div>
                <div className="container w-auto flex justify-center items-center">
                    <div className='flex gap-4 justify-center items-center '>
                        <div className='flex justify-center items-center gap-3 pt-[6px]'>
                            <img src="https://fancode.com/skillup-uploads/fc-web/icon-play-store.png" className='cursor-pointer w-6' alt="" />
                            <img src="https://fancode.com/skillup-uploads/fc-web/icon-app-store.png" className='cursor-pointer w-6' alt="" />
                            <p className='text-[14px] font-[200] text-[white] cursor-pointer whitespace-nowrap '>GET THE APP</p>
                        </div>
                        <div className="flex justify-center items-center gap-[8px] pt-[6px]">
                            <IoMdNotificationsOutline className='text-white text-[24px]' />
                            <img src="https://www.fancode.com/4e3d7cbf4a8cd768e30b93b7540340a2.png" className='cursor-pointer w-[24px]' alt="" />
                            <p className='text-white font-[500] text-[14px] cursor-pointer' >Login/Register</p>
                        </div>
                    </div>
                </div>
                </div>
            </section>
        </>
    )
}

export default NavBar
