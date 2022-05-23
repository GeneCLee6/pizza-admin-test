import React from "react";

import Head from "src/components/Head";

import ChangePassword from "src/containers/Auth/ChangePassword/";

const ChangePasswordPage = (props) => {
	// const { } = props;

	return (
		<>
			<Head title="Change Password" />
			<ChangePassword />
		</>
	);
};

export default ChangePasswordPage;
