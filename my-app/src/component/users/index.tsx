import React, { useEffect, Props } from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { getUsersAction, adminChangeAction } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const StyledTableCell = withStyles((theme: Theme) =>
	createStyles({
		head: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white
		},
		body: {
			fontSize: 14
		}
	})
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
	createStyles({
		root: {
			'&:nth-of-type(odd)': {
				backgroundColor: theme.palette.common
			}
		}
	})
)(TableRow);

export default function Users(props: any) {
	const dispatch = useDispatch();
	const users: any = useSelector((state: any) => state.allUsers);

	const goBack = () => {
		props.history.push('/adminPage');
	};

	useEffect(() => {
		const result = async () => {
			try {
				if (users.length != 0) return;
				dispatch(getUsersAction());
			} catch (error) {
				return props.history.push('/login');
			}
		};

		result();
	}, []);

	const handleChange = (id: any) => {
		const data = { userId: id };
		dispatch(adminChangeAction(data));
	};

	return (
		<div className="App">
			<ArrowForwardIcon type="button" color="secondary" onClick={goBack} />
			<div className="kk">
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<StyledTableCell>user name</StyledTableCell>
								<StyledTableCell>user id</StyledTableCell>
								<StyledTableCell>admin</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((row: any) => (
								<StyledTableRow>
									<StyledTableCell>{row.user_name}</StyledTableCell>
									<StyledTableCell>{row.id}</StyledTableCell>
									<StyledTableCell>
										<Checkbox
											onChange={() => {
												handleChange(row.id);
											}}
											checked={row.isadmin}
											color="default"
											value="default"
											inputProps={{ 'aria-label': 'checkbox with default color' }}
										/>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
}
