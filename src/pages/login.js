import React from "react";
// import PropTypes from 'prop-types';

import Head from "src/components/Head";

import Login from "src/containers/Auth/Login/";

const LoginPage = (props) => {
	return (
		<>
			<Head title="Login" />
			<Login />
		</>
	);
};

LoginPage.Layout = ({ children }) => children;

export default LoginPage;
