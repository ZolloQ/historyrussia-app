import ImageSlider from '../ImageSlider/ImageSlider';
import styles from './Material.module.scss';
import { ChapterProps } from './Material.props';

function Material(props: { chapters?: ChapterProps[] }) {
	if (!props.chapters || props.chapters.length === 0) {
		return null;
	}
	
	return (
		<div>
			{props.chapters.map((chapter, index) => (
				<article key={index}>
					<h2 className={styles['material__subtitle']}>{chapter.subtitle}</h2>
					<div className={styles['material__text']}>{chapter.text}</div>
					{chapter.images && chapter.images.length > 0 && (
						<ImageSlider images={chapter.images.map(image => image.src)} />
					)}
				</article>
			))}
		</div>
	);
}

export default Material;