import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { type AxiosError } from 'axios'
import Button from '../../components/Button/Button.tsx';
import Input from '../../components/Input/Input.tsx';
import styles from '../Login/Login.module.css';

const Register: React.FC = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		role: ''
	});
	const [error, setError] = useState<string>('');
	
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}));
		setError('');
	};
	
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		
		try {
			const response = await axios.post('http://localhost/signup', formData);
			console.log(response.data);
			window.location.href = '/auth';
		} catch (error) {
			handleRequestError(error as Error | AxiosError);
		}
	};
	
	const handleRequestError = (error: Error | AxiosError) => {
		if (axios.isAxiosError(error) && error.response) {
			console.error('Ошибка регистрации:', error.response.data.message);
			setError('Ошибка регистрации. Пожалуйста, попробуйте еще раз.');
		} else {
			console.error('Ошибка регистрации:', error);
			setError('Произошла ошибка регистрации. Пожалуйста, попробуйте еще раз.');
		}
	};
	
	return (
		<div className={styles['auth']}>
			<div className={styles['login']}>
				<h1>Регистрация</h1>
				<form className={styles['form']} onSubmit={handleSubmit}>
					<div className={styles['field']}>
						<label htmlFor="name">Ваше имя</label>
						<Input id="name" name="name" type="text" placeholder="Имя" value={formData.name} onChange={handleChange} />
					</div>
					<div className={styles['field']}>
						<label htmlFor="email">Ваш e-mail</label>
						<Input id="email" name="email" type="email" placeholder="email" value={formData.email} onChange={handleChange} />
					</div>
					<div className={styles['field']}>
						<label htmlFor="password">Ваш пароль</label>
						<Input id="password" name="password" type="password" placeholder="Пароль" value={formData.password} onChange={handleChange} />
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
									checked={formData.role === 'teacher'}
									onChange={handleChange}
								/>
								<label htmlFor="teacher">Учитель</label>
							</div>
							<div className={styles['role-option']}>
								<input
									type="radio"
									id="student"
									name="role"
									value="student"
									checked={formData.role === 'student'}
									onChange={handleChange}
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
