import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    headerTabOptions: 0,
    addButtonPopUp:false,
    isLoading: false,
    error: null,
};

const headerApiSlice = createSlice({
    name: "headerApiSlice",
    initialState,
    reducers: {
        setHeaderTabOptions: (state, { payload }) => {
            state.headerTabOptions = payload;
        },
        setAddButtonPopUp: (state, { payload }) => {
            state.addButtonPopUp = payload;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setError: (state, { payload }) => {
            state.error = payload;
        },
    },
    // extraReducers: (builder) => {
    //   builder
    //     .addCase(getUserAction.pending, (state) => {
    //       state.isLoading = true;
    //     })
    //     .addCase(getUserAction.fulfilled, (state, action) => {
    //       state.userData = action.payload;
    //       state.getUserData = action.payload;
    //       state.isLoading = false;
    //       state.error = null;
    //       state.notificationType = action.payload?.data?.notificationType == 1 ? false : true
    //       state.allNotifications = action.payload?.data?.isAllNotificationsEnabled
    //       state.matchNotifications = action.payload?.data?.isMatchNotification
    //       state.likeNotifications = action.payload?.data?.isSuperLikesNotification
    //       // state.imageNotifications = action.payload?.data?.isImageStatusNotification

    //     })
    //     .addCase(getUserAction.rejected, (state, action) => {
    //       state.isLoading = false;
    //       state.error = action.error.message || "Error fetching user data";
    //     })

    // },
});

export const headerApiSliceReducer = headerApiSlice.reducer;

export const {
    setHeaderTabOptions,
    setAddButtonPopUp,
    setIsLoading,
    setError
} = headerApiSlice.actions;