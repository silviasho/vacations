import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteStore } from '../../redux/actions';

const useStyles = makeStyles((theme: any) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

export default function ButtonAppBar(props: any) {
	const user: any = useSelector((state: any) => state.user);
	const classes = useStyles();
	const dispatch = useDispatch();

	const logOut: any = (e: any) => {
		e.preventDefault();
		localStorage.removeItem('token');
		dispatch(deleteStore());
	};
	return (
		<div className={classes.root}>
			<AppBar color="secondary">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						helo {user}
					</Typography>

					<Button color="inherit" onClick={logOut}>
						<Link style={{ textDecoration: 'none', color: 'white' }} to="/login">
							log out
						</Link>
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
