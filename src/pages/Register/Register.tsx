import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button.tsx'
import Input from '../../components/Input/Input.tsx'
import styles from '../Login/Login.module.css'

const Register = () => {
	return <div className={styles['auth']}>
		<div className={styles['login']}>
			<h1>Регистрация</h1>
			<form className={styles['form']}>
				<div className={styles['field']}>
					<label htmlFor="name">Ваше имя</label>
					<Input id="name" name='name' type="text" placeholder='Имя' />
				</div>
				<div className={styles['field']}>
					<label htmlFor="email">Ваш e-mail</label>
					<Input id="email" name='email' type="email" placeholder='email' />
				</div>
				<div className={styles['field']}>
					<label htmlFor="password">Ваш пароль</label>
					<Input id="password" name='password' type="password" placeholder='Пароль'  />
				</div>
				<div className={styles['field']}>
					<label htmlFor="role">Кто вы?</label>
					<div className={styles['role']}>
						<input type="radio" name="role" value="teacher" /> Учитель
						<input type="radio" name="role" value="student" /> Ученик
					</div>
				</div>
				<Button appearence='big' className={styles['button']}> Зарегистрироваться</Button>
			</form >
			<div className={styles['links']}>
				<div>Уже есть аккаунт?</div>
				<Link to='/auth/login'>Войти</Link>
			</div>
		</div>
	</div>
}

export default Register
