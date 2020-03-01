import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import useCostom from '../../utils/customHook';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { addVactionAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { compareAsc } from 'date-fns';


const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200
	},
	vactionButton: {
		marginTop: '10px'
	}
}));

export default function CreateVaction(props: any) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const initialState = {
		from: '',
		to: '',
		description: '',
		price: null,
		picture: '',
		returnData: '',
		departureDate: ''
	};

	const [ data, handelChange ]: any = useCostom(initialState);

	const handleCreateVaction = async (e: any) => {
		e.preventDefault();
		try {
			const { from, to, description, price, picture, returnData, departureDate }: any = data;
			const today = new Date();
			const validDateForToday = compareAsc(today, new Date(departureDate));
			const validDate = compareAsc(new Date(departureDate), new Date(returnData));
			console.log(validDate);
			if (validDate === 1 || validDateForToday === 1) return alert('dates not currect');
			if (!from || !to || !description || !price || !picture || !returnData || !departureDate) {
				return alert('missing details');
			}
			dispatch(addVactionAction(data));
			props.history.push('/adminPage');
		} catch (error) {
			return alert('try again');
		}
	};
	const goBack = () => {
		props.history.push('/adminPage');
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className="addVactionForm">
				<ArrowForwardIcon type="button" color="secondary" className={classes.vactionButton} onClick={goBack} />

				<h1>create vacation</h1>
				<form className={classes.container} noValidate>
					<div className="addVactionFormInside">
						<TextField
							id="departureDate"
							name="departureDate"
							label="departure date"
							type="date"
							className={classes.textField}
							onChange={handelChange}
							InputLabelProps={{
								shrink: true
							}}
							autoComplete="off"
							color="secondary"
						/>
						<TextField
							autoComplete="off"
							id="returnData"
							name="returnData"
							label="return date"
							type="date"
							className={classes.textField}
							onChange={handelChange}
							InputLabelProps={{
								shrink: true
							}}
							color="secondary"
						/>
						<TextField
							autoComplete="off"
							onChange={handelChange}
							id="price"
							name="price"
							label="price"
							type="number"
							className={classes.textField}
							InputLabelProps={{
								shrink: true
							}}
							color="secondary"
						/>
						<TextField
							autoComplete="off"
							onChange={handelChange}
							id="from"
							name="from"
							label="from"
							type="text"
							className={classes.textField}
							InputLabelProps={{
								shrink: true
							}}
							color="secondary"
						/>
						<TextField
							autoComplete="off"
							onChange={handelChange}
							id="to"
							name="to"
							label="to"
							type="text"
							className={classes.textField}
							InputLabelProps={{
								shrink: true
							}}
							color="secondary"
						/>
						<TextField
							autoComplete="off"
							onChange={handelChange}
							id="picture"
							name="picture"
							label="pictur"
							type="text"
							className={classes.textField}
							InputLabelProps={{
								shrink: true
							}}
							color="secondary"
						/>
						<TextField
							id="description"
							name="description"
							label="description"
							type="text"
							className={classes.textField}
							onChange={handelChange}
							InputLabelProps={{
								shrink: true
							}}
							color="secondary"
						/>
					</div>
				</form>
			</div>
			<Button
				type="button"
				fullWidth
				variant="contained"
				color="secondary"
				className={classes.vactionButton}
				onClick={handleCreateVaction}
			>
				<CheckCircleOutlineIcon />
			</Button>
		</Container>
	);
}
