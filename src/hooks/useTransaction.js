import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { requestAllOrders } from "src/services/orders";

const useTransaction = () => {
	const [orders, setOrders] = useState([]);
	const [currentTransaction, setCurrentTransaction] = useState(null);
	const [showTransactionDetailDrawer, setShowTransactionDetailDrawer] =
		useState(false);

	const {
		isLoading,
		error,
		data: ordersData,
	} = useQuery(["fetchAllOrders"], () => requestAllOrders());

	useEffect(() => {
		setOrders(ordersData);
	}, [ordersData]);

	return {
		isLoading,
		error,
		orders,
		showTransactionDetailDrawer,
		setShowTransactionDetailDrawer,
		currentTransaction,
		setCurrentTransaction,
	};
};

export default useTransaction;
