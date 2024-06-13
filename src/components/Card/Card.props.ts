export interface CardProps {
	id: number;
	name: string;
	grade: number;
	picture: File; // Изменено на строку, чтобы соответствовать использованию пути URL
	onDelete?: (id: number) => void; // Добавлен необязательный проп onDelete
}
