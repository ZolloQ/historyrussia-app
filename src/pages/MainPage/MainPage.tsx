import { useState, useEffect } from 'react';
import axios from 'axios';
import About from '../../components/About/About.tsx';
import type { CardProps } from '../../components/Card/Card.props.ts'
import Card from '../../components/Card/Card.tsx';
import Hero from '../../components/Hero/Hero.tsx';
import Search from '../../components/Search/Search.tsx';
import MainLayout from '../../layout/Main/Layout.tsx';
import styles from './MainPage.module.css';

const MainPage = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [cards, setCards] = useState<CardProps[]>([]);
	
	useEffect(() => {
		axios.get('/cards') // Отправка GET-запроса на сервер
			.then(response => {
				setCards(response.data);
			})
			.catch(error => {
				console.error('Error fetching data', error);
			});
	}, []);
	
	const filteredCards = Array.isArray(cards) ? cards.filter(card =>
		card.name.toLowerCase().includes(searchQuery.toLowerCase())
	) : [];
	
	return (
		<>
			<MainLayout>
				<Hero />
				<div className={styles['container']}>
					<About />
					<Search
						className={styles['search']}
						placeholder='Введите название темы'
						onChange={e => setSearchQuery(e.target.value)}
					/>
					<div className={styles['cardWrapper']} id='Main'>
						{filteredCards.map(card => (
							<Card
								key={card.id}
								id={card.id}
								name={card.name}
								grade={card.grade}
								picture={card.picture}
							/>
						))}
					</div>
				</div>
			</MainLayout>
		</>
	);
};

export default MainPage;
