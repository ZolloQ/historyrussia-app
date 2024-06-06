import { useEffect, useState } from 'react';
import About from '../../components/About/About.tsx';
import type { CardProps } from '../../components/Card/Card.props.ts';
import Card from '../../components/Card/Card.tsx';
import Hero from '../../components/Hero/Hero.tsx';
import Search from '../../components/Search/Search.tsx';
import MainLayout from '../../layout/Main/Layout.tsx';
import { useGetListCardMutation } from '../../redux/api/api.ts'
import styles from './MainPage.module.css';

const MainPage = () => {
	const [cardsData, setCardsData] = useState<CardProps[]>([]);
	const [searchText, setSearchText] = useState<string>('');
	
	// Использование useGetListCardMutation для получения карточек
	const [getListCard] = useGetListCardMutation();
	
	useEffect(() => {
		getListCard({}).unwrap()
			.then((fetchedData) => {
				if (Array.isArray(fetchedData.data)) {
					setCardsData(fetchedData.data);
				} else {
					console.error('Invalid data format:', fetchedData);
				}
			})
			.catch((error) => {
				console.error('Failed to fetch cards:', error);
			});
	}, [getListCard]);
	
	// Фильтрация карточек на основе текста поиска
	const filteredCards = cardsData.filter(card =>
		card.name.toLowerCase().includes(searchText.toLowerCase())
	);
	
	return (
		<MainLayout>
			<Hero />
			<div className={styles['container']}>
				<About />
				<Search
					className={styles['search']}
					placeholder='Введите название темы'
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
				<div className={styles['cardWrapper']} id='Main'>
					{filteredCards.map(card => (
						<Card
							key={card.id} // Добавляем ключ для каждой карточки
							id={card.id}
							name={card.name}
							grade={card.grade}
							picture={card.picture}
						/>
					))}
				</div>
			</div>
		</MainLayout>
	);
};

export default MainPage;
