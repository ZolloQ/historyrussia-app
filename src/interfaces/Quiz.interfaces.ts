export interface IQuestion {
	title: string;
	variants: string[];
	correct: number;
}

export interface IQuiz {
	id: number;
	quiz: IQuestion[];
}