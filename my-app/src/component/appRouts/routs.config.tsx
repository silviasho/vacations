import Register from '../register';
import Login from '../login';
import AdminPage from '../adminPage/adminPage';
import CreateVaction from '../creatVaction';
import UserPage from '../userPage/userPage';
import Chart from '../chart';
import Users from '../users';

export const routes: any = [
	{
		exact: true,
		private: false,
		isAdmin: false,
		path: '/register',
		component: Register
	},
	{
		exact: true,
		private: false,
		isAdmin: false,
		path: '/login',
		component: Login
	},
	{
		exact: true,
		private: true,
		isAdmin: true,
		path: '/adminPage',
		component: AdminPage
	},
	{
		exact: true,
		private: true,
		isAdmin: false,
		path: '/userPage',
		component: UserPage
	},
	{
		exact: true,
		private: true,
		isAdmin: true,
		path: '/chart',
		component: Chart
	},
	{
		exact: true,
		private: true,
		isAdmin: true,
		isVisible: false,
		title: 'home page',
		path: '/users',
		component: Users
	},
	{
		exact: true,
		isVisible: true,
		title: 'careat',
		path: '/creatVaction',
		component: CreateVaction,
		private: true,
		isAdmin: true
	},
	{ exact: true, private: false, isAdmin: false, isVisible: false, title: '', path: '/', component: Login }
];
