import moment from 'moment';

export const dateFormat = (date: any) => {
	const newDate =moment(date).format('DD.MM.YYYY')
	return newDate ;
};