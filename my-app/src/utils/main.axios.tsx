import axios from 'axios';

const apiURL: string = 'http://localhost:2204';
const mainAxios = axios.create({
	baseURL: `${apiURL}`
});

mainAxios.interceptors.request.use((config: any) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers['Authorization'] = token;
	}
	return config;
});

export default mainAxios;
