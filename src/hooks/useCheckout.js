import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { message, notification } from "antd";
import { requestCreateNewOrder, requestEditOrder } from "src/services/orders";

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

		case "mix":
			return {
				cardPaid: totalPrice - cashPaid,
				cashPaidRes: cashPaid,
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

const editKey = "editOrder";

const useCheckout = (setShowCheckoutModal, form, setDishes) => {
	const [payMethod, setPayMethod] = useState();
	const [orderType, setOrderType] = useState();
	const [cashPaid, setCashPaid] = useState();
	const [cashier, setCashier] = useState();
	const [disabledBtn, setDisabledBtn] = useState(true);
	const [invoiceLang, setInvoiceLang] = useState("en");

	const queryClient = useQueryClient();

	const editOrder = useMutation((payload) => requestEditOrder(payload), {
		onSuccess: () => {
			queryClient.invalidateQueries("fetchCurrentOrders");
			message.success({
				content: "提交成功",
				editKey,
				duration: 2,
			});
			setShowCheckoutModal(false);
		},
		onError: (error) => {
			message.error({
				content: `提交失败，${error?.response?.data?.message}`,
				editKey,
				duration: 2,
			});
		},
	});

	const handleTogglePayMethod = (e) => {
		setPayMethod(e.target.value);
	};

	const handleSetCashPaid = (amount) => {
		setCashPaid(amount);
	};

	const handleSetCashier = (cashier) => {
		setCashier(cashier);
	};

	const handleToggleInvoiceLang = (e) => {
		setInvoiceLang(e.target.value);
	};

	const handleToggleOrderType = (e) => {
		setOrderType(e.target.value);
	};

	const handleCheckout = async (currentOrder, option) => {
		const { _id, comment, totalPrice, dishes } = currentOrder;
		const orderDishes = dishes.map(({ _id, quantity, sideDishes }) => ({
			_id,
			quantity,
			sideDishes,
		}));

		// const { cashPaidRes, cardPaid } = calculatePayment(
		// 	payMethod,
		// 	orderTotalPrice,
		// 	cashPaid
		// );
		if (!_id) {
			const payload = {
				orderType,
				totalPrice,
				comment,
				payMethod,
				dishes: orderDishes,
			};
			try {
				message.loading({ content: "正在提交...", editKey });
				setDisabledBtn(true);
				const createRes = await requestCreateNewOrder(payload);
				message.success({
					content: "提交成功",
					editKey,
					duration: 2,
				});
				// Check print

				if (createRes) {
					if (createRes?.code === 0) return;
					if (createRes?.code === 999) {
						notification.error({
							message: "打印失败",
							description: "打印机网络不稳定，请稍后再试",
						});
					} else {
						notification.error({
							message: "打印失败",
							description: createRes,
						});
					}
				}
				setShowCheckoutModal(false);
				setDishes([]);
				form.resetFields();
			} catch (error) {
				message.error({
					content: `提交失败，${error?.response?.data?.message}`,
					editKey,
					duration: 2,
				});
			}

			return;
		}

		const payload = {
			_id,
			orderType,
			totalPrice,
			comment,
			dishes: orderDishes,
		};
		message.loading({ content: "正在提交...", editKey });
		setDisabledBtn(true);
		//	requestEditOrder(payload);
		editOrder.mutate(payload);
	};

	useEffect(() => {
		const checkBtnStatus = () => {
			const isMixPay = payMethod === "mix";
			if (orderType && payMethod && cashier) {
				if (!isMixPay || cashPaid) return setDisabledBtn(false);
				setDisabledBtn(true);
			}
			setDisabledBtn(true);
		};

		checkBtnStatus();
	}, [cashPaid, cashier, orderType, payMethod]);

	useEffect(() => {
		const { data } = editOrder;

		if (data) {
			if (data?.code === 0) return;
			if (data?.code === 999) {
				notification.error({
					message: "打印失败",
					description: "打印机网络不稳定，请稍后再试",
				});
			} else {
				notification.error({
					message: "打印失败",
					description: data,
				});
			}
		}
	}, [editOrder]);

	return {
		payMethod,
		cashPaid,
		orderType,
		handleTogglePayMethod,
		handleSetCashPaid,
		handleSetCashier,
		handleToggleOrderType,
		disabledBtn,
		handleCheckout,
		invoiceLang,
		handleToggleInvoiceLang,
	};
};

export default useCheckout;
