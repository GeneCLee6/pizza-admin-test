import { useQuery } from "react-query";
import { requestAllDishes } from "../services/dishes";

export const useDishQuery = (select) =>
	useQuery(["fetchDish"], requestAllDishes, { select });

export const useSecondHalfPizza = (firstPizzaName) =>
	useDishQuery((data) => {
		const secondHalfPizza = data.filter(
			({ dishType, name }) => dishType === "pizza" && name !== firstPizzaName
		)
		return secondHalfPizza
	});

