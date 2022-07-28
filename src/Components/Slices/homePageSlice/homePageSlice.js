import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_token, base_url } from "../../Constants/Constants";


const initialState = {
    isLoading: false,
    fixtures: [],
    isSuccess: false,
    message: "",
}
export const fetchFixtures = createAsyncThunk('homePage/fetch', () => {
    const url = `${base_url}fixtures?api_token=${api_token}&include=localteam,visitorteam,runs,league,season`
    try {
        const data = axios.get(url);
        return data;
    } catch (error) {
        console.log(error)
    }
});



const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(
                fetchFixtures.pending, (state, action) => {
                    state.isLoading = true;
                }
            )
            .addCase(
                fetchFixtures.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.message = "false";
                    state.fixtures = action.payload.data.data;
                    state.isSuccess = true;
                }
            )
            .addCase(
                fetchFixtures.rejected, (state, action) => {
                    state.isLoading = false;
                    state.message = action.payload;
                    state.isSuccess = false;
                }
            )
    }
});


export default homePageSlice.reducer;

