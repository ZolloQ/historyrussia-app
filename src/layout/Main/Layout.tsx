import type { PropsWithChildren } from 'react'
import Footer from '../../components/Footer/Footer.tsx'
import Header from '../../components/Header/Header.tsx'

export default function MainLayout({ children }: PropsWithChildren) {
	return <div>
		<Header/>
		{children}
		<Footer/>
	</div>
}
