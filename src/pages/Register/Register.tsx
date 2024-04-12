import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button/Button.tsx';
import Input from '../../components/Input/Input.tsx';
import styles from '../Login/Login.module.css';

const Register: React.FC = () => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [role, setRole] = useState<string>('');
	const [error, setError] = useState<string>('');
	
	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
		setError('');
	};
	
	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
		setError('');
	};
	
	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
		setError('');
	};
	
	const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRole(event.target.value);
		setError('');
	};
	
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		
		if (!name || !email || !password || !role) {
			setError('Пожалуйста, заполните все поля.');
			return;
		}
		
		try {
			const response = await axios.post('/api/signup', {
				name,
				email,
				password,
				role,
			});
			
			// Если регистрация успешна
			console.log(response.data); // Выводим данные, полученные с сервера
			// Перенаправляем пользователя на страницу входа
			window.location.href = '/auth/login';
		} catch (error: any) {
			console.error('Ошибка регистрации:', error.response.data.message);
			setError('Ошибка регистрации. Пожалуйста, попробуйте еще раз.');
		}
	};
	
	return (
		<div className={styles['auth']}>
			<div className={styles['login']}>
				<h1>Регистрация</h1>
				<form className={styles['form']} onSubmit={handleSubmit}>
					<div className={styles['field']}>
						<label htmlFor="name">Ваше имя</label>
						<Input id="name" name="name" type="text" placeholder="Имя" onChange={handleNameChange} />
					</div>
					<div className={styles['field']}>
						<label htmlFor="email">Ваш e-mail</label>
						<Input id="email" name="email" type="email" placeholder="email" onChange={handleEmailChange} />
					</div>
					<div className={styles['field']}>
						<label htmlFor="password">Ваш пароль</label>
						<Input id="password" name="password" type="password" placeholder="Пароль" onChange={handlePasswordChange} />
					</div>
					<div className={styles['field']}>
						<label>Кто вы?</label>
						<div className={styles['role']}>
							<div className={styles['role-option']}>
								<input
									type="radio"
									id="teacher"
									name="role"
									value="teacher"
									onChange={handleRoleChange}
								/>
								<label htmlFor="teacher">Учитель</label>
							</div>
							<div className={styles['role-option']}>
								<input
									type="radio"
									id="student"
									name="role"
									value="student"
									onChange={handleRoleChange}
								/>
								<label htmlFor="student">Ученик</label>
							</div>
						</div>
						{error && <div className={styles['error']}>{error}</div>}
					</div>
					<Button appearence="big" className={styles['button']} type="submit">
						Зарегистрироваться
					</Button>
				</form>
				<div className={styles['links']}>
					<div>Уже есть аккаунт?</div>
					<Link to="/auth">Войти</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
