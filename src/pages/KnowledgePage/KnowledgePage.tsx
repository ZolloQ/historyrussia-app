import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button/Button.tsx';
import Material from '../../components/Material/Material';
import MainLayout from '../../layout/Main/Layout';
import styles from './KnowledgePage.module.scss';
import { MaterialProps } from '../../components/Material/Material.props'; // Импорт интерфейса MaterialProps

const KnowledgePage = () => {
	const [showScrollButton, setShowScrollButton] = useState(false);
	const [material, setMaterial] = useState<MaterialProps | null>(null);
	
	useEffect(() => {
		const handleScroll = () => {
			if (window.pageYOffset > 100) {
				setShowScrollButton(true);
			} else {
				setShowScrollButton(false);
			}
		};
		
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	
	const scrollUpRef = useRef<HTMLDivElement>(null);
	
	const handleScrollUp = () => {
		if (scrollUpRef.current) {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}
	};
	
	const { id } = useParams<{ id: string }>();
	
	useEffect(() => {
		const axiosMaterialData = async () => {
			try {
				const response = await axios.get(`/materials/${id}`);
				setMaterial(response.data);
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error);
			}
		};
		
		axiosMaterialData();
	}, [id]);
	
	const quizNav = useNavigate();
	const handleQuiz = () => {
		if (material) {
			quizNav(`/card/${material.id}/quiz`);
		}
	};
	
	if (!material) {
		return <div>Загрузка...</div>;
	}
	
	return (
		<MainLayout>
			<div className={styles['KnowledgePage__container']}>
				<h1 className={styles['KnowledgePage__title']}>{material.title}</h1>
				<Material chapters={material.chapters} />
				<Button onClick={handleQuiz} appearence={'big'} className={styles['KnowledgePage__button']}>
					Перейти к викторине
				</Button>
			</div>
			{showScrollButton && (
				<div ref={scrollUpRef} className={styles['scrollUp']} onClick={handleScrollUp}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M12 8l-6 6h12z" />
					</svg>
				</div>
			)}
		</MainLayout>
	);
};

export default KnowledgePage;
