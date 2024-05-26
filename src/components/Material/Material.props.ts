export interface MaterialProps {
	id: number;
	title: string;
	chapters: ChapterProps[];
}

export interface ChapterProps {
	subtitle: string;
	text: string;
	images?: image[];
}

export interface image {
	src: string;
	key: number;
}