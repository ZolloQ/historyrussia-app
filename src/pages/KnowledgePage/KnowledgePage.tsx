import { Link, useParams } from 'react-router-dom'

const KnowledgePage = () => {
	const {id} = useParams();
	return <div>
		<h1>Карточка номер {id}</h1>
		<Link
			to={`/card/${id}/quiz`}
			onClick={() => console.log('Кликнули на ссылку для викторины')}
		>
			Перейти к викторине
		</Link>
	
	</div>
}

export default KnowledgePage