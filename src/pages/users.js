import React from "react";
import Head from "src/components/Head";
import Users from "../components/Users";

const UserPage = () => {
	return (
		<>
			<Head title="用户管理" />
			<Users />
		</>
	);
};

export default UserPage;
