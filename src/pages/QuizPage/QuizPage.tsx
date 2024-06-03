import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetQuizQuery } from '../../redux/api/api.ts'
import styles from "./QuizPage.module.scss";
import Game from '../../components/Game/Game.tsx'
import Result from'../../components/Result/Result.tsx';
import type { IQuiz, IQuestion } from '../../interfaces/Quiz.interfaces.ts';

const QuizPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [step, setStep] = useState<number>(0);
	const [corrects, setCorrect] = useState<number>(0);
	const [quizData, setQuizData] = useState<IQuiz | null>(null);
	const { data: cardData, isLoading, isError } = useGetQuizQuery(id);
	
	useEffect(() => {
		if (cardData) {
			setQuizData(cardData);
		}
	}, [cardData]);
	
	if (isLoading) {
		return <div>Loading...</div>;
	}
	
	if (isError || !quizData) {
		return <div>Error: Unable to load quiz data</div>;
	}
	
	const { quiz } = quizData;
	
	const onClickVariant = (index: number) => {
		const currentQuestion = quiz[step];
		if (currentQuestion) {
			if (index === currentQuestion.correct) {
				setCorrect(corrects + 1);
			}
			setStep(step + 1);
		}
	};
	
	const currentQuestion: IQuestion = quiz[step];
	
	// @ts-ignore
	return (
		<div className={styles['quiz-page']}>
			<div className={styles['quiz']}>
				{step !== quiz.length ? (
					<Game
						// @ts-ignore
						question={currentQuestion}
						onClickVariant={onClickVariant}
						step={step}
						totalQuestions={quiz.length}
					/>
				) : (
					<Result correct={corrects} totalQuestions={quiz.length} />
				)}
			</div>
		</div>
	);
};

export default QuizPage;