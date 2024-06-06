import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Button/Button.tsx';
import styles from "./Result.module.scss";
import { usePostSaveResultMutation } from '../../redux/api/api.ts';

function Result({ correct, totalQuestions }: { correct: number; totalQuestions: number }) {
	const navigate = useNavigate();
	const { id } = useParams();
	const [postSaveResult] = usePostSaveResultMutation();
	
	const getEstimation = (correct: number, totalQuestions: number) => {
		const percentage = (correct / totalQuestions) * 100;
		if (percentage >= 90) {
			return 'Отлично';
		} else if (percentage >= 80) {
			return 'Хорошо';
		} else if (percentage >= 70) {
			return 'Удовлетворительно';
		} else {
			return 'Неудовлетворительно';
		}
	};
	
	const handleTryAgain = () => {
		navigate(`/card/${id}`);
	};
	
	const handleMain = () => {
		navigate('/');
	};
	
	useEffect(() => {
		const saveResult = async () => {
			try {
				const response = await postSaveResult({
					correct,
					estimation: getEstimation(correct, totalQuestions),
					percentage: ((correct / totalQuestions) * 100).toFixed(2),
					quiz: id,
				});
				console.log(response);
			} catch (error) {
				console.error('Ошибка при сохранении результатов теста:', error);
			}
		};
		
		saveResult();
	}, [correct, totalQuestions, postSaveResult, id]);
	
	return (
		<div className={styles['quiz']}>
			<div className={styles['result']}>
				<h2>Вы ответили правильно на {correct} из {totalQuestions} вопросов ({((correct / totalQuestions) * 100).toFixed(2)}%)</h2>
				<p>Ваша оценка: {getEstimation(correct, totalQuestions)}</p>
				<Button appearence={'small'} onClick={handleTryAgain}>Попробовать еще раз</Button>
				<Button appearence={'small'} onClick={handleMain}>Вернуться на главную страницу</Button>
			</div>
		</div>
	);
}

export default Result;
