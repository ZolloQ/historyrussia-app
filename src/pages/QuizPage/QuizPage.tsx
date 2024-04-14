import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import localCards from './localCards/localCards.ts'
import styles from "./QuizPage.module.scss";
import Game from '../../components/Game/Game.tsx'
import Result from '../../components/Result/Result.tsx'
import type { Card } from '../../interfaces/Quiz.interfaces.ts'


function QuizPage() {
	const { id } = useParams<{ id: string }>();
	const [step, setStep] = useState(0);
	const [corrects, setCorrect] = useState(0);
	const [card, setCard] = useState<Card | null>(null);
	
	useEffect(() => {
		if (id !== undefined) {
			const cardData = localCards[id];
			if (cardData) {
				setCard(cardData);
			}
		}
	}, [id, localCards]);
	
	const onClickVariant = (index: number) => {
		const question = card?.quiz[step];
		if (question) {
			if (index === question.correct) {
				setCorrect(corrects + 1);
			}
			setStep(step + 1);
		}
	};
	
	if (!card) return <div>Loading...</div>;
	
	const questions = card.quiz;
	const question = questions[step];
	
	return (
		<div className={styles['quiz-page']}>
			<div className={styles['quiz']}>
				{step !== questions.length ? (
					<Game step={step} question={question} onClickVariant={onClickVariant} totalQuestions={questions.length} />
				) : (
					<Result correct={corrects} totalQuestions={questions.length} />
				)}
			</div>
		</div>
	);
}

export default QuizPage;