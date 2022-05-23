import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { message } from "antd";

import {
	requestAllDishes,
	requestCreateNewDish,
	requestDeleteDish,
	requestEditDish,
} from "src/services/dishes";
import { fuzzyQueryDishes } from "src/utils/helpers";

const createKey = "createDish";
const deleteKey = "deleteDish";
const editKey = "editDish";

const useDishes = () => {
	const queryClient = useQueryClient();

	const {
		isLoading,
		error,
		data: dishesData,
	} = useQuery(["fetchDishes"], () => requestAllDishes());

	const [showNewDishDrawer, setShowNewDishDrawer] = useState(false);
	const [dishes, setDishes] = useState([]);

	const [showEditDishDrawer, setShowEditDishDrawer] = useState(false);
	const [currentDish, setCurrentDish] = useState(null);

	useEffect(() => {
		dishesData?.length && setDishes(dishesData);
	}, [dishesData]);

	const createDish = useMutation((payload) => requestCreateNewDish(payload), {
		isLoading: () => {
			message.loading({ content: "正在创建...", createKey });
		},
		onSuccess: () => {
			queryClient.invalidateQueries("fetchDishes");
			message.success({
				content: "创建成功",
				createKey,
				duration: 2,
			});
			setShowNewDishDrawer(false);
		},
		onError: (error) => {
			console.log(error);
			message.error({
				content: "创建失败",
				createKey,
				duration: 2,
			});
		},
	});

	const deleteDish = useMutation((id) => requestDeleteDish(id), {
		isLoading: () => {
			message.loading({ content: "正在删除...", deleteKey });
		},
		onSuccess: () => {
			queryClient.invalidateQueries("fetchDishes");
			message.success({
				content: "删除成功",
				deleteKey,
				duration: 2,
			});
		},
		onError: (error) => {
			console.log(error);
			message.error({ content: "删除失败", deleteKey, duration: 2 });
		},
	});

	const editDish = useMutation(
		(payload) => requestEditDish(currentDish._id, payload),
		{
			isLoading: () => {
				message.loading({ content: "正在编辑...", editKey });
			},
			onSuccess: () => {
				queryClient.invalidateQueries("fetchDishes");
				message.success({
					content: "编辑成功",
					editKey,
					duration: 2,
				});
				setShowEditDishDrawer(false);
			},
			onError: (error) => {
				console.log(error);
				message.error({
					content: "编辑失败",
					editKey,
					duration: 2,
				});
			},
		}
	);

	const handleCreate = (values) => {
		const payload = {
			...values,
			photo: values?.photo && values.photo[0].response.filePath,
		};
		createDish.mutate(payload);
	};

	const handleDelete = (record) => {
		deleteDish.mutate(record._id);
	};

	const handleEdit = (values) => {
		const payload = {
			...values,
			photo: values?.photo && values.photo[0].response.filePath,
		};
		editDish.mutate(payload);
	};

	const onCategoryChange = (e) => {
		const filter = e.target.value;
		if (filter === "all") return setDishes(dishesData);
		const filteredDishes = dishesData?.filter(
			(i) => i?.category?.categoryCnName === e.target.value
		);
		setDishes(filteredDishes);
	};

	const handleSearch = (value) => {
		const dishes = fuzzyQueryDishes(dishesData, value);
		setDishes(dishes);
	};

	const useDishQuery = (select) =>
		useQuery(["fetchDish"], requestAllDishes, { select });

	const useStandardPizza = () => 
		useDishQuery((data) => {
			const standPizzaArray = data.filter(
				(dish) => dish.category.categoryName === 'Standard Pizza'
			);
			let standPizzaNameArray = [];
			standPizzaArray.forEach((element) => {
				standPizzaNameArray.push(element.name);
			});
			return standPizzaNameArray;
		});


	return {
		isLoading,
		error,
		dishesData,
		dishes,
		setDishes,
		currentDish,
		setCurrentDish,
		showNewDishDrawer,
		setShowNewDishDrawer,
		showEditDishDrawer,
		setShowEditDishDrawer,
		handleCreate,
		handleDelete,
		handleEdit,
		onCategoryChange,
		handleSearch,
		useStandardPizza,
	};
};

export default useDishes;
