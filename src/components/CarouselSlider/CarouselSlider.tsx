import React, { useState, useEffect } from 'react';
import styles from './CarouselSlider.module.scss';

type Slide = {
	image: string;
	description: string;
};

const slides: Slide[] = [
	{ image: 'kreshhenie_rusi-min.jpg', description: 'Крещение Руси' },
	{ image: 'Led-min.jpg', description: 'Ледовое побоище' },
	{ image: 'vasnetsov_varyagi-min.jpg', description: 'Становление Руси' },
];

const CarouselSlider: React.FC = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
		}, 60000);
		
		return () => clearInterval(interval);
	}, []);
	
	return (
		<div className={styles['carousel']}>
			<div className={styles['slides']}>
				{slides.map((slide, index) => (
					<div
						key={index}
						className={`${styles['slide']} ${index === currentSlide ? styles['active'] : ''}`}
						style={{ transform: `translateX(-${currentSlide * 100}%)` }}
					>
						<img src={slide.image} alt={slide.description} />
						<p className={styles['description']}>{slide.description}</p>
					</div>
				))}
			</div>
			
		</div>
	);
};

export default CarouselSlider;
