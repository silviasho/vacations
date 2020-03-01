import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AdminVection from './adminVaction';
import mainAxios from '../../utils/main.axios';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ButtonAppBar from '../nav';
import GroupIcon from '@material-ui/icons/Group';
import { Grid, ButtonGroup, Button } from '@material-ui/core';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { setVaction, saveUserAction, getUsersAction, getVacationAction } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme: any) => ({
	body: {
		backgroundColor: theme.palette.common.white
	},
	card: {
		maxWidth: 345,
		flexWrap: 'wrap'
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	root: {
		flexGrow: 1
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	}
}));

export default function AdminPage(props: any) {
	const classes: any = useStyles();
	const dispatch = useDispatch();
	const vacationFromStore: any = useSelector((state: any) => state.vacations);
	useEffect(() => {
		const result = async () => {
			try {
				if (vacationFromStore.length != 0) return;
				dispatch(getVacationAction());
				dispatch(getUsersAction());
			} catch (error) {
				alert('somthing went wrong try to login again');
				return props.history.push('/login');
			}
		};

		result();
	}, []);

	const addVaction = () => {
		props.history.push('/creatVaction');
	};

	const goToChart = () => {
		props.history.push('/chart');
	};

	const goToUsers = () => {
		props.history.push('/users');
	};

	const vactionPage = vacationFromStore.map((vacation: any) => {
		return (
			<Grid item xs={12} sm={6} md={4}>
				<AdminVection vacation={vacation} />
			</Grid>
		);
	});
	return (
		<div>
			<ButtonAppBar />

			<div className={classes.root}>
				<Grid className='adminBtn' container spacing={3}>
					<Grid item xs>
						<ButtonGroup size="large" color="secondary">
							<Button onClick={addVaction}>
								<AddCircleIcon />
							</Button>
						</ButtonGroup>
					</Grid>
					<Grid item xs>
						<ButtonGroup size="large" color="secondary">
							<Button onClick={goToChart}>
								<EqualizerIcon />
							</Button>
						</ButtonGroup>
					</Grid>
					<Grid item xs>
						<ButtonGroup size="large" color="secondary">
							<Button onClick={goToUsers}>
								<GroupIcon />
							</Button>
						</ButtonGroup>
					</Grid>
				</Grid>
			</div>
			<Grid container spacing={4}>
				{vactionPage}
			</Grid>
		</div>
	);
}
