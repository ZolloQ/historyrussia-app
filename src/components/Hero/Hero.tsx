import { useEffect, useState } from 'react';
import styles from './Hero.module.scss';

type Slide = {
	image: string;
	description: string;
};

const slides: Slide[] = [
	{ image: 'kreshhenie_rusi-min.jpg', description: 'Крещение Руси' },
	{ image: 'Led-min.jpg', description: 'Ледовое побоище' },
	{ image: 'vasnetsov_varyagi-min.jpg', description: 'Становление Руси' },
];

const Hero: React.FC = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
		}, 5000);
		
		return () => clearInterval(interval);
	}, []);
	
	return (
		<section className={styles['hero']}>
			<div className={styles['hero__slides']}>
				{slides.map((slide, index) => (
					<div
						key={index}
						className={`${styles['hero__slides-slide']} ${index === currentSlide ? styles['active'] : ''}`}
						style={{ transform: `translateX(-${currentSlide * 100}%)` }}
					>
						<img src={slide.image} alt={slide.description} />
						<p className={styles['hero__description']}>{slide.description}</p>
					</div>
				))}
			</div>
			<div className={styles['hero__text']}>
				<h1 className={styles['hero__text-title']}>HistoRus</h1>
				<h2 className={styles['hero__text-subtitle']}>ваш проводник в увлекательном путешествии по истории России</h2>
				<a className={styles['hero__text-link']} href="#Main">
					<svg
						clipRule="evenodd"
						fillRule="evenodd"
						strokeLinejoin="round"
						strokeMiterlimit="2"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="m2.009 11.998c0-5.518 4.48-9.998 9.998-9.998s9.998 4.48 9.998 9.998c0 5.517-4.48 9.997-9.998 9.997s-9.998-4.48-9.998-9.997zm1.5 0c0 4.69 3.808 8.497 8.498 8.497s8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498-8.498 3.808-8.498 8.498zm4.716 1.528s1.505 1.501 3.259 3.254c.146.147.338.22.53.22s.384-.073.53-.22c1.754-1.752 3.258-3.254 3.258-3.254.145-.145.217-.335.217-.526 0-.192-.074-.384-.221-.53-.292-.293-.766-.295-1.057-.004l-1.977 1.977v-6.693c0-.414-.336-.75-.75-.75s-.75.336-.75.75v6.693l-1.979-1.978c-.289-.289-.761-.287-1.054.006-.147.147-.221.339-.222.53 0 .191.071.38.216.525z"
							fillRule="nonzero"
						/>
					</svg>
				</a>
			</div>
		</section>
	);
};

export default Hero;
