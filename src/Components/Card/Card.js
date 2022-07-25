import React, { useEffect, useState } from 'react'
import IMG from '../../images/cricket image.webp'
import { Link } from 'react-router-dom'
import { AiFillPlayCircle } from 'react-icons/ai'
import { api_token, base_url } from '../Constants/Constants'
import axios from 'axios'

function Card({ fix }) {

    const [fixtureId, setFixtureId] = useState(null)
    const [localTeamId, setLocalTeamId] = useState([])
    const [visitorTeamId, setVisitorTeamId] = useState([])

    // console.log(fix.status)

    function getScore (){
        let score1 = fix.runs.filter((sor)=>{ if (fix.localteam_id == sor.team_id) { return sor }  })
        let score2 = fix.runs.filter((sor)=>{ if (fix.visitorteam_id == sor.team_id) { return sor }  })
        setLocalTeamId(score1)
        setVisitorTeamId(score2)
    }


    useEffect(() => {
        setFixtureId(fix);
        getScore();
    }, [])


    return (
        <>
            {fixtureId && 
                <Link to={`/scoreboard/${fixtureId.id}`}>
                    <div className="container cursor-pointer relative group">
                        <div className="Card relative w-[325px] h-[220px]">
                            <div className="cardTop  z-10 relative shadow-[rgb(0 0 0 / 10%) 0px 4px 8px 0px]  ">
                                <div className="backImg">
                                    <img src={IMG} alt="" className='w-[325px] rounded-tl-[12px] rounded-tr-[12px] h-[100px] absolute z-[-1]' />
                                </div>
                                <div className="labelForODI z-[1] bg-gradient-to-t from-[#000000e6] to-[#00000000] flex w-[325px] h-[100px] justify-center ">
                                    <p className='text-white  translate-y-[60px] text-[12px] overflow-hidden whitespace-nowrap text-ellipsis'>{fixtureId.round} {fixtureId.league.name} {fixtureId.season.name}</p>
                                </div>
                            </div>
                            <div className="CardBtn flex justify-center items-center absolute z-[100]  top-[38%] w-[100%]">
                                {fixtureId.live ? <button className='w-fit h-[32px] shadow-5xl rounded-[30px] flex tracking-[1.4px] justify-center items-center text-[14px] font-[600] text-white px-[12px] bg-[#fa5000]'><AiFillPlayCircle size={20} className='mr-[6px]' /> Watch Now</button> : <button className='w-fit h-[32px] shadow-5xl rounded-[30px] flex tracking-[1.2px] justify-center items-center text-[14px] font-[650] text-[#fa5000] px-[12px] bg-white'>PREVIEW</button>}
                            </div>
                            <div className="cardBot z-[10] relative bg-white pt-[25px] rounded-bl-[12px] rounded-br-[12px] pr-[14px] pl-[14px] max-w-[325px] h-[100px] border-[1px] border-[#e6e6e6]">
                                <div className="Bot relative">
                                    <div className="challengers flex justify-between items-center gap-[7px]">
                                        <div className="leftChallenger flex justify-center  gap-[11px]">
                                            <div className="leftFlag">
                                                <img src={fixtureId.visitorteam.image_path} className='w-[32px] h-[32px]' alt="" />
                                                <caption className='text-[10px] px-[5px] '>{fixtureId.visitorteam.code}</caption>
                                            </div>
                                            <div className="leftRuns">
                                                <p className='text-[#666666] text-[14px] font-[600]'>{visitorTeamId[0]?.score}/{visitorTeamId[0].wickets}</p>
                                                <p className='text-[#999999] text-[12px] '>{visitorTeamId[0].overs} overs</p>
                                            </div>
                                        </div>
                                        <div className="Versus flex flex-col items-center relative">
                                            <div className="horiline w-[0] border-[1px] border-[#e6e6e6] h-[10px]"></div>
                                            <div className="versusLogo rounded-full bg-[#e6e6e6] w-4 h-4 flex justify-center items-center text-[10px] text-black">v</div>
                                            <div className="horiline w-[0px] border-[1px] border-[#e6e6e6] h-[10px]"></div>
                                        </div>
                                        <div className="rightChallenger flex justify-center  gap-[11px]">
                                            <div className="rightRuns">
                                                <p className='text-[#666666] text-[14px] font-[600] text-right'>{localTeamId[0].score}/{localTeamId[0].wickets}</p>
                                                <p className='text-[#999999] text-[12px]'>{localTeamId[0].overs} overs</p>
                                            </div>
                                            <div className="rightFlag">
                                                <img src={fixtureId.localteam.image_path} className=' w-[32px] h-[32px]' alt="" />
                                                <caption className='text-[10px] px-[5px]'>{fixtureId.localteam.code}</caption>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="challengerUpdate text-center ">
                                        <p className='text-[12px]'>{fixtureId.note}</p>
                                    </div>
                                </div>
                            </div>
                            <div className=" w-[325px]  z-[-1] group-hover:visible  bg-[#e6e6e6] flex justify-center items-center invisible rounded-b-[20px]  mt-[-5px] h-[30px]">
                                <p className='flex justify-center items-center gap-[5px] text-[14px] '>More on Cricket <AiFillPlayCircle className='text-orange-600' /></p>
                            </div>
                        </div>
                    </div>
                </Link>}
        </>
    )
}

export default Card
