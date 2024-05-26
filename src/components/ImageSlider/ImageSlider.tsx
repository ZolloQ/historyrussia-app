import { useState } from 'react';
import styles from '../Material/Material.module.scss';

interface ImageSliderProps {
	images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	
	const nextSlide = () => {
		setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
	};
	
	const prevSlide = () => {
		setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
	};
	
	if (images.length === 0) {
		return null;
	}
	
	if (images.length === 1) {
		return <img src={images[0]} className={styles['material__image']} alt="Slide" />;
	}
	
	return (
		<div className={styles['material__image-slider']}>
			<button className={styles['material__prev-btn']} onClick={prevSlide}>&lt;</button>
			<img src={images[currentSlide]} className={styles['material__image']} alt={`Slide ${currentSlide}`} />
			<button className={styles['material__next-btn']} onClick={nextSlide}>&gt;</button>
		</div>
	);
}

export default ImageSlider;
