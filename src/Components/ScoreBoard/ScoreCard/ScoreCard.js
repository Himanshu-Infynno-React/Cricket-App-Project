import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { TailSpin, Hearts, Grid, Puff, Rings, ThreeDots, Oval, Audio, BallTriangle, Circles } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

function ScoreCard({ score, Team, TeamLineUp, run, extras, bowler, balls, batters }) {

    const [dropDown, setDropDown] = useState(false)
    const [batting, setBatting] = useState(null)
    const [lineUp, setLineUp] = useState(null)
    const [fallenWicket, setFallenWickets] = useState(null)
    const [notBat, setNotBat] = useState([])
    let arr2 = [];


    let DidNotBat = TeamLineUp?.filter((batsman) => {
        return batters?.every((notBated) =>
            batsman.id !== notBated.batsman.id
        )
    }).map((data) => {
        return data.fullname;
    }).join(",")



    let FilterTeam = score.batting.filter((score) => {
        if (Team.id === score.team_id) {
            return score
        }
    })
    let FilterLineUp = score.batting.filter((data) => {
        TeamLineUp.filter((team) => {
            if (team.id === data.player_id) {
                arr2.push(team)
            }
        })
    })
    let FallOfWicket = balls.filter((fallWickets) => {
        if (fallWickets.score.is_wicket == true) {
            return fallWickets;
        }
    })

    console.log(FallOfWicket)

    useEffect(() => {
        setBatting(FilterTeam)
        setLineUp(arr2)
        setFallenWickets(FallOfWicket)
        setNotBat(DidNotBat);
    }, [])

    function DropDown() {
        if (dropDown == true) {
            setDropDown(false)
        }
        else {
            setDropDown(true)
        }
    }

    return (
        <>
            {(score && batting && lineUp && fallenWicket) ?
                <section className="flex justify-center items-center  bg-white" onClick={() => DropDown()} >
                    <div className="flex flex-col w-[660px]">
                        <div className="topTitle border-b-[1px] border-b-[#e6e6e6] px-[18px] py-[15px] flex justify-between items-center gap-auto w-[100%] bg-[#fafafa] h-[50px]">
                            <div className="code">
                                <p className='text-[16px] text-[#141414] font-[600] leading-5'>{Team.code}</p>
                            </div>
                            <div className="scrollBar flex gap-[40px] justify-center items-center">
                                <div className="runs">
                                    <p className='text-[14px] text-[#141414] font-[600] leading-5'>{run[0].score}/{run[0].wickets}</p>
                                </div>
                                <div className="scrollDown w-[20px] h-[20px] flex justify-center items-center bg-[#ffb999] rounded-full">
                                    <button className=' text-white flex justify-center items-center' onClick={() => DropDown()}><FaAngleDown className={`${dropDown ? "rotate-180" : ""} transition-all duration-700`} /></button>
                                </div>
                            </div>
                        </div>
                        <div className={`${dropDown ? 'max-h-[2000px]' : 'max-h-[0px] '} transition-all duration-700 overflow-hidden`}>
                            <table className="scores py-[22px] mt-[20px] w-[660px] px-[7px]">
                                <thead className='flex items-center justify-between p-[10px] rounded-[10px] bg-[#fafafa] text-[#787878]'>
                                    <div>
                                        <th className='min-w-[60px] text-[12px] text-[600] text-inherit'>Batsman</th>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <th className='min-w-[60px] flex justify-start text-[12px] text-[600] text-inherit'>R</th>
                                        <th className='min-w-[60px] flex justify-start text-[12px] text-[600] text-inherit'>B</th>
                                        <th className='min-w-[60px] flex justify-start text-[12px] text-[600] text-inherit'>4s</th>
                                        <th className='min-w-[60px] flex justify-start text-[12px] text-[600] text-inherit'>6s</th>
                                        <th className='min-w-[60px] flex justify-start text-[12px] text-[600] text-inherit'>S/R</th>
                                    </div>
                                </thead>
                                <tbody>
                                    {lineUp.map((data) => {
                                        return <>
                                            <div className='flex items-center w-[660px] justify-between py-[10px] pl-[10px] pr-[10px] text-[#787878] border-b-[1px] border-b-[rgb(245,245,245)]'>
                                                <tr className='flex flex-col  items-start'>
                                                    <Link to='/player'>   <div>
                                                        <td className='text-[14px] text-[#0081ff] cursor-pointer'>{data.fullname}</td>
                                                    </div></Link>
                                                    <div>
                                                        {batting.filter((bat) => data.id === bat.player_id)?.map((data) => (
                                                            <td className='text-[12px] text-[600] text-inherit'> {data.catchstump?.fullname &&
                                                                `c ${data.catchstump?.fullname}`}{" "}
                                                                {data.bowler?.fullname
                                                                    ? `b ${data.bowler?.fullname}`
                                                                    : "Not Out"}</td>
                                                        ))}
                                                    </div>
                                                </tr>
                                                {batting.filter((bat) => data.id === bat.player_id)?.map((filteredData, index) => (
                                                    <tr className='' key={index}>
                                                        <div className='flex justify-center items-center '>
                                                            <td className='w-[60px] text-[12px] text-[600] text-inherit'>{filteredData.score}</td>
                                                            <td className='w-[60px] text-[12px] text-[600] text-inherit'>{filteredData.ball}</td>
                                                            <td className='w-[60px] text-[12px] text-[600] text-inherit'>{filteredData.four_x}</td>
                                                            <td className='w-[60px] text-[12px] text-[600] text-inherit'>{filteredData.six_x}</td>
                                                            <td className='w-[60px] text-[12px] text-[600] text-inherit'>{filteredData.rate}</td>
                                                        </div>
                                                    </tr>
                                                ))}
                                            </div>
                                        </>
                                    })}
                                </tbody>
                            </table>
                            <div className='p-[10px] flex justify-between items-center w-[100%] border-b-[1px] border-b-[rgb(245,245,245)]'>
                                <div className="Extras">
                                    <h1 className='text-[14px] text-[#141414] tracking-[0.25px] font-[600]'>Extras</h1>
                                </div>
                                <div className="ExtrasRight flex justify-center items-center gap-[5px]">
                                    <h4 className='text-[14px] text-[rgb(20,20,20)] font-[600] tracking-[0.26px]'>{extras[0].bye + extras[0].leg_bye + extras[0].wide + extras[0].noball_runs + extras[0].penalty}</h4>
                                    <p className='text-[12px] text-[rgb(120,120,120)] font-normal tracking-[0.4px] leading-snug'>(b {extras[0].bye}, lb {extras[0].leg_bye}, w {extras[0].wide}, nb {extras[0].noball_runs}, p {extras[0].penalty})</p>
                                </div>
                            </div>
                            <div className='p-[10px] flex justify-between items-center w-[100%] border-b-[1px] border-b-[rgb(245,245,245)]'>
                                <div>
                                    <h1 className='text-[14px] text-[#141414] tracking-[0.25px] font-[600]'>Did Not Bat</h1>
                                </div>
                                <div>
                                    <p className='text-[12px] text-[rgb(120,120,120)] font-normal tracking-[0.4px] leading-snug'>{notBat}</p>
                                </div>
                            </div>
                            <div className='p-[10px] flex justify-between items-center w-[100%]'>
                                <div>
                                    <h1 className='text-[18px] text-[rgb(20,20,20)] font-[600] tracking-[0.5px]'>Total Score</h1>
                                </div>
                                <div className='flex justify-center items-center gap-[5px]'>
                                    <h1 className='text-[18px] text-[rgb(20,20,20)] font-[600] tracking-[0.5px]'>{run[0].score}/{run[0].wickets}</h1>
                                    <p className='text-[14px] text-[rgb(120,120,120)] font-normal tracking-[0.25px]'>({run[0].overs} Overs)</p>
                                </div>
                            </div>
                            <div>
                                <table className="scores py-[22px] mt-[20px] w-[660px] px-[7px]">
                                    <thead className='flex items-center justify-between p-[10px] rounded-[10px] bg-[#fafafa] text-[#787878]'>
                                        <div>
                                            <th className='min-w-[60px] text-[12px] text-[600] leading-6 text-inherit'>Bowler</th>
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <th className='min-w-[60px] flex justify-start text-[12px] font-[600] text-inherit'>O</th>
                                            <th className='min-w-[60px] flex justify-start text-[12px] font-[600] text-inherit'>M</th>
                                            <th className='min-w-[60px] flex justify-start text-[12px] font-[600] text-inherit'>R</th>
                                            <th className='min-w-[60px] flex justify-start text-[12px] font-[600] text-[rgb(20,20,20)]'>W</th>
                                            <th className='min-w-[60px] flex justify-start text-[12px] font-[600] text-inherit'>ECO</th>
                                        </div>
                                    </thead>
                                    <tbody>
                                        {bowler.map((data) => {
                                            return <>
                                                <div className='flex items-center w-[660px] justify-between py-[10px] pl-[10px] pr-[10px] text-[#787878] border-b-[1px] border-b-[rgb(245,245,245)]'>
                                                    <tr className='flex flex-col  items-start'>
                                                        <Link to='/player'>  <div>
                                                            <td className='text-[14px] text-[#0081ff] cursor-pointer'>{data.bowler.fullname}</td>
                                                        </div> </Link>
                                                    </tr>
                                                    <tr>
                                                        <div className='flex justify-center items-center '>
                                                            <td className='w-[60px] text-[12px] font-[600] text-inherit'>{data.overs}</td>
                                                            <td className='w-[60px] text-[12px] font-[600] text-inherit'>{data.medians}</td>
                                                            <td className='w-[60px] text-[12px] font-[600] text-inherit'>{data.runs}</td>
                                                            <td className='w-[60px] text-[12px] font-[600] text-[rgb(20,20,20)]'>{data.wickets}</td>
                                                            <td className='w-[60px] text-[12px] font-[600] text-inherit'>{data.rate}</td>
                                                        </div>
                                                    </tr>
                                                </div>
                                            </>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <table className="scores py-[22px] mt-[20px] w-[660px] px-[7px]">
                                    <thead className='flex items-center justify-between p-[10px] rounded-[10px] bg-[#fafafa] text-[#787878]'>
                                        <div>
                                            <th className='min-w-[60px] text-[12px] text-[600] leading-6 text-inherit tracking-[1.5px]'>Fall Of Wickets</th>
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <th className='min-w-[100px] flex justify-start text-[12px] tracking-[1.5px] font-[600] text-inherit'>Score</th>
                                            <th className='min-w-[100px] flex justify-start text-[12px] font-[600] tracking-[1.5px] text-inherit'>Over</th>
                                        </div>
                                    </thead>
                                    <tbody>
                                        {fallenWicket.map((data) => {
                                            return <>
                                                <div className='flex items-center w-[660px] justify-between py-[10px] pl-[10px] pr-[10px] text-[#787878] border-b-[1px] border-b-[rgb(245,245,245)]'>
                                                    <tr className='flex flex-col  items-start'>
                                                        <div>
                                                            <td className='text-[14px] text-[#0081ff] cursor-pointer'>{data.batsman.fullname}</td>
                                                        </div>
                                                    </tr>
                                                    <tr>
                                                        <div className='flex justify-center items-center '>
                                                            <td className='w-[100px] text-[12px] font-[600] text-inherit tracking-[1.5px]'>{data.score.id}</td>
                                                            <td className='w-[100px] text-[12px] font-[600] text-inherit tracking-[1.5px]'>{data.ball}</td>
                                                        </div>
                                                    </tr>
                                                </div>
                                            </>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section> :
                <div className='w-[100%] mt-[100px] h-[200px] flex justify-center items-center'>
                    <Oval color="blue" height={100} width={100} />
                </div>
            }
        </>
    )
}

export default ScoreCard


