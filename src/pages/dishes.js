import React from "react";
// import PropTypes from 'prop-types';

import Head from "src/components/Head";

import Dishes from "src/components/Dishes";

const DishesPage = (props) => {
	// const { } = props;

	return (
		<>
			<Head title="菜品管理" />
			<Dishes />
		</>
	);
};

export default DishesPage;
