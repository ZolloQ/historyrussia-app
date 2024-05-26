import {configureStore} from "@reduxjs/toolkit";
import { apiSlice } from "./api/api";
import { authSlice } from "./slice/Auth";
import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		authlocal: authSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware)
})


setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;