import { get } from "../utils/axios.js";

export const requestAllToppings = () => {
	const url = "/toppings";
	const x = get(url).then((response) => response.data);
	return get(url).then((response) => response.data);
};
