export interface MaterialProps {
	id: number;
	title: string;
	chapters: ChapterProps[];
}

export interface ChapterProps {
	subtitle: string;
	text: React.ReactNode;
	image?: string[];
}