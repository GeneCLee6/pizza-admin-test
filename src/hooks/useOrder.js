import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { notification, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import {
	requestCurrentOrders,
	requestCancelOrder,
	sendEmail,
	requestUnpaidOrders,
} from "src/services/orders";
import { priceRounder } from "src/utils/helpers";

const { confirm } = Modal;

const useOrder = () => {
	const [currentOrders, setCurrentOrders] = useState([]);
	const [currentOrder, setCurrentOrder] = useState(null);
	const [showCheckoutModal, setShowCheckoutModal] = useState(false);
	const [showAddOrderDishModal, setShowAddOrderDishModal] = useState(false);
	const [showAddSideDishModal, setShowAddSideDishModal] = useState(false);
	const [selectedSideDishItem, setSelectedSideDishItem] = useState(null);
	const [unpaidOrder, setUnpaidOrder] = useState([]);
	const [unpaidOrders, setUnpaidOrders] = useState([]);

	const queryClient = useQueryClient();
	const {
		isLoading,
		error,
		data: currentOrdersData,
	} = useQuery(["fetchCurrentOrders"], () => requestCurrentOrders(), {
		// Refetch the data every second
		refetchInterval: 3000,
		onSuccess: (data) => {
			if (data?.length > currentOrders?.length) {
				notification.success({
					message: "收到新订单",
					duration: 1,
				});
			}
		},
	});

	const {
		// isLoading,
		// error,
		data: unpaidOrdersData,
	} = useQuery(["fetchUnpaidOrders"], () => requestUnpaidOrders(), {
		// Refetch the data every second
		// refetchInterval: 3000,
		// onSuccess: (data) => {
		// 	if (data?.length > unpaidOrders?.length) {
		// 		notification.success({
		// 			message: "新订单已打印",
		// 			duration: 5,
		// 		});
		// 	}
		// },
	});

	const handleToggleTable = (e) => {
		const selectedOrder = e.target.value;
		const order = currentOrdersData.find((i) => i._id === selectedOrder);
		setCurrentOrder(order);
	};

	const handleUnpaidToggleTable = (e) => {
		const selectedOrder = e.target.value;
		const order = unpaidOrdersData.find((i) => i._id === selectedOrder);
		setUnpaidOrder(order);
	};

	const handleChangeComment = (e) => {
		setCurrentOrder((currentOrder) => {
			return {
				...currentOrder,
				comment: e.target.value,
			};
		});
	};

	const handleChangeTotalPrice = (e) => {
		setCurrentOrder((currentOrder) => {
			return {
				...currentOrder,
				totalPrice: e.target.value,
			};
		});
	};

	const handleChangeUnpaidTotalPrice = (e) => {
		setUnpaidOrder((unpaidOrder) => {
			return {
				...unpaidOrder,
				totalPrice: e,
			};
		});
	};

	const handleToggleDishQuantity = (record, action) => {
		const { _id: dishId, price } = record;
		setCurrentOrder((currentOrder) => {
			const { dishes, orderTotalPrice } = currentOrder;
			const newDishes = dishes.map((i) => {
				if (i._id === dishId) {
					const quantity =
						action === "increase" ? i.quantity + 1 : i.quantity - 1;
					if (quantity === 0) return;
					return {
						...i,
						quantity,
					};
				}

				return i;
			});
			// TODO add confirm modal if decrease number to one
			const newOrderTotalPrice =
				action === "increase"
					? orderTotalPrice + price
					: orderTotalPrice - price;

			return {
				...currentOrder,
				orderTotalPrice: priceRounder(newOrderTotalPrice),
				dishes: newDishes.filter((i) => !!i),
			};
		});
	};

	const handleDeleteDish = (dish) => {
		const { _id: dishId, price, quantity } = dish;
		setCurrentOrder((currentOrder) => {
			const { dishes, orderTotalPrice } = currentOrder;
			const newDishes = dishes.filter((i) => i._id !== dishId);
			const newOrderTotalPrice = orderTotalPrice - price * quantity;

			return {
				...currentOrder,
				orderTotalPrice: priceRounder(newOrderTotalPrice),
				dishes: newDishes,
			};
		});
	};

	const handleAddDish = (dish) => {
		let {
			_id: dishId,
			price,
			discount,
			photo,
			dishCnName,
			sideDishes,
		} = dish;

		if (sideDishes?.length) {
			setSelectedSideDishItem(dish);
			setShowAddOrderDishModal(false);
			setShowAddSideDishModal(true);
			return;
		}

		price = priceRounder(price * discount);
		setCurrentOrder((currentOrder) => {
			const { dishes, orderTotalPrice } = currentOrder || {};
			const isExistedDish = dishes?.some((i) => i._id === dishId);

			if (isExistedDish) {
				const newDishes = dishes?.map((i) => ({
					...i,
					quantity: i.quantity + 1,
				}));
				const newOrderTotalPrice = orderTotalPrice + price;

				return {
					...currentOrder,
					orderTotalPrice: priceRounder(newOrderTotalPrice),
					dishes: newDishes,
				};
			}

			const newDishItem = {
				dishCnName,
				photo,
				price,
				discount,
				quantity: 1,
				_id: dishId,
			};

			if (!dishes) {
				return {
					orderTotalPrice: price,
					dishes: [newDishItem],
				};
			}

			const newOrderTotalPrice = orderTotalPrice + price;

			return {
				...currentOrder,
				orderTotalPrice: priceRounder(newOrderTotalPrice),
				dishes: [...dishes, newDishItem],
			};
		});
		setShowAddOrderDishModal(false);
	};

	const handleAddSideDishItem = (value) => {
		const newSideDishes = [];
		Object.entries(value).forEach(([key, value]) => {
			if (value) {
				const sideDish = selectedSideDishItem?.sideDishes?.find(
					(i) => i.sideDishCnName === key
				);
				newSideDishes.push({
					...sideDish,
					quantity: value,
					sideDishId: sideDish._id,
				});
			}
		});

		let price = newSideDishes?.reduce((pev, { price, quantity }) => {
			return pev + price * quantity;
		}, 0);

		price = priceRounder(price * selectedSideDishItem?.discount);

		const newDishItem = {
			...selectedSideDishItem,
			sideDishes: newSideDishes,
			price,
			quantity: 1,
			itemId: nanoid(),
		};

		setCurrentOrder((currentOrder) => {
			const { dishes, orderTotalPrice } = currentOrder;
			let newOrderTotalPrice = orderTotalPrice + price;
			return {
				...currentOrder,
				orderTotalPrice: newOrderTotalPrice,
				dishes: [...dishes, newDishItem],
			};
		});
		setShowAddSideDishModal(false);
		setSelectedSideDishItem(null);
	};

	const showConfirmCancelOrder = () => {
		confirm({
			title: "确定取消该订单?",
			icon: <ExclamationCircleOutlined />,
			content: "该动作不可撤销",
			okText: "确定",
			okType: "danger",
			cancelText: "取消",
			onOk: () => {
				return new Promise(async (resolve, reject) => {
					await requestCancelOrder(currentOrder._id);
					queryClient.invalidateQueries("fetchCurrentOrders");
					message.success({
						content: "取消订单成功",
						duration: 2,
					});
					resolve();
				}).catch(() => console.log("Oops errors!"));
			},
			onCancel() {},
		});
	};

	useEffect(() => {
		const loadShowData = () => {
			const [initialCurrentOrder] = currentOrdersData || [];
			const [initialUnpaidOrder] = unpaidOrdersData || [];
			setCurrentOrder(initialCurrentOrder);
			setUnpaidOrder(initialUnpaidOrder);
		};
		setCurrentOrders(currentOrdersData);
		setUnpaidOrders(unpaidOrdersData);
		loadShowData();
	}, [currentOrdersData, unpaidOrdersData]);

	const handleSendEmail = async (currentOrder, currentOperation) => {
		let emailMessage;
		if (currentOrder.orderType == "delivery") {
			if (!currentOrder.address) {
				alert("Address is required");
			}
			emailMessage =
				"Your meal will be delivered after " +
				currentOperation[0].deliverTime[0] +
				" to " +
				currentOperation[0].deliverTime[1] +
				" munites";
		} else {
			emailMessage =
				"Your meal will be ready after " +
				currentOperation[0].pickupTime[0] +
				" to " +
				currentOperation[0].pickupTime[1] +
				" munites";
		}

		const email = {
			...currentOrder,
			emailMessage,
		};

		const emailKey = "emailOrder";

		message.loading({ content: "Sending Email...", emailKey });
		try {
			await sendEmail(email);
			message.success({
				content: "Email Sent",
				emailKey,
				duration: 2,
			});
		} catch (error) {
			message.error({
				content: error?.response?.data?.message,
				emailKey,
				duration: 2,
			});
		}
	};

	return {
		isLoading,
		error,
		currentOrders,
		currentOrder,
		handleToggleTable,
		handleChangeComment,
		handleChangeTotalPrice,
		handleToggleDishQuantity,
		handleDeleteDish,
		handleAddDish,
		showCheckoutModal,
		setShowCheckoutModal,
		showConfirmCancelOrder,
		showAddOrderDishModal,
		setShowAddOrderDishModal,
		showAddSideDishModal,
		setShowAddSideDishModal,
		selectedSideDishItem,
		handleAddSideDishItem,
		handleSendEmail,
		unpaidOrder,
		unpaidOrders,
		handleChangeUnpaidTotalPrice,
		handleUnpaidToggleTable,
	};
};

export default useOrder;
