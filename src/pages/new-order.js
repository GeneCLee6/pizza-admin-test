import React from "react";
import Head from "src/components/Head";
import NewOrder from "../components/NewOrder";
import GlobalProvider from "../contexts/GlobalProvider";

const NewOrderPage = () => {
	return (
		<GlobalProvider>
			<Head title="点单" />
			<NewOrder />
		</GlobalProvider>
	);
};

export default NewOrderPage;
