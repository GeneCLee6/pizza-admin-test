import { get, post, del, put } from "../utils/axios.js";

export const requestAllDishes = () => {
	const url = "/dishes";

	return get(url).then((response) => response.data);
};

export const requestSearchDishes = (searchString) => {
	// const url = `/dishes/available?dishName=${searchString}`;
	const url = `/dishes/search?dishName=${searchString}`;

	return get(url).then((response) => response.data);
};

export const requesDishID = (searchString) => {
	// const url = `/dishes/available?dishName=${searchString}`;
	const url = `/dishes/dishID?dishName=${searchString}`;

	return get(url).then((response) => response.data);
};

export const requestCreateNewDish = (payload) => {
	const url = "/dishes";
	const data = { ...payload };

	return post(url, data).then((response) => response.data);
};

export const requestDeleteDish = (id) => {
	const url = `/dishes/${id}`;

	return del(url).then((response) => response.data);
};

export const requestEditDish = (id, payload) => {
	const url = `/dishes/${id}`;
	const data = { ...payload };

	return put(url, data).then((response) => response.data);
};

export const requestAllocateSideDish = (id, payload) => {
	const url = `/dishes/${id}`;
	const data = { ...payload };

	return post(url, data).then((response) => response.data);
};

export const requestAllSideDishes = () => {
	const url = "/dishes/sideDish";

	return get(url).then((response) => response.data);
};

export const requestCreateNewSideDish = (payload) => {
	const url = "/dishes/sideDish";
	const data = { ...payload };

	return post(url, data).then((response) => response.data);
};

export const requestEditSideDish = (id, payload) => {
	const url = `/dishes/sideDish/${id}`;
	const data = { ...payload };

	return put(url, data).then((response) => response.data);
};

export const requestDeleteSideDish = (id) => {
	const url = `/dishes/sideDish/${id}`;

	return del(url).then((response) => response.data);
};
