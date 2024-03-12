import { useParams } from 'react-router-dom'

const QuizPage = () => {
	const {id} = useParams();
	
	return <div>
		Айди этой страницы: {id}
	</div>
}

export default QuizPage