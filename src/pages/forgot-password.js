import React from "react";
// import PropTypes from 'prop-types';

import Head from "src/components/Head";

import ForgotPassword from "src/containers/Auth/ForgotPassword/";

const ForgotPasswordPage = (props) => {
	return (
		<>
			<Head title="Forgot Password" />
			<ForgotPassword />
		</>
	);
};

ForgotPasswordPage.Layout = ({ children }) => children;

export default ForgotPasswordPage;
// export default connect((state) => state)(LoginPage);
