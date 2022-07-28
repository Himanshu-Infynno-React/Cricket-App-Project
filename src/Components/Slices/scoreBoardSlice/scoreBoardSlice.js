import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_token2, base_url } from "../../Constants/Constants";



const initialState = {
    isLoading: false,
    score: [],
    localTeamID: null,
    visitorTeamID: null,
    winnerTeam: null,
    looserTeam: null,
    winnerTeamLineUp: null,
    looserTeamLineUp: null,
    winnerTeamRun: null,
    looserTeamRun: null,
    looserteamExtras: null,
    winnerteamExtras: null,
    looserTeamBowler: null,
    winnerTeamBowler: null,
    winnerTeamBalls: null,
    looserTeamBalls: null,
    winnerTeamBatting: null,
    looserTeamBatting: null,
    isSuccess: false,
    message: "",
}



export const fetchMatches = createAsyncThunk('scoreBoard/fetch', (id) => {
    const url = `${base_url}fixtures/${id}?api_token=${api_token2}&include=localteam,visitorteam,scoreboards,bowling,batting,balls,runs,winnerteam,lineup,balls.batsmanout,batting.batsman,bowling.bowler,batting.bowler,batting.catchstump`
    try {
        const data = axios.get(url);
        return data;
    } catch (error) {

    }
});


const scoreBoardSlice = createSlice({
    name: "scoreBoard",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(
                fetchMatches.pending, (state, action) => {
                    state.isLoading = true;
                }
            )
            .addCase(
                fetchMatches.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.message = "false";
                    state.score = action.payload.data.data
                    state.winnerTeamRun = state.score.runs.filter((run) => {
                        if (state.score.winnerteam.id === run.team_id) {
                            return run
                        }
                    });
                    state.looserTeamRun = state.score.runs.filter((run) => {
                        if (state.score.winnerteam.id !== run.team_id) {
                            return run
                        }
                    });
                    state.localTeamID = state.score?.runs?.filter((sor) => { if (sor.team_id === state.score.localteam_id) { return sor } })
                    state.visitorTeamID = state.score?.runs?.filter((sor) => { if (state.score.visitorteam_id === sor.team_id) { return sor } })
                    let WinnerTeamBalls = [];
                    let LooserTeamBalls = [];
                    if (state.score.winnerteam.id === state.score.localteam_id) {
                        state.winnerTeam = state.score.localteam
                        state.looserTeam = state.score.visitorteam;
                    }
                    else {
                        state.winnerTeam = state.score.visitorteam
                        state.looserTeam = state.score.localteam;
                    }
                    state.winnerTeamLineUp = state.score.lineup.filter((Wteam) => {
                        if (state.score.winnerteam.id === Wteam.lineup.team_id) {
                            return Wteam;
                        }
                    });
                    state.looserTeamLineUp = state.score.lineup.filter((Lteam) => {
                        if (state.score.winnerteam.id !== Lteam.lineup.team_id) {
                            return Lteam;
                        }
                    });
                    state.winnerTeamRun = state.score.runs.filter((run) => {
                        if (state.score.winnerteam.id === run.team_id) {
                            return run
                        }
                    });
                    state.looserTeamRun = state.score.runs.filter((run) => {
                        if (state.score.winnerteam.id !== run.team_id) {
                            return run
                        }
                    });
                    state.winnerteamExtras = state.score.scoreboards.filter((extra) => {
                        if (state.score.winnerteam.id === extra.team_id && extra.type === "extra") {
                            return extra
                        }
                    });
                    state.looserteamExtras = state.score.scoreboards.filter((extra) => {
                        if (state.score.winnerteam.id !== extra.team_id && extra.type === "extra") {
                            return extra
                        }
                    });
                    state.looserTeamBowler = state.score.bowling.filter((bowler) => {
                        if (state.score.winnerteam.id !== bowler.team_id) {
                            return bowler;
                        }
                    })
                    state.winnerTeamBowler = state.score.bowling.filter((bowler) => {
                        if (state.score.winnerteam.id === bowler.team_id) {
                            return bowler;
                        }
                    });
                    let TeamBalls = state.score.balls.filter((ball) => {
                        if (state.score.winnerteam.id === ball.team_id) {
                            WinnerTeamBalls.push(ball);
                        } else {
                            LooserTeamBalls.push(ball);
                        }
                    })
                    state.looserTeamBalls = LooserTeamBalls
                    state.winnerTeamBalls = WinnerTeamBalls  
                    state.winnerTeamBatting = state.score.batting.filter((team) => {
                        if (state.score.winnerteam.id === team.team_id) {
                            return team
                        }
                    })
                    state.looserTeamBatting = state.score.batting.filter((team) => {
                        if (state.score.winnerteam.id !== team.team_id) {
                            return team;
                        }
                    })
                    state.isSuccess = true;
                }
            )
            .addCase(
                fetchMatches.rejected, (state, action) => {
                    state.isLoading = false;
                    state.message = action.payload;
                    state.isSuccess = false;
                }
            )
    }
});


export default scoreBoardSlice.reducer;

