import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDeleteCardMutation } from '../../redux/api/api.ts';
import Swal from 'sweetalert2';
import styles from './Card.module.scss';
import type { CardProps } from './Card.props';

const Card: React.FC<CardProps> = ({ id, name, grade, picture }) => {
	const [deleteCard] = useDeleteCardMutation();
	const isAuth = useSelector((state: { authlocal: { status: boolean } }) => state.authlocal.status);
	const userRole = useSelector((state: { authlocal: { role: string | null } }) => state.authlocal.role);
	
	const handleDeleteCard = async () => {
		try {
			const result = await Swal.fire({
				title: 'Вы уверены?',
				text: 'Вы действительно хотите удалить эту карточку?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Да, удалить!',
				cancelButtonText: 'Отмена'
			});
			
			if (result.isConfirmed) {
				const response = await deleteCard(id).unwrap();
				if (response.status) {
					Swal.fire('Удалено!', 'Карточка успешно удалена.', 'success');
				} else {
					Swal.fire('Ошибка!', 'Ошибка при удалении карточки.', 'error');
				}
			}
		}
		catch (error) {
			console.error('Ошибка при удалении карточки:', error);
		}
	};
	
	return (
		<div className={styles['card-wrapper']}>
			<div className={styles['card-container']}>
				<div className={styles['card']}>
					{isAuth && userRole === 'Admin' && (
						<button className={styles['delete-button']} onClick={handleDeleteCard}>✖</button>
					)}
					<Link to={`/card/${id}`} className={styles['link']}>
						<div className={styles['head']} style={{ backgroundImage: `url('../card/${id}/${picture}')` }}>
							<div className={styles['class']}>
								{grade} класс&nbsp;
							</div>
						</div>
						<div className={styles['footer']}>
							<div className={styles['title']}>{name}</div>
						</div>
					</Link>
				</div>
			</div>
			{isAuth && userRole === 'Admin' && (
				<Link to={`/card/${id}/result`} className={styles['results-link']}>Просмотреть результаты</Link>
			)}
		</div>
	);
};

export default Card;
