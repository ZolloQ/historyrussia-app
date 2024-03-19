import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button.tsx'
import styles from "./Result.module.scss";

function Result({ correct, totalQuestions }: { correct: number; totalQuestions: number }) {
	const navigate = useNavigate();
	
	
	const percentage = (correct / totalQuestions) * 100;
	
	let grade = '';
	if (percentage >= 90) {
		grade = 'Отлично';
	} else if (percentage >= 80) {
		grade = 'Хорошо';
	} else if (percentage >= 70) {
		grade = 'Удовлетворительно';
	} else if (percentage >= 60) {
		grade = 'Неудовлетворительно';
	} else {
		grade = 'Неудовлетворительно';
	}
	
	const handleTryAgain = () => {
		window.location.reload();
	};
	const handleMain = () => {
		navigate('/');
	}
	
	return (
		<div className={styles['quiz']}>
			<div className={styles['result']}>
				<img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt="иконка результата" />
				<h2>Вы ответили правильно на {correct} из {totalQuestions} вопросов ({percentage.toFixed(2)}%)</h2>
				<p>Ваша оценка: {grade}</p>
				<Button appearence={'small'} onClick={handleTryAgain}>Попробовать еще раз</Button>
				<Button appearence={'small'} onClick={handleMain}>Вернуться на главную страницу</Button>
			</div>
		</div>
	);
}

export default Result;
