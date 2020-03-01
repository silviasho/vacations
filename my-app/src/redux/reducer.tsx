import Actions from './action.config';

const initialState = {
	user: '',
	vacations: [],
	allUsers: [],
	isadmin: null
};

export default (state = initialState, action: any) => {
	const { type, payload } = action;

	switch (type) {
		case Actions.SAVE_USER:
			return { ...state, user: payload };
		case Actions.SET_VACATIONS:
			return { ...state, vacations: payload };
		case Actions.SET_USERS:
			return { ...state, allUsers: payload };
		case Actions.CLEAR_STORE:
			return { ...state, allUsers: [], vacations: [], user: '' };
		case Actions.SET_TITLE:
			return { ...state, isadmin: payload };
		default:
			return state;
	}
};
