import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const IS_AUTH = 'isAuth';

interface IAuth {
	status: boolean;
	role: string | null;
	jwt?: string | null;
}

const storedAuth = localStorage.getItem(IS_AUTH);
const initialAuth = storedAuth ? JSON.parse(storedAuth) : false;

const initialState: IAuth = {
	status: initialAuth,
	role: null,
	jwt: null
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		getAuth(state, action: PayloadAction<IAuth>) {
			state.status = action.payload.status;
			state.role = action.payload.role;
			localStorage.setItem(IS_AUTH, JSON.stringify(state)); // Сохраняем всё состояние
		},
		logout(state) {
			state.status = false;
			state.role = null;
			localStorage.removeItem(IS_AUTH); // Удаляем все данные из localStorage при выходе
		},
	},
});

export const authActions = authSlice.actions;
