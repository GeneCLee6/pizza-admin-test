import React from "react";
import Head from "src/components/Head";
import Transactions from "../components/Transactions";

const TransactionsPage = () => {
	return (
		<>
			<Head title="交易记录" />
			<Transactions />
		</>
	);
};

export default TransactionsPage;
