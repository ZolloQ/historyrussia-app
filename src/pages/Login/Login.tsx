import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button.tsx'
import Input from '../../components/Input/Input.tsx'
import styles from './Login.module.scss'

const Login = () => {
	return <div className={styles['auth']}>
	<div className={styles['login']}>
		<h1>Вход</h1>
		<form className={styles['form']}>
			<div className={styles['field']}>
				<label htmlFor="email">Ваш e-mail</label>
				<Input id="email" name='email' type="email" placeholder='email' />
			</div>
			<div className={styles['field']}>
				<label htmlFor="password">Ваш пароль</label>
				<Input id="password" name='password' type="password" placeholder='Пароль'  />
			</div>
			<Button appearence='big' className={styles['button']}> Войти</Button>
		</form >
		<div className={styles['links']}>
			<div>Нет аккаунта?</div>
			<Link to='/auth/register'>Зарегистрироваться</Link>
		</div>
	</div>
	</div>
}

export default Login