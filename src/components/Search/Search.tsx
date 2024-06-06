import { forwardRef } from 'react';
import styles from './Search.module.scss';
import cn from 'classnames';
import { SearchProps } from './Search.props.ts';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input({ isValid = true, className, value, onChange, ...props }, ref) {
	return (
		<div className={styles['input-wrapper']}>
			<input
				ref={ref}
				className={cn(styles['input'], className, {
					[styles['invalid']]: !isValid // Исправлено условие на !isValid
				})}
				value={value} // Добавлено для управления вводом текста
				onChange={onChange} // Добавлено для обработки изменения текста
				{...props}
			/>
			<img className={styles['icon']} src='/search-icon.svg' alt='Иконка лупы' />
		</div>
	);
});

export default Search;
