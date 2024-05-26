import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import styles from './Card.module.css';
import type { CardProps } from './Card.props';

const Card: React.FC<CardProps> = (props) => {
	const navigate = useNavigate();
	
	const handleDeleteCard = async () => {
		const result = await Swal.fire({
			title: 'Вы уверены?',
			text: "Это действие нельзя будет отменить!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Да, удалить!',
			cancelButtonText: 'Нет, отменить!',
		});
		
		if (result.isConfirmed) {
			try {
				await axios.delete(`http://localhost:80/cards/${props.id}`);
				await axios.delete(`http://localhost:80/materials/${props.id}`);
				await axios.delete(`http://localhost:80/quiz/${props.id}`);
				Swal.fire('Удалено!', 'Карточка была удалена.', 'success');
				navigate('/');
			} catch (error) {
				Swal.fire('Ошибка!', 'Произошла ошибка при удалении карточки.', 'error');
				console.error('Error deleting data:', error);
			}
		}
	};
	
	return (
		<div className={styles['card-container']}>
			<div className={styles['card']}>
				<button className={styles['delete-button']} onClick={handleDeleteCard}>✖</button>
				<Link to={`/card/${props.id}`} className={styles['link']}>
					<div className={styles['head']} style={{ backgroundImage: `url('${props.picture}')` }}>
						<div className={styles['class']}>
							{props.grade}&nbsp;
						</div>
					</div>
					<div className={styles['footer']}>
						<div className={styles['title']}>{props.name}</div>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Card;
