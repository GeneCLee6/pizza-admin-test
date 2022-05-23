import React from "react";
import Avatar from "src/components/Avatar";
import classes from "./style.module.less";

const UserCard = (props) => {
	const { data } = props;

	return (
		<div className="col-4">
			<div className={classes.card}>
				<Avatar src={data.avatar} fullName={data.name} />
				<h2 className="mb-0 mt-2">{data.name}</h2>
				<i>{data.email}</i>
			</div>
		</div>
	);
};

export default React.memo(UserCard);
