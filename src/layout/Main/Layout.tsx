import type { PropsWithChildren } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './Layout.module.scss';
export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<div className={styles.layout}>
			<Header/>
			<main className={styles.content}>{children}</main>
			<Footer />
		</div>
	);
}
