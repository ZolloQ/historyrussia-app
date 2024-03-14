import styles from "./Result.module.scss";

function Result({ correct, totalQuestions }: { correct: number; totalQuestions: number }) {
	const handleTryAgain = () => {
		window.location.reload();
	};
	
	return (<div className={styles['quiz']}>
	
		<div className={styles['result']}>
			<img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt="result icon" />
			<h2>Вы ответили на {correct} из {totalQuestions} вопросов</h2>
			<button onClick={handleTryAgain}>Try Again</button>
		</div>
		</div>
		);
}

export default Result;
