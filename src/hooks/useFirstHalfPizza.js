import { useQuery } from "react-query";
import { requestAllDishes } from "../services/dishes";

export const useDishQuery = (select) =>
	useQuery(["fetchDish"], requestAllDishes, { select });

export const useFirstHalfPizza = (firstPizzaName) =>
	useDishQuery((data) => {
		const firstHalfPizza = data.filter(
			({ name }) => name === firstPizzaName
		)
		return firstHalfPizza
	}
	);

