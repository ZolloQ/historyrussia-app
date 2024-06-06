import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import MainLayout from '../../layout/Main/Layout.tsx';
import styles from './ShowResultUser.module.scss';
import { useGetResultQuery } from '../../redux/api/api.ts';
import { useParams } from 'react-router-dom';

interface Result {
	uname: string;
	answerid: number;
	qid: number;
	uid: number;
	estimation: string;
	percent: number;
}

const ShowUserResult = () => {
	const { id } = useParams(); // Получаем id из параметров маршрута
	const { data, isLoading, error } = useGetResultQuery(id);
	
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading results</div>;
	
	const results: Result[] = data?.answers || [];
	
	return (
		<MainLayout>
			<TableContainer component={Paper} className={styles.tableContainer}>
				<Table className={styles.table}>
					<TableHead className={styles.tableHead}>
						<TableRow>
							<TableCell className={styles.tableHeaderCell}>Имя</TableCell>
							<TableCell className={styles.tableHeaderCell}>Количество правильных ответов</TableCell>
							<TableCell className={styles.tableHeaderCell}>Процент правильно решенных вопросов</TableCell>
							<TableCell className={styles.tableHeaderCell}>Оценка</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{results.map((row) => (
							<TableRow >
								<TableCell className={styles.tableCell}>{row.uname}</TableCell>
								<TableCell className={styles.tableCell}>{row.answerid}</TableCell>
								<TableCell className={styles.tableCell}>{row.percent}%</TableCell>
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
