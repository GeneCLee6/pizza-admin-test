import React from "react";
import Head from "src/components/Head";
import Orders from "../components/Orders";

const OrderUnprintPage = () => {
	return (
		<>
			<Head title="未打印订单管理" />
			<Orders />
		</>
	);
};

export default OrderUnprintPage;
