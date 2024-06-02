import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button.tsx';
import styles from "./Result.module.scss";
import { usePostSaveResultMutation } from '../../redux/api/api.ts';

function Result({ correct, totalQuestions }: { correct: number; totalQuestions: number }) {
	const navigate = useNavigate();
	const [postSaveResult] = usePostSaveResultMutation();
	
	const percentage = (correct / totalQuestions) * 100;
	
	let estimation = '';
	if (percentage >= 90) {
		estimation = 'Отлично';
	} else if (percentage >= 80) {
		estimation = 'Хорошо';
	} else if (percentage >= 70) {
		estimation = 'Удовлетворительно';
	} else {
		estimation = 'Неудовлетворительно';
	}
	
	const handleTryAgain = () => {
		window.location.reload();
	};
	
	const handleMain = () => {
		navigate('/');
	}
	
	useEffect(() => {
		const saveQuizResult = async () => {
			try {
				const response = await postSaveResult({
					uname: '',
					result: correct,
					totalQuestions: totalQuestions,
					estimation: estimation,
					percentage: percentage.toFixed(2)
				}).unwrap();
				
				console.log('Результаты викторины сохранены:', response);
			} catch (error) {
				console.error('Ошибка сохранения результатов викторины:', error);
			}
		};
		
		saveQuizResult();
	}, [correct, totalQuestions, estimation, percentage, postSaveResult]);
	
	return (
		<div className={styles['quiz']}>
			<div className={styles['result']}>
				<h2>Вы ответили правильно на {correct} из {totalQuestions} вопросов ({percentage.toFixed(2)}%)</h2>
				<p>Ваша оценка: {estimation}</p>
				<Button appearence={'small'} onClick={handleTryAgain}>Попробовать еще раз</Button>
				<Button appearence={'small'} onClick={handleMain}>Вернуться на главную страницу</Button>
			</div>
		</div>
	);
}

export default Result;
