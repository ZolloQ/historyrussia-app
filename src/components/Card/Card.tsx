import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteCardMutation } from '../../redux/api/api.ts';
import styles from './Card.module.scss';
import type { CardProps } from './Card.props';

const Card: React.FC<CardProps> = ({ id, name, grade, picture,  }) => {
	const [deleteCard] = useDeleteCardMutation();
	
	const handleDeleteCard = async () => {
		try {
			const response = await deleteCard(id).unwrap();
			if (response.status) {
				console.log('Карточка успешно удалена');
			} else {
				console.error('Ошибка при удалении карточки');
			}
		} catch (error) {
			console.error('Ошибка при удалении карточки:', error);
		}
	};
	
	return (
		<div className={styles['card-container']}>
			<div className={styles['card']}>
				<button className={styles['delete-button']} onClick={handleDeleteCard}>✖</button>
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
	);
}

export default Card;
