import { withRouter, Redirect } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

const HiOrderCommponent: any = (props: any) => {
	const user: any = useSelector((state: any) => state.isadmin);
	const tokenFromLocaL = localStorage.getItem('token');
	const machLocation = window.location.pathname === props.path;
	const privetCommponent = !tokenFromLocaL && props.private && machLocation;
	const adminComponent = !user && props.isAdmin && machLocation;

	if (adminComponent || privetCommponent) {
		alert('wrong reqwest login again');
		return <Redirect to="/login" />;
	}
	return props.children;
};

export default withRouter(HiOrderCommponent);
