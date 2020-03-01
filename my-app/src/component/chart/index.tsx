import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function Chart(props: any) {
	const vactionTo: any = useSelector((state: any) => state.vacations);

	const dataaa = {
		labels: vactionTo.map((vaction: any) => {
			return vaction.to;
		}),
		datasets: [
			{
				label: 'folowers',
				backgroundColor: 'rgba(255,99,132,0.2)',
				borderColor: 'rgba(255,99,132,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				hoverBorderColor: 'rgba(255,99,132,1)',
				data: vactionTo.map((vaction: any) => {
					return vaction.followers;
				})
			}
		]
	};
	
	const goBack = () => {
		props.history.push('/adminPage');
	};
	return (
		<div>
			<ArrowForwardIcon type="button" color="secondary" onClick={goBack} />

			<h2>followers report by destantion</h2>
			<Bar
				data={dataaa}
				width={80}
				height={100}
				options={{
					maintainAspectRatio: false
				}}
			/>
		</div>
	);
}
