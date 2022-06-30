import { useState, useEffect, useContext } from "react";
import { priceRounder } from "src/utils/helpers";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import { message, Modal } from "antd";
const { confirm } = Modal;
import { requestCreatePhoneNewOrder } from "src/services/orders";
import { requesDishID } from "src/services/dishes";
import { GlobalContext } from "../contexts/GlobalProvider";

const createKey = "createOrder";

const useNewOrder = (form) => {
	const [currentOrder, setCurrentOrder] = useState({});
	const [dishes, setDishes] = useState([]);
	const [disabledBtn, setDisabledBtn] = useState(false);
	const [orderTotalPrice, setOrderTotalPrice] = useState(0);
	const [showAddOrderDishModal, setShowAddOrderDishModal] = useState(false);
	const [showAddSideDishModal, setShowAddSideDishModal] = useState(false); //to do debug convient
	const [selectedSideDishItem, setSelectedSideDishItem] = useState(null);
	const [showCheckoutModal, setShowCheckoutModal] = useState(false);

	const {
		contextValue: { cart, totalPrice },
		clearCart,
	} = useContext(GlobalContext);

	const handleDishChoose = (dish) => {
		const { _id, name, description, dishType, prices, photo } = dish;
		setSelectedSideDishItem(dish);
		setShowAddOrderDishModal(false);
		setShowAddSideDishModal(true);
	};
	const handleAddDish = (dish) => {
		let { _id: dishId, prices, photo, name } = dish;

		// if (sideDishes?.length) {
		setSelectedSideDishItem(dish);
		setShowAddOrderDishModal(false);
		setShowAddSideDishModal(true);
		// 	return;
		// }

		const newPrice = priceRounder(prices[0]);
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
				name,
				photo,
				newPrice,
				quantity: 1,
				_id: dishId,
			};

			return [...dishes, newDishItem];
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

		setDishes((currentDishes) => [...currentDishes, newDishItem]);
		setShowAddSideDishModal(false);
		setSelectedSideDishItem(null);
	};

	const handleToggleDishQuantity = (record, action) => {
		// TODO Bug 当有多个麻辣烫时，数量会同时改变
		const { itemId: dishId } = record;
		const increase = (i) => {
			if (i + 1 > 1) {
				return i + 1;
			} else {
				return i;
			}
		};
		const decrease = (i) => {
			if (i > 1) {
				return i - 1;
			} else {
				return i;
			}
		};
		setDishes((currentDishes) => {
			const newDishes = currentDishes.map((i) => {
				if (i.itemId === dishId) {
					const quantity =
						action === "increase"
							? increase(i.quantity)
							: decrease(i.quantity);
					if (quantity === 0) return;
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
		const { itemId: dishId } = dish;
		setDishes((currentDishes) =>
			currentDishes.filter((i) => i.itemId !== dishId)
		);
	};

	const handleSubmitOrder = async (
		value,
		address,
		min,
		deliveryFee,
		totalPrice,
		currentOperation
	) => {
		const { comment, name, email, phone, PoD, payMethod } = value;
		let rTime1;
		let rTime2;
		if (PoD == "delivery") {
			rTime1 = currentOperation[0].deliverTime[0];
			rTime2 = currentOperation[0].deliverTime[1];
		} else {
			rTime1 = currentOperation[0].pickupTime[0];
			rTime2 = currentOperation[0].pickupTime[1];
		}
		const currentTotalPrice = totalPrice + deliveryFee;
		const payload = {
			status: "pending",
			isPaid: false,
			payMethod: payMethod,
			totalPrice: currentTotalPrice,
			comment: comment,
			name: name,
			address,
			email: email,
			phone: phone,
			orderType: PoD,
			deliveryFee: deliveryFee,
			readyTime1: rTime1,
			readyTime2: rTime2,
			dishes: dishes.map((dish) => ({
				...dish,
				base: dish.base ? dish.base : "",
				size: dish.size ? dish.size : "",
				pastaChoice: dish.pastaChoice
					? dish.pastaChoice.toLowerCase()
					: "",
				price: dish.currentPrice,
				secondHalf: dish.secondHalf
					? dish.secondHalf
					: "No Second half pizza",
				secondHalfPizzaCombo1: dish.secondHalfPizzaCombo1
					? dish.secondHalfPizzaCombo1
					: "No Second half pizza",
				secondHalfPizzaCombo2: dish.secondHalfPizzaCombo2
					? dish.secondHalfPizzaCombo2
					: "No Second half pizza",
				secondHalfPizzaCombo3: dish.secondHalfPizzaCombo3
					? dish.secondHalfPizzaCombo3
					: "No Second half pizza",
			})),
			coupon: "",
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
			clearCart();
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
		disabledBtn,
		handleDishChoose,
	};
};

export default useNewOrder;
