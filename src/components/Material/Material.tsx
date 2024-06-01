import ImageSlider from '../ImageSlider/ImageSlider';
import styles from './Material.module.scss';
import type { ChapterProps } from './Material.props.ts'

function Material(props: { chapters: ChapterProps[] }) {
	if (!props.chapters || props.chapters.length === 0) {
		return null;
	}
	
	return (
		<div>
			{props.chapters.map((chapter, index) => (
				<article key={index}>
					<h2 className={styles['material__subtitle']}>{chapter.subtitle}</h2>
					<div
						className={styles['material__text']}
						dangerouslySetInnerHTML={{ __html: chapter.text }}
					></div>
					{/* Проверяем наличие файлов изображений */}
					{chapter.images && chapter.images.length > 0 && (
						<ImageSlider images={chapter.images.map(image => URL.createObjectURL(image))} />
					)}
				</article>
			))}
		</div>
	);
}

export default Material;
