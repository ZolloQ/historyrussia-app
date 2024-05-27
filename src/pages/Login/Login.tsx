import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useGetAuthorizationMutation } from '../../redux/api/api';
import { authActions } from '../../redux/slice/Auth.ts';
import styles from '../Login/Login.module.css';

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loginError, setLoginError] = useState<boolean>(false);
	const [getAuthing] = useGetAuthorizationMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	useEffect(() => {
		const token = document.cookie.replace(
			/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
			'$1'
		);
		if (token) {
			// Если токен найден в куки, перенаправляем пользователя на главную страницу
			navigate('/');
		}
	}, []);
	
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setLoginError(false); // Сбрасываем ошибку при изменении email
	};
	
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setLoginError(false); // Сбрасываем ошибку при изменении пароля
	};
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await getAuthing({ email, password });
			if ('data' in response && response.data.jwt) {
				document.cookie = `jwt=${response.data.jwt}; path=/`; // Сохраняем токен в куки
				dispatch(authActions.getAuth(response.data));
				navigate('/');
			} else {
				console.error('Неправильные учетные данные');
				setLoginError(true); // Устанавливаем состояние ошибки, если нет токена в ответе
			}
		} catch (error) {
			console.error('Ошибка входа:', error);
			setLoginError(true); // Устанавливаем состояние ошибки при возникновении ошибки запроса
		}
	};
	
	return (
		<div className={styles.auth}>
			<div className={styles.login}>
				<p style={{ color: 'red' }}>{loginError && 'Неправильные учетные данные'}</p>
				<h1>Вход</h1>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.field}>
						<label htmlFor="email">Ваш e-mail</label>
						<Input
							id="email"
							type="email"
							placeholder="email"
							value={email}
							onChange={handleEmailChange}
						/>
					</div>
					<div className={styles.field}>
						<label htmlFor="password">Ваш пароль</label>
						<Input
							id="password"
							type="password"
							placeholder="Пароль"
							value={password}
							onChange={handlePasswordChange}
						/>
					</div>
					<Button appearence="big" className={styles.button} type="submit">
						Войти
					</Button>
				</form>
				<div className={styles.links}>
					<div>Нет аккаунта?</div>
					<Link to="/auth/register">Зарегистрироваться</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;