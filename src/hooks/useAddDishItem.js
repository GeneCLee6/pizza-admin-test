import { useEffect, useState } from "react";
import { useQuery } from "react-query";
// import { message } from "antd";
import { requestListCategoryDishes } from "src/services/categories";
import { requestSearchDishes } from "src/services/dishes";

const useAddDishItem = (categories) => {
	const [dishes, setDishes] = useState([]);
	const [categoryId, setCategoryId] = useState();
	const [searchString, setSearchString] = useState();
	const { data: categoryDishes } = useQuery(
		["categoryDishes", categoryId],
		() => requestListCategoryDishes(categoryId),
		{
			enabled: !!categoryId,
		}
	);

	const { data: searchDishes } = useQuery(
		["searchDishes", searchString],
		() => requestSearchDishes(searchString),
		{
			enabled: !!searchString,
		}
	);

	const handleSearch = (string) => {
		setSearchString(string);
	};

	useEffect(() => {
		setDishes(searchDishes);
	}, [searchDishes, searchString]);

	useEffect(() => {
		const availableDishes = categoryDishes?.filter((i) => !i?.offShelf);
		setDishes(availableDishes);
	}, [categoryDishes]);

	useEffect(() => {
		setCategoryId(categories[0]?._id);
	}, [categories]);

	return {
		categoryId,
		setCategoryId,
		dishes,
		handleSearch,
	};
};

export default useAddDishItem;
