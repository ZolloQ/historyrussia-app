import type { PropsWithChildren } from 'react'
import Footer from '../../components/Footer/Footer.tsx'
import Header from '../../components/Header/Header.tsx'
import styles from './Layout.module.scss'

export default function MainLayout({ children }: PropsWithChildren) {
	return <div>
		<div><Header/></div>
		{children}
		<Footer/>
	</div>
}
