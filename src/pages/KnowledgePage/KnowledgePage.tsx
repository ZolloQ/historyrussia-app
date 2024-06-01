import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button.tsx';
import Material from '../../components/Material/Material';
import MainLayout from '../../layout/Main/Layout';
import { useGetMaterialQuery } from '../../redux/api/api.ts'
import styles from './KnowledgePage.module.scss';
import { MaterialProps } from '../../components/Material/Material.props'; // Импорт интерфейса MaterialProps

const KnowledgePage = () => {
	const [showScrollButton, setShowScrollButton] = useState(false);
	const [material, setMaterial] = useState<MaterialProps | null>(null);
	
	const { id } = useParams();
	
	// Используем хук для получения данных страницы
	const { data: materialData, isLoading, isError } = useGetMaterialQuery(id);
	
	// Обновляем состояние с данными страницы
	useEffect(() => {
		if (materialData) {
			setMaterial(materialData);
		}
	}, [materialData]);
	
	// Логика скролла и кнопки вверх
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
	
	// Функция для прокрутки наверх
	const scrollUpRef = useRef<HTMLDivElement>(null);
	const handleScrollUp = () => {
		if (scrollUpRef.current) {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}
	};
	
	// Переход к викторине
	const quizNav = useNavigate();
	const handleQuiz = () => {
		if (material) {
			quizNav(`/card/${id}/quiz`);
		}
	};
	
	// Отображение данных страницы
	if (isLoading) {
		return <div>Загрузка...</div>;
	}
	
	if (isError) {
		return <div>Ошибка при загрузке данных</div>;
	}
	
	if (!material) {
		return null;
	}
	
	return (
		<MainLayout>
			<div className={styles['KnowledgePage__container']}>
				<h1 className={styles['KnowledgePage__title']}>{material.title}</h1>
				<Material chapters ={material.chapters} />
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