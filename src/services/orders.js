import { get, post, del, put } from "../utils/axios.js";

export const requestAllOrders = () => {
	const url = "/orders";

	return get(url).then((response) => response.data);
};

export const requestSearchOrders = (payload) => {
	const url = "/orders/search";
	const data = { ...payload };

	return post(url, data).then((response) => response.data);
};

export const requestSearchDishes = (payload) => {
	const url = "/orders/searchdishes";
	const data = { ...payload };

	return post(url, data).then((response) => response.data);
};

export const requestOrderStatistics = () => {
	const url = "/orders/statistics";
	return get(url).then((response) => response.data);
};

export const requestCurrentOrders = async () => {
	const url = "/orders/current";

	const { data } = await get(url);
	return data;
};

export const requestUnpaidOrders = async () => {
	const url = "/orders/unpaid";

	const { data } = await get(url);
	return data;
};

export const requestCreateNewOrder = ({
	isPhoneOrder,
	invoiceLang,
	...rest
}) => {
	const url = `/orders/dashboard?isPhoneOrder=${isPhoneOrder}&invoiceLang=${invoiceLang}`; //go to POST(":id")
	const data = { ...rest };

	return post(url, data).then((response) => response.data);
};

export const requestCreatePhoneNewOrder = (payload) => {
	const url = "/orders";
	const data = { ...payload };
	return post(url, data).then((response) => response.data);
};

export const requestCreateThirdPartyOrder = (payload) => {
	const url = "/orders/third-party-order";
	const data = { ...payload };

	return post(url, data).then((response) => response.data);
};

export const requestDeleteOrder = (id) => {
	const url = `/orders/${id}`;

	return del(url).then((response) => response.data);
};

export const requestPayOrder = ({ _id, ...rest }) => {
	const url = `/orders/${_id}`;
	const data = { ...rest };
	return post(url, data).then((response) => response.data);
};

export const requestEditOrder = ({ _id, ...rest }) => {
	const url = `/orders/${_id}`;
	const data = { ...rest };

	return put(url, data).then((response) => response.data);
};

export const requestEditPrintedOrder = (_id) => {
	const url = `/orders/${_id}/printed`;

	return put(url).then((response) => response.data);
};

export const requestCancelOrder = (id) => {
	const url = `/orders/${id}/cancelled`;

	return get(url).then((response) => response.data);
};

export const requestPrintOrder = (id, type) => {
	const url = `/orders/${id}/print?type=${type}`;

	return get(url).then((response) => response.data);
};

export const requestSendExcelReport = () => {
	const url = "/orders/emailme";

	return get(url).then((response) => response.data);
};

export const sendEmail = (value, id) => {
	const url = "/orders/sendEmail";
	const data = { ...value };

	return post(url, data).then((response) => response.data);
};
