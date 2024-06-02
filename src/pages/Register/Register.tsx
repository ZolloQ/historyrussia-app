import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useGetRegistrationMutation } from '../../redux/api/api';
import styles from '../Login/Login.module.css';
import Swal from 'sweetalert2';

const Register: React.FC = () => {
	const [getReg] = useGetRegistrationMutation();
	const navigate = useNavigate();
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	
	const [formData, setFormData] = useState({
		uname: '',
		email: '',
		pasw: '',
		role: '',
	});
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await getReg(formData);
			if ('data' in response && response.data.status) {
				Swal.fire({
					icon: 'success',
					title: 'Успешная регистрация!',
					text: 'Вы успешно зарегистрировались!',
					timer: 2000, // автоматически закрыть через 2 секунды
					showConfirmButton: false, // не показывать кнопку "ОК"
				}).then(() => {
					navigate('/auth');
				});
			} else if ('error' in response) {
				setIsError(true);
				setErrorMessage('Данные пользователя уже существуют');
			}
		} catch (error) {
			console.error(error);
			setIsError(true);
			setErrorMessage('Произошла ошибка. Пожалуйста, попробуйте ещё раз.');
		}
	};
	
	return (
		<div className={styles.auth}>
			<div className={styles.login}>
				{isError && <p style={{ color: 'red' }}>{errorMessage}</p>}
				<h1>Регистрация</h1>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.field}>
						<label htmlFor="uname">Ваше имя</label>
						<Input
							id="uname"
							type="text"
							placeholder="Имя"
							name="uname"
							value={formData.uname}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.field}>
						<label htmlFor="email">Ваш e-mail</label>
						<Input
							id="email"
							type="email"
							placeholder="Email"
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.field}>
						<label htmlFor="pasw">Ваш пароль</label>
						<Input
							id="pasw"
							type="password"
							placeholder="Пароль"
							name="pasw"
							value={formData.pasw}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.field}>
						<label>Кто вы?</label>
						<div className={styles.role}>
							<div className={styles.roleOption}>
								<input
									type="radio"
									id="teacher"
									value="teacher"
									name="role"
									checked={formData.role === 'teacher'}
									onChange={handleChange}
								/>
								<label htmlFor="teacher">Учитель</label>
							</div>
							<div className={styles.roleOption}>
								<input
									type="radio"
									id="user"
									value="user"
									name="role"
									checked={formData.role === 'user'}
									onChange={handleChange}
								/>
								<label htmlFor="user">Ученик</label>
							</div>
						</div>
					</div>
					<Button appearence="big" className={styles.button} type="submit">
						Зарегистрироваться
					</Button>
				</form>
				<div className={styles.links}>
					<div>Уже есть аккаунт?</div>
					<Link to="/auth">Войти</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
