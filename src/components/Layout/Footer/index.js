import React from "react";

import classes from "./style.module.less";

const Footer = () => {
	const date = new Date()
	const year = date.getFullYear()
	return (
		<footer className={classes.footer}>
			<div>
				<strong className="text-primary">Napoletana Pizza</strong>
				<span> {year} © All Rights Reserved.</span>
			</div>
			<div className="ml-auto">
				<span>Powered by </span>
				<strong className="text-primary">One Stop IT Studio</strong>
			</div>
		</footer>
	);
};

export default Footer;
