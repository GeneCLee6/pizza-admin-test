import { useState, useEffect } from "react";
import { priceRounder } from "src/utils/helpers";
import { nanoid } from "nanoid";
import { message, notification } from "antd";
import { requestCreateThirdPartyOrder } from "src/services/orders";

const createKey = "createOrder";

const useThirdPartyOrder = (form) => {
	const [dishes, setDishes] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [orderTotalPrice, setOrderTotalPrice] = useState(0);
	const [showAddOrderDishModal, setShowAddOrderDishModal] = useState(false);
	const [showAddSideDishModal, setShowAddSideDishModal] = useState(false);
	const [selectedSideDishItem, setSelectedSideDishItem] = useState(null);

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
		const { _id: dishId } = record;
		setDishes((currentDishes) => {
			const newDishes = currentDishes.map((i) => {
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
		setIsSubmitting(true);
		const { orderSource, comment } = value;
		const payload = {
			orderSource,
			dishes,
			orderTotalPrice,
			tableNum: "-",
			payStatus: "paid",
			orderStatus: "done",
			cashier: "-",
			comment: !comment ? "" : comment,
			payMethod: orderSource,
		};
		try {
			message.loading({ content: "正在提交...", createKey });
			const res = await requestCreateThirdPartyOrder(payload);
			message.success({
				content: "提交成功",
				createKey,
				duration: 2,
			});
			setDishes([]);
			setIsSubmitting(false);
			form.resetFields();
			if (res?.code === 0) return;
			if (res?.error) {
				notification.error({
					message: "打印失败",
					description: res?.error,
				});
				return;
			}
			notification.error({
				message: "打印失败",
				description: res?.message,
			});
		} catch (error) {
			message.error({
				content: `提交失败，${error?.response?.data?.message}`,
				createKey,
				duration: 2,
			});
			setIsSubmitting(false);
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

	return {
		dishes,
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
		isSubmitting,
	};
};

export default useThirdPartyOrder;
