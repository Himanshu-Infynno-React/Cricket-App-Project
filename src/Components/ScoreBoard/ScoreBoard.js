import React, { useEffect, useState } from 'react'
import { base_url } from '../Constants/Constants';
import { api_token2 } from '../Constants/Constants';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import ScoreCard from './ScoreCard/ScoreCard';
import { TailSpin , Hearts , Grid , Puff ,Rings , ThreeDots, Oval , Audio ,BallTriangle, Circles } from  'react-loader-spinner'

function ScoreBoard() {

    const [score, setScore] = useState(null);
    const [localTeamID, setLocalTeamID] = useState([]);
    const [visitorTeamID, setVisitorTeamID] = useState([]);
    const [winnerTeam, setWinnerTeam] = useState(null);
    const [looserTeam, setLooserTeam] = useState(null);
    const [winnerTeamLineUp, setWinnerTeamLineUp] = useState(null);
    const [looserTeamLineUp, setLooserTeamLineUp] = useState(null);
    const [winnerTeamRun, setWinnerTeamRun] = useState(null);
    const [looserTeamRun, setLooserTeamRun] = useState(null);
    const [looserteamExtras, setLooserTeamExtras] = useState(null);
    const [winnerteamExtras, setWinnerTeamExtras] = useState(null);
    const [looserTeamBowler, setLooserTeamBowler] = useState(null);
    const [winnerTeamBowler, serWinnerTeamBowler] = useState(null);
    const [winnerTeamBalls, setWinnerTeamBalls] = useState(null);
    const [looserTeamBalls, setLooserTeamBalls] = useState(null);
    const [winnerTeamBatting, setWinnerTeamBatting] = useState(null);
    const [looserTeamBatting, setLooserTeamBatting] = useState(null)




    const { id } = useParams();

    const fetchScore = async () => {
        const url = `${base_url}fixtures/${id}?api_token=${api_token2}&include=localteam,visitorteam,scoreboards,bowling,batting,balls,runs,winnerteam,lineup,balls.batsmanout,batting.batsman,bowling.bowler,batting.bowler,batting.catchstump`
        const fetchData = await axios.get(url);
        const res = fetchData.data;
        const data = res.data
        if (fetchData.status == 200) {
            setScore(data)
        }
        let score1 = data?.runs?.filter((sor) => { if (sor.team_id === data.localteam_id) { return sor } })
        let score2 = data?.runs?.filter((sor) => { if (data.visitorteam_id === sor.team_id) { return sor } })
        let LooserTeam = "";
        let WinnerTeam = "";
        let WinnerTeamBalls = [];
        let LooserTeamBalls = [];

        if (data.winnerteam.id === data.localteam_id) {
            WinnerTeam = data.localteam
            LooserTeam = data.visitorteam;
        }
        else {
            WinnerTeam = data.visitorteam
            LooserTeam = data.localteam;
        }
        let WinnerTeamLineUp = data.lineup.filter((Wteam) => {
            if (data.winnerteam.id === Wteam.lineup.team_id) {
                return Wteam;
            }
        });
        let LooserTeamLineUp = data.lineup.filter((Lteam) => {
            if (data.winnerteam.id !== Lteam.lineup.team_id) {
                return Lteam;
            }
        });
        let WinnerTeamRun = data.runs.filter((run) => {
            if (data.winnerteam.id === run.team_id) {
                return run
            }
        });
        let LooserTeamRun = data.runs.filter((run) => {
            if (data.winnerteam.id !== run.team_id) {
                return run
            }
        });
        let WinnerTeamExtras = data.scoreboards.filter((extra) => {
            if (data.winnerteam.id === extra.team_id && extra.type === "extra") {
                return extra
            }
        });
        let LooserTeamExtras = data.scoreboards.filter((extra) => {
            if (data.winnerteam.id !== extra.team_id && extra.type === "extra") {
                return extra
            }
        });
        let LooserTeamBowler = data.bowling.filter((bowler) => {
            if (data.winnerteam.id !== bowler.team_id) {
                return bowler;
            }
        })
        let WinnerTeamBowler = data.bowling.filter((bowler) => {
            if (data.winnerteam.id === bowler.team_id) {
                return bowler;
            }
        });
        let TeamBalls = data.balls.filter((ball) => {
            if (data.winnerteam.id === ball.team_id) {
                WinnerTeamBalls.push(ball);
            } else {
                LooserTeamBalls.push(ball);
            }
        })
        let WinnerTeamBatting = [];
        let array = data.batting.filter((team) => {
            if (data.winnerteam.id === team.team_id) {
                WinnerTeamBatting.push(team);
            }
        })
        let LooserTeamBatting = data.batting.filter((team) => {
            if (data.winnerteam.id !== team.team_id) {
                return team;
            }
        })

        const localScore = score1;
        const visitorScore = score2;
        setLooserTeam(LooserTeam);
        setWinnerTeam(WinnerTeam);
        setLocalTeamID(localScore)
        setVisitorTeamID(visitorScore)
        setLooserTeamLineUp(LooserTeamLineUp)
        setWinnerTeamLineUp(WinnerTeamLineUp)
        setWinnerTeamRun(WinnerTeamRun)
        setLooserTeamRun(LooserTeamRun)
        setLooserTeamExtras(LooserTeamExtras)
        setWinnerTeamExtras(WinnerTeamExtras);
        setLooserTeamBowler(LooserTeamBowler);
        serWinnerTeamBowler(WinnerTeamBowler)
        setWinnerTeamBalls(WinnerTeamBalls);
        setLooserTeamBalls(LooserTeamBalls);
        setWinnerTeamBatting(WinnerTeamBatting);
        setLooserTeamBatting(LooserTeamBatting);

    }


    useEffect(() => {
        fetchScore();
    }, [])


    return (
        <>{(score && localTeamID && visitorTeamID ) ?
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
                            <div className='w-[100%] mt-[100px] h-[200px] flex justify-center items-center'>
                            <TailSpin color="blue" height={100} width={100} />
                        </div>
            }
        </>
    )
}

export default ScoreBoard
