import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthReducer.ts'

// Создаем хранилище Redux
const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});

export default store;
