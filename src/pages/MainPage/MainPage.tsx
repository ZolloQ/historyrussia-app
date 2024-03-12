import { useState } from 'react';
import Card from '../../components/Card/Card.tsx';
import Hero from '../../components/Hero/Hero.tsx';
import Search from '../../components/Search/Search.tsx';
import MainLayout from '../../layout/Main/Layout.tsx';
import styles from './MainPage.module.css';

const MainPage = () => {
	const [searchQuery, setSearchQuery] = useState('');
	
	const allCards = [
		{
			id: 1,
			name: "История России",
			class: "8 класс",
			image: "Led-min.jpg"
		},
		{
			id: 2,
			name: "Первая мировая война",
			class: "8 класс",
			image: "Led-min.jpg"
		},
		{
			id: 3,
			name: "Крещение Руси",
			class: "8 класс",
			image: "Led-min.jpg"
		},
		{
			id: 4,
			name: "Революция",
			class: "8 класс",
			image: "Led-min.jpg"
		},
		{
			id: 5,
			name: "СССР",
			class: "8 класс",
			image: "Led-min.jpg"
		},
		{
			id: 6,
			name: "Великая Отечественная война",
			class: "8 класс",
			image: "Led-min.jpg"
		},
		
	];
	
	const filteredCards = allCards.filter(card =>
		card.name.toLowerCase().includes(searchQuery.toLowerCase())
	);
	
	return (
		<>
			<MainLayout>
				<Hero />
				<div className={styles['container']}>
					<Search
						className={styles.search}
						placeholder='Введите название темы'
						onChange={e => setSearchQuery(e.target.value)}
					/>
					<div className={styles['cardWrapper']} id='Main'>
						{filteredCards.map(card => (
							<Card
								key={card.id}
								id={card.id}
								name={card.name}
								class={card.class}
								image={card.image}
							/>
						))}
					</div>
				</div>
			</MainLayout>
		</>
	);
};

export default MainPage;
