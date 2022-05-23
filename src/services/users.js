import { get, post, del, put } from "../utils/axios.js";

export const requestAllUsers = () => {
	const url = "/users";

	return get(url).then((response) => response.data);
};

export const requestCreateNewUser = (payload) => {
	const url = "/users";
	const data = { ...payload };

	return post(url, data).then((response) => response.data);
};

export const requestDeleteUser = (id) => {
	const url = `/users/${id}`;

	return del(url).then((response) => response.data);
};

export const requestEditUser = (id, payload) => {
	const url = `/users/${id}`;
	const data = { ...payload };

	return put(url, data).then((response) => response.data);
};

export const requestUserLogin = (payload) => {
	const url = "/users/login";
	const data = { ...payload };

	return post(url, data).then((response) => response.data);
};

export const requestGetCurrentUser = () => {
	const url = "/users/me";

	return get(url).then((response) => response.data);
};