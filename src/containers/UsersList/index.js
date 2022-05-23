import React from "react";
import { withRouter } from "next/router";
import UserCard from "./UserCard";

const UsersList = (props) => {
	const { userList = [] } = props;

	return (
		<div className="row">
			{userList.map((el) => {
				return <UserCard data={el} key={el.id} />;
			})}
		</div>
	);
};

export default withRouter(UsersList);
