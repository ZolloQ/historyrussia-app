import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetQuizQuery } from '../../redux/api/api.ts';
import styles from "./QuizPage.module.scss";
import Game from '../../components/Game/Game.tsx';
import Result from '../../components/Result/Result.tsx';


const QuizPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [step, setStep] = useState<number>(0);
	const [corrects, setCorrect] = useState<number>(0);
	const { data: quizData, isLoading, isError } = useGetQuizQuery(id);
	
	useEffect(() => {
		if (quizData) {
			console.log("Quiz Data: ", quizData); // Добавим лог для проверки структуры данных
		}
	}, [quizData]);
	
	const onClickVariant = (index: number) => {
		if (quizData && quizData.quiz) {
			const currentQuestion = quizData.quiz;
			console.log("Current Question: ", currentQuestion); // Добавим лог для проверки структуры данных
			// @ts-ignore
			if (index === currentQuestion.correct) {
				setCorrect(corrects + 1);
			}
			setStep(step + 1);
		}
	};
	
	if (isLoading) {
		return <div>Loading...</div>;
	}
	
	if (isError || !quizData) {
		return <div>Error: Unable to load quiz data</div>;
	}
	
	const currentQuestion = quizData.quiz;
	
	return (
		<div className={styles['quiz-page']}>
			<div className={styles['quiz']}>
				{step === 0 ? (
					<Game
						// @ts-ignore
						question={currentQuestion}
						onClickVariant={onClickVariant}
						step={step}
						totalQuestions={1}
					/>
				) : (
					<Result correct={corrects} totalQuestions={1} />
				)}
			</div>
		</div>
	);
};

export default QuizPage;
