import styles from './ShowResultUser.module.scss';

const ShowResultUser = ({ userResults }: { userResults: any[] }) => {
	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>User Results</h2>
			<div className={styles.table__container}>
				<table>
					<thead>
					<tr>
						<th>Email</th>
						<th>Result</th>
						<th>Total Questions</th>
						<th>Percentage Correct</th>
						<th>Estimation</th>
					</tr>
					</thead>
					<tbody>
					{userResults.map((user, index) => (
						<tr key={index}>
							<td>{user.email}</td>
							<td>{user.result}</td>
							<td>{user.totalQuestions}</td>
							<td>{user.percentage}%</td>
							<td>{user.estimation}</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ShowResultUser;
