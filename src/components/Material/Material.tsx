import styles from './Material.module.scss';
import { ChapterProps } from './Material.props.ts';

function Material(props: { chapters?: ChapterProps[] }) {
	if (!props.chapters || props.chapters.length === 0) {
		return null; // Ранний выход, если chapters не определено или пусто
	}
	
	return (
		<div>
			{props.chapters.map((chapter, index) => (
				<article key={index}>
					<h2 className={styles['material__subtitle']}>{chapter.subtitle}</h2>
					<div className={styles['material__text']}>{chapter.text}</div>
					<div className={styles['material__wrapper']}>
						{chapter.image && (
								<img src={chapter.image} className={styles['material__image']} />
						)}
					</div>
				</article>
			))}
		</div>
	);
}

export default Material;
