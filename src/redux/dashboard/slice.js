import { createSlice } from "@reduxjs/toolkit";
import { getUserProfileAction } from "./action";

const initialState = {
    userProfileData: null,
    isLoading: false,
    error: null,
}

const dashboardSlice = createSlice({
    name: "dashboardSlice",
    initialState,
    reducers: {
        setUserData: (state, { payload }) => {
            console.log("payload", payload);
            state.userProfileData = payload;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setError: (state, { payload }) => {
            state.error = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfileAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserProfileAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.userData = payload;
            })
            .addCase(getUserProfileAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            
    },
});

export const dashboardSliceReducer = dashboardSlice.reducer;

export const {
    setUserData,
    setIsLoading,
    setError,
} = dashboardSlice.actions;