import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import useCostom from '../../utils/customHook';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useDispatch } from 'react-redux';
import { editVactionAction } from '../../redux/actions';
import moment from 'moment';
import { compareAsc } from 'date-fns';
import { dateFormat } from '../../utils/dateFormat';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3)
		},
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
	})
);

export default function EditModal(props: any) {
	const { vactionItems, isOpen, seter } = props;

	const [ open, setOpen ] = React.useState(isOpen);
	const dispach = useDispatch();
	const initialState: any = {
		id: vactionItems.id,
		from: vactionItems.from,
		to: vactionItems.to,
		description: vactionItems.description,
		price: vactionItems.price,
		picture: vactionItems.pictur,
		returnData: vactionItems.return,
		departureDate: vactionItems.departure
	};

	const classes = useStyles();

	const [ data, handelChange ]: any = useCostom(initialState);

	useEffect(
		() => {
			setOpen(isOpen);
		},
		[ open ]
	);
	const handleClose = () => {
		seter(false);
	};

	const handleSaveVaction = async () => {
		const { departureDate, returnData } = data;
		const today = new Date();
		const validDateForToday = compareAsc(today, new Date(departureDate));
		const validDate = compareAsc(new Date(departureDate), new Date(returnData));
		if (validDate === 1 || validDateForToday === 1) return alert('dates not currect');
		dispach(editVactionAction(data));
		seter(false);
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={isOpen}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={isOpen}>
					<div className={classes.paper}>
						<CloseIcon onClick={handleClose} />

						<Container component="main" maxWidth="xs">
							<div className="addVactionForm">
								<h1>creat vaction</h1>
								<form className={classes.container} noValidate>
									<div className="addVactionFormInside">
										<TextField
											id="departureDate"
											name="departureDate"
											label="departure date"
											type="dateTime"
											className={classes.textField}
											onChange={handelChange}
											InputLabelProps={{
												shrink: true
											}}
											color="secondary"
											defaultValue={dateFormat(vactionItems.departure)}
										/>
										<TextField
											id="returnData"
											name="returnData"
											label="return date"
											type="dateTime"
											className={classes.textField}
											onChange={handelChange}
											InputLabelProps={{
												shrink: true
											}}
											color="secondary"
											defaultValue={dateFormat(vactionItems.return)}
										/>
										<TextField
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
											defaultValue={vactionItems.price}
										/>
										<TextField
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
											defaultValue={vactionItems.from}
										/>
										<TextField
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
											defaultValue={vactionItems.to}
										/>
										<TextField
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
											defaultValue={vactionItems.pictur}
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
											defaultValue={vactionItems.description}
											color="secondary"
										/>
									</div>
									<Button
										type="button"
										fullWidth
										variant="contained"
										color="secondary"
										className={classes.vactionButton}
										onClick={handleSaveVaction}
									>
										<CheckCircleOutlineIcon />
									</Button>
								</form>
							</div>
						</Container>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
