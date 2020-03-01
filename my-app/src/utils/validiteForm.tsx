import { compareAsc } from 'date-fns';

export const registerForm = (data: any) => {
	const { password, passwordConfirm, firstName, lastName, userName }: any = data;
	if (!password || !passwordConfirm || !firstName || !lastName || !userName || password !== passwordConfirm) {
		return false;
	}
	return true;
};

export const vacationForm = (data: any) => {
	const { from, to, description, price, picture, returnData, departureDate }: any = data;
	const today = new Date();
	const validDateForToday = compareAsc(today, new Date(departureDate));
	// validDate returns - 1 if the firs date is befor
	const validDate = compareAsc(new Date(departureDate), new Date(returnData));
	if (validDate === 1 || validDateForToday === 1) return false;
	if (!from || !to || !description || !price || !picture || !returnData || !departureDate) {
		return false;
	}
	return true;
};
