import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch } from 'react-redux';
import { VactionFollowersAction } from '../../redux/actions';
import { dateFormat } from '../../utils/dateFormat';
const useStyles: any = makeStyles((theme: any) => ({
	card: {
		maxWidth: 345,
		flexWrap: 'wrap',
		padding: '10px',
		margin: '10px',
		marginTop: '70px'
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
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
	},
	avatar: {
		backgroundColor: red[500]
	},
	favorites: {
		color: red[500]
	}
}));
export default function UserVection(props: any) {
	const { vacation } = props;
	const classes = useStyles();
	const dispach = useDispatch();

	const followvaction = async (item: any) => {
		const followData = { id: item };
		dispach(VactionFollowersAction(followData));
	};

	return (
		<Card className={classes.card}>
			<CardHeader title={`vaction in ${vacation.to} `} />
			<CardHeader title={`leaves from ${vacation.from}`} />
			<CardMedia image={vacation.pictur} className={classes.media} title="Paella dish" />
			<CardContent>
				<Typography variant="body2" className="description" color="textSecondary" component="p">
					{vacation.description}
				</Typography>

				<Typography variant="body2" color="textSecondary" component="p">
					{`departure date : ${dateFormat(vacation.departure)} `}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{` return date: ${dateFormat(vacation.return)}`}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{vacation.price}$
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<label>{vacation.followers}</label>

				<IconButton
					color={vacation.user_id ? 'secondary' : 'default'}
					aria-label="add to favorites"
					onClick={async () => {
						followvaction(vacation.id);
					}}
				>
					<FavoriteIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}
