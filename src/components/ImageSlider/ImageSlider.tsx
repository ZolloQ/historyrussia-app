import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../Material/Material.module.scss';


interface ImageSliderProps {
	images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
	const { id } = useParams(); // Получаем id из URL
	
	const [currentSlide, setCurrentSlide] = useState(0);
	
	const imageUrl = `../card/${id}/${images[currentSlide]}`;
	console.log(imageUrl)
	
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
		return <img src={imageUrl} className={styles['material__image']} alt="Slide" />;
	}
	
	return (
		<div className={styles['material__image-slider']}>
			<button className={styles['material__prev-btn']} onClick={prevSlide}>&lt;</button>
			<img src={imageUrl} className={styles['material__image']} alt={`Slide ${currentSlide}`} />
			<button className={styles['material__next-btn']} onClick={nextSlide}>&gt;</button>
		</div>
	);
}

export default ImageSlider;