import Actions from './action.config';
import mainAxios from '../utils/main.axios';

export const saveUserAction = (user: any) => {
	return {
		type: Actions.SAVE_USER,
		payload: user
	};
};

export const setTitle = (item: any) => {
	return {
		type: Actions.SET_TITLE,
		payload: item
	};
};

export const setVaction = (vaction: any) => {
	return {
		type: Actions.SET_VACATIONS,
		payload: vaction
	};
};

export const setAllUsers = (item: any) => {
	return {
		type: Actions.SET_USERS,
		payload: item
	};
};

export const deleteStore = () => {
	return {
		type: Actions.CLEAR_STORE
	};
};

export const deleteVactionAction = (item: any) => async (dispatch: any) => {
	try {
		const updatedVaction = await mainAxios.post(`/adminRouts/deleteVacation`, item);
		const vaction = updatedVaction.data;
		dispatch(setVaction(vaction));
	} catch (error) {
		return error;
	}
};

export const getUsersAction = () => async (dispatch: any) => {
	try {
		const allUsers = await mainAxios.get(`adminRouts/getUsers`);
		dispatch(setAllUsers(allUsers.data));
	} catch (error) {
		return alert('somthing went wrong login again');
	}
};

export const editVactionAction = (item: any) => async (dispatch: any) => {
	try {
		const updatedVaction = await mainAxios.post(`/adminRouts/editVacation`, item);
		const vaction = updatedVaction.data;
		dispatch(setVaction(vaction));
	} catch (error) {
		return error;
	}
};

export const addVactionAction = (item: any) => async (dispatch: any) => {
	try {
		const updatedVaction = await mainAxios.post(`/adminRouts/addVacation`, item);
		const vaction = updatedVaction.data;
		dispatch(setVaction(vaction));
	} catch (error) {
		return error;
	}
};

export const getVacationAction = () => async (dispatch: any) => {
	try {
		const resVactions = await mainAxios.get(`/adminRouts/vacations`);
		const { vacations, user, err } = resVactions.data;
		if (err) throw new Error();
		dispatch(saveUserAction(user.user_name));
		dispatch(setVaction(vacations));
	} catch (error) {
		return error;
	}
};

export const getVacationOrderdAction = () => async (dispatch: any) => {
	try {
		const resVactions = await mainAxios.get(`/userRout/vacations`);
		const { vacations, user, err } = resVactions.data;
		if (err) throw new Error();
		dispatch(saveUserAction(user.user_name));
		dispatch(setVaction(vacations));
	} catch (error) {
		return error;
	}
};

export const VactionFollowersAction = (item: any) => async (dispatch: any) => {
	try {
		const updatedVaction = await mainAxios.post(`/userRout/follow`, item);
		const vaction = updatedVaction.data;
		dispatch(setVaction(vaction));
	} catch (error) {
		return error;
	}
};

export const loginAction = (item: any) => async (dispatch: any) => {
	try {
		const result = await mainAxios.post('/registrtion/login', item);
		const { user, userToken, userNotExist } = result.data;
		if (userNotExist) throw new Error();
		const { isadmin } = user;
		dispatch(setTitle(isadmin));
		localStorage.setItem('token', userToken);
		return isadmin;
	} catch (error) {
		return error;
	}
};

export const registerAction = (item: any) => async (dispatch: any) => {
	try {
		const res = await mainAxios.post('/registrtion/register', item);
		const { userExist } = res.data;
		if (userExist) return alert(userExist);
	} catch (error) {
		return alert('invalid user');
	}
};

export const adminChangeAction = (item: any) => async (dispatch: any) => {
	try {
		const updatedUser = await mainAxios.post(`adminRouts/adminChange`, item);
		const users = updatedUser.data;
		dispatch(setAllUsers(users));
	} catch (error) {
		return error;
	}
};
