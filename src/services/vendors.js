import { get, post, del, put } from "../utils/axios.js";

export const requestAllVendors = () => {
	const url = "/vendors";

	return get(url).then((response) => response.data);
};

export const requestCreateNewVendor = (payload) => {
	const url = "/vendors";
	const data = { ...payload };

	return post(url, data).then((response) => response.data);
};

export const requestDeleteVendor = (id) => {
	const url = `/vendors/${id}`;

	return del(url).then((response) => response.data);
};

export const requestEditVendor = (id, payload) => {
	const url = `/vendors/${id}`;
	const data = { ...payload };

	return put(url, data).then((response) => response.data);
};
