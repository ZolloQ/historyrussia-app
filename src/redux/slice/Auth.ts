import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const IS_AUTH = 'jwt';

interface IAuth {
	status: boolean;
	role: string | null;
	jwt?: string | null;
}

// Функция для получения данных аутентификации из куков
const getAuthFromCookies = (): IAuth | null => {
	const authCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith(IS_AUTH));
	if (authCookie) {
		const authString = authCookie.split('=')[1];
		return JSON.parse(decodeURIComponent(authString));
	}
	return null;
}

// Получаем начальное состояние из куков, если оно есть
const initialAuth = getAuthFromCookies();

const initialState: IAuth = {
	status: initialAuth ? initialAuth.status : false,
	role: initialAuth ? initialAuth.role : null,
	jwt: initialAuth ? initialAuth.jwt : null
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		getAuth(state, action: PayloadAction<IAuth>) {
			state.status = action.payload.status;
			state.role = action.payload.role;
			state.jwt = action.payload.jwt;
			// При получении новых данных аутентификации, сохраняем их в куки
			document.cookie = `${IS_AUTH}=${encodeURIComponent(JSON.stringify(action.payload))}; path=/`;
		},
		logout(state) {
			state.status = false;
			state.role = null;
			state.jwt = null;
			// При выходе пользователя, удаляем данные аутентификации из куков
			document.cookie = `${IS_AUTH}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
		},
	},
});

export const authActions = authSlice.actions;
