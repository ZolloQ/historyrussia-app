import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useLogoutMutation } from '../../redux/api/api.ts'; // Импортируем useLogoutMutation
import styles from './Header.module.scss';
import { authActions } from '../../redux/slice/Auth'; // Импортируем экшн logout

const Header = () => {
	const isAuth = useSelector((state: { authlocal: { status: boolean } }) => state.authlocal.status);
	const userRole = useSelector((state: { authlocal: { role: string | null } }) => state.authlocal.role);
	const dispatch = useDispatch();
	const [logout] = useLogoutMutation(); // Деструктурируем logout из useLogoutMutation
	
	const handleLogout = async () => {
		try {
			await logout(undefined); // Вызываем функцию logout из useLogoutMutation
			dispatch(authActions.logout()); // Диспатчим экшн logout для обновления состояния аутентификации
		} catch (error) {
			console.error('Ошибка выхода:', error);
		}
	};
	
	return (
		<header className={styles.header}>
			<NavLink to='/'>
				<img src='/logo.png' alt='logo' className={styles['header__logo']} />
			</NavLink>
			{isAuth && userRole === 'Admin' && (
				<NavLink to='/createCard' className={styles['header__action']}>
					Создать карточку
				</NavLink>
			)}
			{isAuth ? (
				<NavLink to='/' onClick={handleLogout} className={styles['header__auth']}>
					Выйти
				</NavLink>
			) : (
				<NavLink to='/auth' className={styles['header__auth']}>
					<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="5.18024" y="1" width="6.63833" height="8.41108" rx="3.31917" stroke="#fff" strokeWidth="2" />
						<path
							d="M1 15.4111C1 13.7543 2.34315 12.4111 4 12.4111H13.2795C14.9364 12.4111 16.2795 13.7543 16.2795 15.4111V16.3229C16.2795 16.8752 15.8318 17.3229 15.2795 17.3229H2C1.44772 17.3229 1 16.8752 1 16.3229V15.4111Z"
							stroke="#fff" strokeWidth="2" />
					</svg>
					Войти
				</NavLink>
			)}
		</header>
	);
};

export default Header;