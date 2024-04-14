import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import { CardProps } from './Card.props';

function Card(props: CardProps) {
	return (
		<Link to={`/card/${props.id}`} className={styles['link']}>
			<div className={styles['card']}>
				<div className={styles['head']} style={{ backgroundImage: `url('${props.picture}')` }}>
					<div className={styles['class']}>
						{props.grade}&nbsp;
					</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{props.name}</div>
				</div>
			</div>
		</Link>
	);
}

export default Card;