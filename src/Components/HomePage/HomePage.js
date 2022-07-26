import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import Slider from 'react-slick'
import Card from '../Card/Card';
import { AiOutlineArrowRight } from 'react-icons/ai'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { api_token, base_url } from '../Constants/Constants';
import axios from 'axios';
import { TailSpin, Hearts, Grid, Puff, Rings, ThreeDots, Oval, Audio, BallTriangle, Circles } from 'react-loader-spinner'


function HomePage() {

    const [fixture, setFixture] = useState(null)


    const fetchScore = async () => {
        const url = `${base_url}fixtures?api_token=${api_token}&include=localteam,visitorteam,runs,league,season`
        try {
            const fetchData = await axios.get(url);
            const res = fetchData.data;
            const data = res.data.splice(2, 10)
            if (fetchData.status = 200) {
                setFixture(data)
            }
        }
        catch (er) {
            console.log(er.response);
        }
    }



    useEffect(() => {
        fetchScore();
    }, [])

    const ref = useRef();

    function nextSlide() {
        ref.current.slickNext();
    }

    function prevSlide() {
        ref.current.slickPrev();
    }

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
    };


    return (
        <>{fixture ?
            <section className="homePage h-[225px] mb-[200px] flex justify-center items-center pt-[40px] px-[163px] w-[100%] bg-navBar-bg-color">
                <div className="w-[1024px] flex-col justify-center ">
                    <div className='flex items-center justify-between w-[100%]'>
                        <div>
                            <h1 className='text-[20px] text-[white] font-[600]'>Featured Matches</h1>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className="mainCard relative w-[1024px] mt-[16px] mb-[-158px] h-auto">
                        <button className='absolute top-[37%]  bg-white rounded-full border-none text-[#fa5000] shadow-6xl right-[-1%] z-[100] w-[48px] h-[48px] flex justify-center items-center' onClick={() => nextSlide()}><AiOutlineArrowRight size={20} /></button>
                        <button className='absolute top-[37%] w-[48px] z-[100] h-[48px] flex justify-center items-center left-[-2.5%] bg-white rounded-full border-none text-[#fa5000] shadow-6xl' onClick={() => prevSlide()}><AiOutlineArrowLeft size={20} /></button>
                        <Slider ref={ref} {...settings}>
                            {fixture.map((fix) => {
                                return <Card key={fix.id} fix={fix} />
                            })}
                        </Slider>
                    </div>
                </div>
            </section> :
            <div className='w-[100%] mt-[100px] h-[200px] flex justify-center items-center'>
                <TailSpin color="blue" height={100} width={100} />
            </div>
        }
        </>
    )
}

export default HomePage
