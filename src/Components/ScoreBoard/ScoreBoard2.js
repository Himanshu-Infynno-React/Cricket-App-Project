import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ScoreCard from './ScoreCard/ScoreCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMatches } from '../Slices/scoreBoardSlice/scoreBoardSlice';
import { TailSpin, Hearts, Grid, Puff, Rings, ThreeDots, Oval, Audio, BallTriangle, Circles } from 'react-loader-spinner'

function ScoreBoard() {

    const dispatch = useDispatch();
    const { score , looserTeamRun , winnerTeamRun , localTeamID,visitorTeamID,winnerTeam,looserTeam,winnerTeamLineUp,looserTeamLineUp,looserteamExtras,winnerteamExtras,looserTeamBowler,winnerTeamBowler,winnerTeamBalls,looserTeamBalls,winnerTeamBatting,looserTeamBatting} = useSelector((state) => state.scoreBoardSlice)
    const {id} = useParams();

    useEffect(() => {
        dispatch(fetchMatches(id))
    }, [])


    return (
        <>
            {(score && looserTeamRun && winnerTeamRun && localTeamID && visitorTeamID && winnerTeam && looserTeam && winnerTeamLineUp && looserTeamLineUp && looserteamExtras && winnerteamExtras && looserTeamBowler && winnerTeamBowler  && winnerTeamBatting && looserTeamBatting) ?
                (<section className="ScoreBoard mt-[60px]">
                    <div className="flex justify-center items-center w-[100%]">
                    <div className="scoreHeader flex flex-col gap-[10px] text-center w-[660px] py-[20px] px-[20px]">
                        <div className="headerTop flex justify-between items-center ">
                            <div className="leftChallenger flex flex-col items-start ">
                                <div className="imgFlag place-items-start">
                                    <span className='bg-[#51bf94] py-[3px] px-[5px] rounded-sm text-white text-[11px]'>{score.visitorteam.code}</span>
                                </div>
                                <div className="score flex items-end">
                                    <h1 className='leading-[42px] text-[28px] font-[600]'>{visitorTeamID[0]?.score}/{visitorTeamID[0]?.wickets}</h1>
                                    <p className='leading-[22px] text-[12px] mx-[5px] my-[5px] text-[#787878] font-[600]'>({visitorTeamID[0]?.overs})</p>
                                </div>
                            </div>
                            <div className="Versus flex flex-col items-center relative">
                                <div className="horiline w-[0px] border-[1px] border-[#e6e6e6] h-[18px]"></div>
                                <div className="versusLogo rounded-full bg-[#e6e6e6] w-7 h-7 flex justify-center items-center text-[15px] text-[#787878]">V</div>
                                <div className="horiline w-[0px] border-[1px] border-[#e6e6e6] h-[18px]"></div>
                            </div>
                            <div className="rightChallenger flex flex-col items-end ">
                                <div className="imgFlag place-items-start">
                                    <span className='bg-black py-[3px] px-[5px] rounded-sm text-white text-[11px]'>{score.localteam.code}</span>
                                </div>
                                <div className="score flex flex-row-reverse items-end">
                                    <h1 className='leading-[42px] text-[24px] text-[#787878] font-[600]'>{localTeamID[0]?.score}/{localTeamID[0]?.wickets}</h1>
                                    <p className='leading-[22px] text-[12px] mx-[5px] my-[5px] text-[#787878] font-[600]'>({localTeamID[0]?.overs})</p>
                                </div>
                            </div>
                        </div>
                        <div className="headerBOT text-center w-[100%] ">
                            <p className='text-center text-[#001240] text-[14px] font-[600] '>{score.note}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center w-[100%]">
                    <div className="flex justify-center items-center py-[14px] border-t-[1px] border-b-[1px] border-[#E6E7EC]">
                        <ul className='flex justify-center items-center text-center'>
                            <li className='w-[134px] h-[20px] flex justify-center items-center text-[14px] text-[#66718c] font-[400] leading-normal cursor-pointer'>Fantasy</li>
                            <li className='w-[134px] h-[20px] flex justify-center items-center text-[14px] text-[#66718c] font-[400] leading-normal cursor-pointer'>Info</li>
                            <li className='w-[134px] h-[20px] flex justify-center items-center text-[14px] text-[#66718c] font-[400] leading-normal cursor-pointer'>Live</li>
                            <li className='w-[134px] h-[20px] flex justify-center items-center text-[14px] text-[#001240] font-[600] leading-normal cursor-pointer'>Scorecard</li>
                            <li className='w-[134px] h-[20px] flex justify-center items-center text-[14px] text-[#66718c] font-[400] leading-normal cursor-pointer'>Squad</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <ScoreCard score={score} balls={looserTeamBalls} batters={winnerTeamBatting} bowler={looserTeamBowler} Team={winnerTeam} TeamLineUp={winnerTeamLineUp} extras={winnerteamExtras} run={winnerTeamRun} />
                </div>
                <div>
                    <ScoreCard score={score} balls={winnerTeamBalls} batters={looserTeamBatting} bowler={winnerTeamBowler} Team={looserTeam} TeamLineUp={looserTeamLineUp} extras={looserteamExtras} run={looserTeamRun} />
                </div>
                </section>) :
                <div className='w-[100%] mt-[100px] h-[200px] animate-bounce flex justify-center items-center'>
                    <ThreeDots color="blue" height={100} width={100} />
                </div>
            }
        </>
    )
}

export default ScoreBoard
