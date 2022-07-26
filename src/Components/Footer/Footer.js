import React from 'react'

function Footer() {
    return (
        <>
            <footer className='flex w-[100%] flex-col justify-center items-center bg-navBar-bg-color mt-[40vh]'>
                <div className="1 w-[100%] flex justify-center items-center py-[32px]">
                    <img src="https://www.fancode.com/b9a4bc578a5a1e8c7703327bc58b108f.svg" className='w-[144px]' alt="" />
                </div>
                <div className="2 w-[100%] flex flex-col gap-[23px] justify-center items-center py-[24px] border-t-[1px] border-b-[1px] border-[#282828]">
                    <div>
                        <h1 className='text-[18px] text-[#c8c8c8]'>Connect With Us</h1>
                    </div>
                    <div className='flex justify-center items-center gap-[24px]'>
                        <img src="https://fancode.com/skillup-uploads/icons/twitter_icon.svg" className='w-[48px] cursor-pointer' alt="" />
                        <img src="https://fancode.com/skillup-uploads/icons/insta_icon.svg" className='w-[48px] cursor-pointer' alt="" />
                        <img src="https://fancode.com/skillup-uploads/icons/fb_icon.svg" className='w-[48px] cursor-pointer' alt="" />
                    </div>
                </div>
                <div className="3 w-[100%] flex justify-center items-center px-[32px] ">
                    <div className="address text-center py-[8px] px-[16px] ">
                        <p className='text-white font-[500] text-[14px] '>Corporate Office: ONE BKC, Tower A, 12th &amp; 14th Floor, Unit 1201 &amp; 1202 and 1401 &amp; 1402, Plot C-66, G Block, Bandra Kurla Complex, Bandra (East), Mumbai, Maharashtra-400051</p>
                    </div>
                    <div className='px-[16px]'>
                        <a href="/" className='no-underline text-white font-[500] text-[14px] cursor-pointer'>Careers  </a> <span className='mx-[6px] text-white'> | </span>
                        <a href="/" className='no-underline text-white font-[500] text-[14px] cursor-pointer'>Help Desk </a> <span className='mx-[6px] text-white'> | </span>
                        <a href="/" className='no-underline text-white font-[500] text-[14px] cursor-pointer'>T&amp;Cs </a> <span className='mx-[6px] text-white'> | </span>
                        <a href="/" className='no-underline text-white font-[500] text-[14px] cursor-pointer'>Privacy Policy </a> <span className='mx-[6px] text-white'> | </span>
                        <a href="/" className='no-underline text-white font-[500] text-[14px] cursor-pointer'>About us </a> <span className='mx-[6px] text-white'> | </span>
                        <a href="/" className='no-underline text-white font-[500] text-[14px] cursor-pointer'>IND vs WI</a>
                    </div>

                </div>
            </footer>
        </>
    )
}

export default Footer
