import React, { useEffect } from 'react';
import UserVection from './userVaction';
import { getVacationOrderdAction } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import ButtonAppBar from '../nav';
import { Grid } from '@material-ui/core';

export default function UserPage(props: any) {
	const dispatch = useDispatch();
	const vacationFromStore: any = useSelector((state: any) => state.vacations);

	useEffect(() => {
		const result = async () => {
			try {
				if (vacationFromStore.length != 0) return;
				dispatch(getVacationOrderdAction());
			} catch (error) {
				return props.history.push('/login');
			}
		};

		result();
	}, []);
	const vactionPage = vacationFromStore.map((vacation: any) => {
		return (
			<Grid item xs={12} sm={6} md={4}>
				<UserVection vacation={vacation} />
			</Grid>
		);
	});
	return (
		<div>
			<ButtonAppBar />

			<Grid container spacing={4}>
				{vactionPage}
			</Grid>
		</div>
	);
}
