import React from "react";
import Head from "src/components/Head";
import SetPassword from "src/containers/Auth/SetPassword/";

const SetPasswordPage = (props) => {
	const { router: { query: { access_token: token } = {} } = {} } = props;

	return (
		<>
			<Head title="Set Password" />
			<SetPassword token={token} />
		</>
	);
};

SetPasswordPage.Layout = ({ children }) => children;

export default SetPasswordPage;
