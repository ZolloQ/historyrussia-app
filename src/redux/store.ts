import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthReducer.ts'

// Создаем хранилище Redux
const store = configureStore({
	reducer: {
		auth: authReducer, // Подключаем редуктор авторизации
		// Другие редукторы могут быть добавлены здесь
	},
});

export default store;
