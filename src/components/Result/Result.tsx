import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button.tsx';
import styles from "./Result.module.scss";

function Result({ correct, totalQuestions }: { correct: number; totalQuestions: number }) {
	const navigate = useNavigate();
	const [quizCompleted, setQuizCompleted] = useState<boolean>(false); // Состояние для отслеживания завершения викторины
	
	const percentage = (correct / totalQuestions) * 100;
	
	let estimation = '';
	if (percentage >= 90) {
		estimation = 'Отлично';
	} else if (percentage >= 80) {
		estimation = 'Хорошо';
	} else if (percentage >= 70) {
		estimation = 'Удовлетворительно';
	} else if (percentage >= 60) {
		estimation = 'Неудовлетворительно';
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
		// Проверяем, была ли викторина уже пройдена
		const isFirstQuiz = localStorage.getItem('firstQuizCompleted') === null;
		
		// Если это первая викторина, отправляем результаты на сервер и устанавливаем соответствующее локальное состояние
		if (isFirstQuiz) {
			const saveQuizResult = async () => {
				try {
					const response = await axios.post('/UserResult', {
						email: '',
						result: correct,
						totalQuestions: totalQuestions,
						estimation: estimation
					});
					console.log('Результаты первой викторины сохранены:', response.data);
					
					// Устанавливаем локальное состояние, указывающее, что первая викторина завершена
					localStorage.setItem('firstQuizCompleted', 'true');
					setQuizCompleted(true);
				} catch (error) {
					console.error('Ошибка сохранения результатов первой викторины:', error);
				}
			};
			
			saveQuizResult();
		}
	}, [correct, totalQuestions, estimation]);
	
	return (
		<div className={styles['quiz']}>
			<div className={styles['result']}>
				<h2>Вы ответили правильно на {correct} из {totalQuestions} вопросов ({percentage.toFixed(2)}%)</h2>
				<p>Ваша оценка: {estimation}</p>
				{quizCompleted ? (
					<>
						<Button appearence={'small'} onClick={handleTryAgain}>Попробовать еще раз</Button>
						<Button appearence={'small'} onClick={handleMain}>Вернуться на главную страницу</Button>
					</>
				) : (
					<Button appearence={'small'} onClick={handleMain}>Вернуться на главную страницу</Button>
				)}
			</div>
		</div>
	);
}

export default Result;
