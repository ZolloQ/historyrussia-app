import { createSlice } from '@reduxjs/toolkit';

const AUTH_DATA = 'authData';

interface IAuth {
	status: boolean;
	role: string | null;
	token: string | null;
}

const storedAuthData = localStorage.getItem(AUTH_DATA);
const initialAuth = storedAuthData ? JSON.parse(storedAuthData) : { status: false, role: null, token: null };

const initialState: IAuth = {
	status: initialAuth.status,
	role: initialAuth.role,
	token: initialAuth.token,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		getAuth(state, action) {
			state.status = action.payload.status;
			state.role = action.payload.role;
			state.token = action.payload.token;
			localStorage.setItem(AUTH_DATA, JSON.stringify(state)); // Сохраняем всё состояние
		},
		logout(state) {
			state.status = false;
			state.role = null;
			state.token = null;
			localStorage.removeItem(AUTH_DATA); // Удаляем все данные из localStorage при выходе
		},
	},
});

export const authActions = authSlice.actions;
