import { useParams } from 'react-router-dom'

const KnowledgePage = () => {
	const { id }  = useParams()
	
	return <>
		card number: {id}
	</>
}

export default KnowledgePage