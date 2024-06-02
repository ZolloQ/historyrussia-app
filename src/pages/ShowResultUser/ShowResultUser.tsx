import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import MainLayout from '../../layout/Main/Layout.tsx';
import styles from './ShowResultUser.module.scss';

const results = [
	{
		name: 'Антон Петров',
		result: 8,
		totalQuestions: 10,
		percentage: 80,
		estimation: 'Отлично'
	},
	{
		name: 'Василий Иванов',
		result: 5,
		totalQuestions: 10,
		percentage: 50,
		estimation: 'удовлетворительно'
	},
	// Добавьте больше данных по необходимости
];

const ShowUserResult = () => {
	return (
		<MainLayout>
				<TableContainer component={Paper} className={styles.tableContainer}>
					<Table className={styles.table}>
						<TableHead className={styles.tableHead}>
							<TableRow>
								<TableCell className={styles.tableHeaderCell}>Имя</TableCell>
								<TableCell className={styles.tableHeaderCell}>Правильные ответы</TableCell>
								<TableCell className={styles.tableHeaderCell}>Всего вопросов</TableCell>
								<TableCell className={styles.tableHeaderCell}>Процент</TableCell>
								<TableCell className={styles.tableHeaderCell}>Оценка</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{results.map((row) => (
								<TableRow>
									<TableCell className={styles.tableCell}>{row.name}</TableCell>
									<TableCell className={styles.tableCell}>{row.result}</TableCell>
									<TableCell className={styles.tableCell}>{row.totalQuestions}</TableCell>
									<TableCell className={styles.tableCell}>{row.percentage}%</TableCell>
									<TableCell className={styles.tableCell}>{row.estimation}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
		</MainLayout>
	);
};

export default ShowUserResult;
