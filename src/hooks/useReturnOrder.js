import { useState, useEffect } from "react";
import { priceRounder } from "src/utils/helpers";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import { message, Modal } from "antd";
const { confirm } = Modal;
import { requestCreatePhoneNewOrder } from "src/services/orders";

const createKey = "returnOrder";

const useReturnOrder = (form) => {
	const [currentOrder, setCurrentOrder] = useState({});
	const [dishes, setDishes] = useState([]);
	//HOU change flow order - createorder
	const [cashPaid, setCashPaid] = useState();
	const [cashier, setCashier] = useState();
	const [disabledBtn, setDisabledBtn] = useState(true);
	const [orderTotalPrice, setOrderTotalPrice] = useState(0);
	const [showAddOrderDishModal, setShowAddOrderDishModal] = useState(false);
	const [showAddSideDishModal, setShowAddSideDishModal] = useState(false);
	const [selectedSideDishItem, setSelectedSideDishItem] = useState(null);
	const [showCheckoutModal, setShowCheckoutModal] = useState(false);
	//HOU
	const [payMethod, setPayMethod] = useState();
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
		setDishes((currentDishes) => {
			if (currentDishes) {
				const isExistedDish = currentDishes?.some(
					(i) => i._id === dishId
				);

				if (isExistedDish) {
					const newDishes = dishes?.map((i) => ({
						...i,
						quantity: i.quantity + 1,
					}));
					return newDishes;
				}
			}

			const newDishItem = {
				dishCnName,
				photo,
				price,
				discount,
				quantity: -1,
				_id: dishId,
			};

			return [...dishes, newDishItem];
		});
		setShowAddOrderDishModal(false);
	};

	//HOU
	const handleTogglePayMethod = (e) => {
		setPayMethod(e.target.value);
	};

	const handleSetCashier = (cashier) => {
		setCashier(cashier);
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

		setDishes((currentDishes) => [...currentDishes, newDishItem]);
		setShowAddSideDishModal(false);
		setSelectedSideDishItem(null);
	};

	const handleToggleDishQuantity = (record, action) => {
		// TODO Bug 当有多个麻辣烫时，数量会同时改变
		const { _id: dishId } = record;
		setDishes((currentDishes) => {
			const newDishes = currentDishes.map((i) => {
				if (i._id === dishId) {
					const quantity =
						action === "increase" ? i.quantity + 1 : i.quantity - 1;
					return {
						...i,
						quantity,
					};
				}

				return i;
			});

			return newDishes.filter((i) => !!i);
		});
	};

	const handleDeleteDish = (dish) => {
		const { _id: dishId } = dish;
		setDishes((currentDishes) =>
			currentDishes.filter((i) => i._id !== dishId)
		);
	};

	const handleSubmitOrder = async (value) => {
		const { tableNum, comment } = value;
		const { cashPaidRes, cardPaid } = calculatePayment(
			payMethod,
			orderTotalPrice,
			cashPaid
		);
		//HOU change flow order - createorder
		let payload = {
			dishes,
			tableNum,
			comment,
			orderType: "return",
			orderTotalPrice,
			payMethod,
			cashPaid: cashPaidRes,
			cardPaid,
			payStatus: "paid",
			orderStatus: "done",
			cashier,
		};

		try {
			message.loading({ content: "正在提交...", createKey });
			setDisabledBtn(true);
			await requestCreatePhoneNewOrder(payload);
			message.success({
				content: "提交成功",
				createKey,
				duration: 2,
			});
			setDishes([]);
			form.resetFields();
			setDisabledBtn(false);
		} catch (error) {
			message.error({
				content: "提交失败",
				createKey,
				duration: 2,
			});
		}
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
				form.resetFields();
				setDishes([]);
				message.success({
					content: "取消订单成功",
					duration: 2,
				});
			},
			onCancel() {},
		});
	};

	const calculatePayment = (payMethod, totalPrice, cashPaid) => {
		switch (payMethod) {
			case "card":
				return {
					cardPaid: totalPrice,
					cashPaidRes: 0,
				};
			case "cash":
				return {
					cardPaid: 0,
					cashPaidRes: totalPrice,
				};
			case "支付宝":
				return {
					cardPaid: 0,
					cashPaidRes: 0,
				};

			default:
				return;
		}
	};

	useEffect(() => {
		const calculateTotalPrice = () => {
			let newOrderTotalPrice = dishes?.reduce(
				(pev, { price, quantity }) => {
					return pev + price * quantity;
				},
				0
			);
			newOrderTotalPrice = priceRounder(newOrderTotalPrice);
			setOrderTotalPrice(newOrderTotalPrice);
		};
		calculateTotalPrice();
	}, [dishes]);

	useEffect(() => {
		const checkBtnStatus = () => {
			if (payMethod && cashier) {
				setDisabledBtn(false);
			}
		};

		checkBtnStatus();
	}, [cashier, payMethod]);

	return {
		dishes,
		setDishes,
		showAddOrderDishModal,
		setShowAddOrderDishModal,
		showAddSideDishModal,
		setShowAddSideDishModal,
		handleAddDish,
		orderTotalPrice,
		handleToggleDishQuantity,
		handleDeleteDish,
		selectedSideDishItem,
		handleAddSideDishItem,
		handleSubmitOrder,
		showConfirmCancelOrder,
		showCheckoutModal,
		setShowCheckoutModal,
		currentOrder,
		disabledBtn, //HOU change flow order - createorder
		handleTogglePayMethod,
		payMethod,
		handleSetCashier,
		cashPaid,
	};
};

export default useReturnOrder;
