export interface Question {
	title: string;
	variants: string[];
	correct: number;
}

export interface Card {
	id: number;
	quiz: Question[];
}