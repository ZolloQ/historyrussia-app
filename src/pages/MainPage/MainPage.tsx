import Card from '../../components/Card/Card.tsx'
import Hero from '../../components/Hero/Hero.tsx'
import MainLayout from '../../layout/Main/Layout.tsx'
import styles from './MainPage.module.css'


const MainPage = () => {
	return <>
		<MainLayout>
			<><Hero/></>
			<div className={styles['container']}>
				<Card
					id={1}
					name={"История России"}
					class={"8 класс"}
					image={"Led-min.jpg"} />
			</div>
		</MainLayout>
	</>
}

export default MainPage;