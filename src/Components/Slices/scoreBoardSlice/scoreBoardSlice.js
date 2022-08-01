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
        cleanData: (state) => {
            state.score = [];
            state.localTeamID = null;
            state.visitorTeamID = null;
            state.winnerTeam = null;
            state.looserTeam = null;
            state.winnerTeamBalls = null;
            state.looserTeamBalls = null;
            state.winnerTeamBatting = null;
            state.looserTeamBatting = null;
            state.winnerTeamRun = null;
            state.looserTeamRun = null;
            state.winnerteamExtras = null;
            state.looserteamExtras = null;
            state.winnerTeamBowler = null;
            state.looserTeamBowler = null;
            state.winnerTeamLineUp = null;
            state.looserTeamLineUp = null;
        }
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
                        return state.score.winnerteam.id === run.team_id
                    });
                    state.looserTeamRun = state.score.runs.filter((run) => {
                        return state.score.winnerteam.id !== run.team_id

                    });
                    state.localTeamID = state.score?.runs?.filter((sor) => { return sor.team_id === state.score.localteam_id })
                    state.visitorTeamID = state.score?.runs?.filter((sor) => { return state.score.visitorteam_id === sor.team_id })
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
                        return state.score.winnerteam.id === Wteam.lineup.team_id
                    });
                    state.looserTeamLineUp = state.score.lineup.filter((Lteam) => {
                        return state.score.winnerteam.id !== Lteam.lineup.team_id
                    });
                    state.winnerTeamRun = state.score.runs.filter((run) => {
                        return state.score.winnerteam.id === run.team_id
                    });
                    state.looserTeamRun = state.score.runs.filter((run) => {
                        return state.score.winnerteam.id !== run.team_id
                    });
                    state.winnerteamExtras = state.score.scoreboards.filter((extra) => {
                        return state.score.winnerteam.id === extra.team_id && extra.type === "extra"
                    });
                    state.looserteamExtras = state.score.scoreboards.filter((extra) => {
                        return state.score.winnerteam.id !== extra.team_id && extra.type === "extra"
                    });
                    state.looserTeamBowler = state.score.bowling.filter((bowler) => {
                        return state.score.winnerteam.id !== bowler.team_id
                    })
                    state.winnerTeamBowler = state.score.bowling.filter((bowler) => {
                        return state.score.winnerteam.id === bowler.team_id
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
                        return state.score.winnerteam.id === team.team_id
                    })
                    state.looserTeamBatting = state.score.batting.filter((team) => {
                        return state.score.winnerteam.id !== team.team_id
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

export const { cleanData } = scoreBoardSlice.actions
export default scoreBoardSlice.reducer;

