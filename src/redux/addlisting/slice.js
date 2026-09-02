

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: "null",
    listingKind: "licensed",
};


const addListingApiSlice = createSlice({
    name: "addListingApiSlice",
    initialState,
    reducers: {
      setRole: (state, { payload }) => {
        state.role = payload;
      },
      setListingKind: (state, { payload }) => {
        state.listingKind = payload;
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

export const addListingApiSliceReducer = addListingApiSlice.reducer;

export const {
    setRole,
    setListingKind,
} = addListingApiSlice.actions;