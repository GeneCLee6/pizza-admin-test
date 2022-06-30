import React from "react";
import Head from "src/components/Head";
import Orders from "../components/OrdersUnpaid";

const OrderPage = () => {
	return (
		<>
			<Head title="订单管理" />
			<Orders />
		</>
	);
};

export default OrderPage;
