import styles from './Header.module.scss'

const Header = () => {
	
	return (
		<header className={styles['header']}>
			<img src='/logo.png' alt='logo' className={styles['header__logo']} />
			<a href='/' className={styles['header__auth']}>Войти</a>
		</header>
	);
}

export default Header