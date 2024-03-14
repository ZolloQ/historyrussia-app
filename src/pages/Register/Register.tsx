import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button.tsx';
import Input from '../../components/Input/Input.tsx';
import styles from '../Login/Login.module.css';

const Register: React.FC = () => {
	const [role, setRole] = useState<string>('');
	const [error, setError] = useState<string>('');
	
	const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRole(event.target.value);
		setError('');
	};
	
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		
		if (!role) {
			setError('Пожалуйста, выберите вашу роль.');
			return;
		}
	};
	
	return (
		<div className={styles['auth']}>
			<div className={styles['login']}>
				<h1>Регистрация</h1>
				<form className={styles['form']} onSubmit={handleSubmit}>
					<div className={styles['field']}>
						<label htmlFor="name">Ваше имя</label>
						<Input id="name" name="name" type="text" placeholder="Имя" />
					</div>
					<div className={styles['field']}>
						<label htmlFor="email">Ваш e-mail</label>
						<Input id="email" name="email" type="email" placeholder="email" />
					</div>
					<div className={styles['field']}>
						<label htmlFor="password">Ваш пароль</label>
						<Input id="password" name="password" type="password" placeholder="Пароль" />
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
					<Button appearence="big" className={styles['button']}>
						Зарегистрироваться
					</Button>
				</form>
				<div className={styles['links']}>
					<div>Уже есть аккаунт?</div>
					<Link to="/auth/login">Войти</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
