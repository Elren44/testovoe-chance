import { configureStore } from '@reduxjs/toolkit'
import appSlice from "./slices/app.js";


export const store = configureStore({
    reducer: {
        app: appSlice
    },
})
