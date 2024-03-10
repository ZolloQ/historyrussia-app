import { NavLink } from 'react-router-dom'
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
	return <div className={styles['error']}>
		<img src='/logo.png' className={styles['error__logo']} />
		<h1 className={styles['error__title']}>Ошибка</h1>
		<div className={styles['error__content']}>Пока мы ищем потерянную страницу, почему бы вам не просмотреть другие увлекательные главы нашего исторического путешествия</div>
		<NavLink className={styles['error__link']} to='/'>Вернуться на главную страницу</NavLink>
	</div>
}

export default ErrorPage