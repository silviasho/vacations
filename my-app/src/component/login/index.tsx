import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useCostom from '../../utils/customHook';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../redux/actions';


export default function Login(props:any ) {
	
	const dispatch = useDispatch();
	localStorage.removeItem('token');

	const initialState: any = {
		userName: '',
		password: ''
	};

	const [ data, handelChange ]: any = useCostom(initialState);

	const handleLogin = async () => {
		try {
			const { password, userName }: any = data;
			if (!userName || !password) throw new Error();
			const isadmin = await dispatch(loginAction(data));
			if (!isadmin) return props.history.push('/userPage');
			return props.history.push('/adminPage');
		} catch (error) {
			return alert('invalid user');
		}
	};

	return (
		<Container className="registrtionForm" component="main" maxWidth="xs">
			<CssBaseline />
			<div>
				<Typography color="secondary" component="h1" variant="h5">
					LOGIN
				</Typography>
				<form noValidate>
					<TextField
						autoComplete="off"
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="userName"
						label="user name"
						id="userName"
						onChange={handelChange}
						className="textField"
						color="secondary"
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="off"
						onChange={handelChange}
						color="secondary"
					/>

					<Button type="button" fullWidth variant="contained" color="secondary" onClick={handleLogin}>
						LOGIN
					</Button>
				</form>
				<Grid item>
					<Link href="/register" color="secondary" variant="body2">
						{"Don't have an account? Sign Up"}
					</Link>
				</Grid>
			</div>
		</Container>
	);
}
