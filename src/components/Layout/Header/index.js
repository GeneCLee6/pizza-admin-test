import React from "react";
import { Layout } from "antd";
import classes from "./style.module.less";

const Header = (props) => {
	const { children, style } = props;

	return (
		<div className={classes.headerWrapper}>
			<Layout.Header className={classes.header} style={style}>
				{children}
			</Layout.Header>
		</div>
	);
};

export default Header;
