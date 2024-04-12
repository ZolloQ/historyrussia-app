// AuthReducer.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	isAuthenticated: boolean;
	userRole: string | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	userRole: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(state, action: PayloadAction<{ role: string }>) {
			state.isAuthenticated = true;
			state.userRole = action.payload.role;
		},
		logout(state) {
			state.isAuthenticated = false;
			state.userRole = null;
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
