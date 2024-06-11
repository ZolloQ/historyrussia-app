import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDeleteCardMutation } from '../../redux/api/api.ts';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import styles from './Card.module.scss';
import type { CardProps } from './Card.props';

const Card: React.FC<CardProps> = ({ id, name, grade, picture }) => {
	const [deleteCard] = useDeleteCardMutation();
	const [open, setOpen] = useState(false);
	const isAuth = useSelector((state: { authlocal: { status: boolean } }) => state.authlocal.status);
	const userRole = useSelector((state: { authlocal: { role: string | null } }) => state.authlocal.role);
	
	const handleClickOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};
	
	const handleDeleteCard = async () => {
		try {
			await deleteCard(id).unwrap();
			console.log('Карточка успешно удалена');
		} catch (error) {
			console.error('Ошибка при удалении карточки:', error);
		} finally {
			handleClose();
		}
	};
	
	return (
		<div className={styles['card-wrapper']}>
			<div className={styles['card-container']}>
				<div className={styles['card']}>
					{isAuth && userRole === 'Admin' && (
						<>
							<button className={styles['delete-button']} onClick={handleClickOpen}>✖</button>
							<Dialog open={open} onClose={handleClose}>
								<DialogTitle>{"Удалить карточку?"}</DialogTitle>
								<DialogContent>
									<DialogContentText>
										Вы уверены, что хотите удалить эту карточку? Это действие нельзя отменить.
									</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleClose} color="primary">
										Отмена
									</Button>
									<Button onClick={handleDeleteCard} color="secondary">
										Удалить
									</Button>
								</DialogActions>
							</Dialog>
						</>
					)}
					<Link to={`/card/${id}`} className={styles['link']}>
						<div className={styles['head']} style={{ backgroundImage: `url('../card/${id}/${picture}')` }}>
							<div className={styles['class']}>
								{grade} класс&nbsp;
							</div>
						</div>
						<div className={styles['footer']}>
							<div className={styles['title']}>{name}</div>
						</div>
					</Link>
				</div>
			</div>
			{isAuth && userRole === 'Admin' && (
				<Link to={`/card/${id}/result`} className={styles['results-link']}>Просмотреть результаты</Link>
			)}
		</div>
	);
};

export default Card;
