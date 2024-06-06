import { InputHTMLAttributes } from 'react';

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
	isValid?: boolean;
	className?: string;
	value: string; // Добавлено
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Добавлено
}
