"use client"
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducers"

// const persistConfig = {
//     key: "auth",
//     storage: storage,
//     version: 1,
//     whitelist: ["auth"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: rootReducer,
})


export { store }