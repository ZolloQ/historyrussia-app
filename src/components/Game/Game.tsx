import { useState } from 'react';
import Button from '../Button/Button.tsx'
import styles from './Game.module.scss';

interface quizResponce{
	question: string;
	correct: number;
	answers: string;
}

function Game({ question, onClickVariant, step, totalQuestions }: {
	question: quizResponce;
	onClickVariant: (index: number) => void;
	step: number;
	totalQuestions: number;
}) {
	const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
	const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
	
	const handleVariantClick = (index: number) => {
		if (selectedVariant === null) {
			setSelectedVariant(index);
			if (index !== question.correct) {
				setCorrectAnswer(question.correct);
			}
		}
	};
	
	const handleNextQuestion = () => {
		if (selectedVariant !== null) {
			onClickVariant(selectedVariant);
			setSelectedVariant(null);
			setCorrectAnswer(null);
		}
	};
	
	return (
		<div className={styles['quiz']}>
			<div className={styles['progress']}>
				<div style={{ width: `${Math.round((step * 100) / totalQuestions)}%` }} className={styles['progress__inner']}></div>
				<div className={styles['progress__label']}>{step + 1} из {totalQuestions}</div>
			</div>
			
			<h1>{question.question}</h1>
			<ul>
				{ /* @ts-ignore */ }
				{JSON.parse(question.answers).map((text, index) => (
					<li
						key={index}
						onClick={() => handleVariantClick(index)}
						className={`
              ${styles['variant']}
              ${selectedVariant === index ? (index === question.correct ? styles['correct'] : styles['incorrect']) : ''}
              ${correctAnswer !== null && correctAnswer === index ? styles['correct'] : ''}
            `}
					>
						{text}
					</li>
				))}
			</ul>
			
			{selectedVariant !== null && (
				<Button onClick={handleNextQuestion} appearence={'big'} className={styles['button']}>Следующий вопрос</Button>
			)}
		</div>
	);
}

export default Game;