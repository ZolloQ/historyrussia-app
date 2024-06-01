export interface MaterialProps {
	title: string;
	chapters: ChapterProps[];
}

export interface ChapterProps {
	subtitle: string;
	text: string;
	images?: File[];
}
