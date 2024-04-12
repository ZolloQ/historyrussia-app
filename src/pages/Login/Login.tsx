import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button/Button.tsx';
import Input from '../../components/Input/Input.tsx';
import styles from './Login.module.scss';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	
	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		
		try {
			await axios.post('/auth', { email, password });
			// Если успешно аутентифицированы, перенаправьте пользователя на главную страницу
			navigate('/');
		} catch (error) {
			console.error('Ошибка входа:', error);
			setError('Ошибка входа. Проверьте правильность введенных данных.');
		}
	};
	
	return (
		<div className={styles['auth']}>
			<div className={styles['login']}>
				<h1>Вход</h1>
				<form className={styles['form']} onSubmit={handleSubmit}>
					<div className={styles['field']}>
						<label htmlFor="email">Ваш e-mail</label>
						<Input
							id="email"
							name='email'
							type="email"
							placeholder='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className={styles['field']}>
						<label htmlFor="password">Ваш пароль</label>
						<Input
							id="password"
							name='password'
							type="password"
							placeholder='Пароль'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{error && <div className={styles['error']}>{error}</div>}
					<Button appearence='big' className={styles['button']} type="submit"> Войти</Button>
				</form>
				<div className={styles['links']}>
					<div>Нет аккаунта?</div>
					<Link to='/auth/signUp'>Зарегистрироваться</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
