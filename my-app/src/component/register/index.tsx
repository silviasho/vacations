import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useCostom from '../../utils/customHook';
import mainAxios from '../../utils/main.axios';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import { registerForm } from '../../utils/validiteForm';
import { registerAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export default function Register(props: any) {
	const dispatch = useDispatch();
	localStorage.removeItem('token');
	const initialState = {
		password: null,
		passwordConfirm: null,
		firstName: '',
		lastName: '',
		userName: ''
	};

	const [ data, handelChange ]: any = useCostom(initialState);

	const handleRegister = async () => {
		try {
			const deteils = registerForm(data);
			if (!deteils) return alert("make Sure that you complite all the filds and the password's  Equal");
			dispatch(registerAction(data));
			props.history.push('/login');
		} catch (error) {
			return alert('somting went wrong try agin');
		}
	};

	return (
		<div>
			<Container className="registrtionForm" component="main" maxWidth="xs">
				<CssBaseline />
				<div>
					<Typography color="secondary" component="h1" variant="h5">
						Sign Up
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
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="passwordConfirm"
							label="Password confirm"
							type="password"
							id="passwordConfirm"
							autoComplete="off"
							onChange={handelChange}
							color="secondary"
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="firstName"
							label="first Name"
							type="firstName"
							id="firstName"
							autoComplete="off"
							onChange={handelChange}
							color="secondary"
						/>
						<TextField
							color="secondary"
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="lastName"
							label="last Name"
							type="string"
							id="lastName"
							onChange={handelChange}
							autoComplete="off"
						/>

						<Button type="button" fullWidth variant="contained" color="secondary" onClick={handleRegister}>
							Register
						</Button>
					</form>
					<Grid item>
						<Link color="secondary" href="/" variant="body2">
							{' press here to login'}
						</Link>
					</Grid>
				</div>
			</Container>
		</div>
	);
}
