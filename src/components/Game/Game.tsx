// Game.tsx
import type { Question } from '../../interfaces/Quiz.interfaces.ts'
import styles from './Game.module.scss'

function Game({ question, onClickVariant, step, totalQuestions }: {
	question: Question;
	onClickVariant: (index: number) => void;
	step: number;
	totalQuestions: number;
}) {
	return (
		<div className={styles['quiz']}>
			<div className={styles['progress']}>
				<div style={{ width: `${Math.round((step * 100) / totalQuestions)}%` }} className={styles['progress__inner']}></div>
			</div>
			<h1>{question.title}</h1>
			<ul>
				{question.variants.map((text, index) => (
					<li key={index} onClick={() => onClickVariant(index)}>
						{text}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Game;
