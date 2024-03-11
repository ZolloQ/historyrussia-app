import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button.tsx'
import Input from '../../components/Input/Input.tsx'
import styles from './Login.module.scss'

const Login = () => {
	return <div className={styles['login']}>
		<h1>Вход</h1>
		<form>
			<div>
				<label htmlFor="email">Ваш e-mail</label>'
				<Input id='email' />
			</div>
			<div>
				<label htmlFor="password">Ваш пароль</label>'
				<Input id='password' />
			</div>
			<Button appearence='big'> Войти</Button>
		</form>
		<div>
			<div>Нет аккаунта?</div>
			<Link to='/auth/register'>Зарегестрироваться</Link>
		</div>
	</div>
}

export default Login