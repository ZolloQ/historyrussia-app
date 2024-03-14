import type { Card } from '../../../interfaces/Quiz.interfaces.ts'

const localCards: { [key: string]: Card } = {
	"1": {
		id: 1,
		questions: [
			{
				title: "What is React?",
				variants: ["Library", "Framework", "Library", "Application"],
				correct: 0,
			},
			{
				title: "What is React?",
				variants: ["Library", "Framework", "Library", "Application"],
				correct: 0,
			},
			{
				title: "What is React?",
				variants: ["Library", "Framework", "Library", "Application"],
				correct: 0,
			},
			{
				title: "What is a component?",
				variants: ["Application", "Part of application or page", "I don't know"],
				correct: 1,
			},
			{
				title: "What is JSX?",
				variants: ["Simple HTML", "Function", "HTML with JS code execution ability"],
				correct: 2,
			},
			{
				title: "What is JSX?",
				variants: ["Simple HTML", "Function", "HTML with JS code execution ability"],
				correct: 2,
			}
		]
	},
	"2": {
		id: 2,
		questions: [
			{
				title: "What is CSS?",
				variants: ["Cascading Style Sheets", "Cascading Script Sheets", "Cool Style Sheets"],
				correct: 0,
			},
			{
				title: "What is HTML?",
				variants: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
				correct: 0,
			},
			{
				title: "What is JavaScript?",
				variants: ["Programming Language", "Style Language", "Markup Language"],
				correct: 0,
			},
		],
	},
};

export default localCards;