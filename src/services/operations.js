import { get, post, del, put } from "../utils/axios.js";

export const requestAllOperations = () => {
	const url = "/operations";
	return get(url).then((response) => response.data);
};

export const requestUpdateOperation = (id) => {
	const url = `/operations/${id}`;
	return put(url).then((response) => response.data);
};

export const requestCurrentOperation = async () => {
	const url = "/operations/current";
	return await get(url).then((response) => response.data);
};
