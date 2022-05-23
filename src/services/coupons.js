import { get, post, del, put } from "../utils/axios.js";

export const requestAllCoupons = () => {
	const url = "/coupons";

	return get(url).then((response) => response.data);
};

export const requestSearchCoupons = (searchString) => {
	const url = `/coupons/${searchString}`;

	return get(url).then((response) => response.data);
};

export const requestCreateNewCoupon = (payload) => {
	const url = "/coupons";
	const data = { ...payload };

	return post(url, data).then((response) => response.data);
};

export const requestDeleteCoupon = (code) => {
	const url = `/coupons/${code}`;

	return del(url).then((response) => response.data);
};
