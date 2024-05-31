import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.scss';
// import Swal from 'sweetalert2';
import type { CardProps } from './Card.props';

const Card: React.FC<CardProps> = ({ id, name, grade, picture }) => {
	
	const handleDeleteCard = async () => {
	
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
