import { get, post, del, put } from "../utils/axios.js";

export const requestAllCategories = () => {
	const url = "/categories";

	return get(url).then((response) => response.data);
};

export const requestCreateNewCategory = (payload) => {
	const url = "/categories";
	const data = { ...payload };

	return post(url, data).then((response) => response.data);
};

export const requestDeleteCategory = (id) => {
	const url = `/categories/${id}`;

	return del(url).then((response) => response.data);
};

export const requestEditCategory = (id, payload) => {
	const url = `/categories/offshelf/${id}`;
	const data = { ...payload };

	return post(url, data).then((response) => response.data);
};

export const requestListCategoryDishes = (id) => {
	const url = `/categories/${id}/dishes`;

	return get(url).then((response) => response.data);
};
