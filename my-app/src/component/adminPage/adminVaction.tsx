import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import moment from 'moment';
import EditModal from '../editModal';
import { useDispatch } from 'react-redux';
import { deleteVactionAction } from '../../redux/actions';
import {dateFormat} from '../../utils/dateFormat'

const useStyles = makeStyles((theme: any) => ({
	card: {
		maxWidth: 345,
		flexWrap: 'wrap',
		padding: '10px',
		margin: '10px'
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
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
export default function AdminVection(props: any) {
	const { vacation } = props;
	let classes: any = useStyles();
	const dispach = useDispatch();
	const [ open, setOpen ] = React.useState(false);

	const deleteVaction = async (item: any) => {
		console.log(item);
		dispach(deleteVactionAction(item));
	};

	return (
		<Card className={classes.card}>
			<CardHeader title={`vaction in ${vacation.to} `} />
			<CardHeader title={`leaves from ${vacation.from}`} />
			<CardMedia image={vacation.pictur} className={classes.media} />
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p" className="description">
					{vacation.description}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{`departure date :  ${ dateFormat(vacation.departure) }    `}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{` return date: ${dateFormat(vacation.return)}`}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{`price : ${vacation.price}$`}
				</Typography>
			</CardContent>
			<CardActions disableSpacing />
			<IconButton color="secondary">
				<DeleteIcon
					type="button"
					onClick={async () => {
						deleteVaction(vacation);
					}}
				/>
			</IconButton>
			<IconButton color="secondary">
				<CreateIcon
					type="button"
					onClick={() => {
						setOpen(true);
					}}
				/>
			</IconButton>
			<EditModal isOpen={open} vactionItems={vacation} seter={setOpen} />
		</Card>
	);
}
