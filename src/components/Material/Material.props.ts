export interface MaterialProps {
	id: number;
	title: string;
	chapters: ChapterProps[];
}

export interface ChapterProps {
	subtitle: string;
	text: string;
	image?: string[];
}