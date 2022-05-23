import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { message } from "antd";
import {
	requestAllSideDishes,
	requestCreateNewSideDish,
	requestDeleteSideDish,
	requestEditSideDish,
	requestAllocateSideDish,
} from "src/services/dishes";
import { fuzzyQuerySideDishes } from "src/utils/helpers";

const createKey = "createSideDish";
const deleteKey = "deleteSideDish";
const editKey = "editSideDish";
const allocateKey = "allocateSideDish";

const useSideDishes = () => {
	const [sideDishes, setSideDishes] = useState([]);
	const [showNewSideDishModal, setShowNewSideDishModal] = useState(false);
	const [showEditSideDishModal, setShowEditSideDishModal] = useState(false);
	const [showAllocateSideDishModal, setShowAllocateSideDishModal] =
		useState(false);
	const [currentSideDish, setCurrentSideDish] = useState(null);
	const [selectedDish, setSelectedDish] = useState(null);
	const [checkedSideDishes, setCheckedSideDishes] = useState([]);

	const queryClient = useQueryClient();
	const {
		isLoading,
		error,
		data: sideDishesData,
	} = useQuery(["fetchSideDishes"], () => requestAllSideDishes());

	const createSideDish = useMutation(
		(payload) => requestCreateNewSideDish(payload),
		{
			isLoading: () => {
				message.loading({ content: "正在创建...", createKey });
			},
			onSuccess: () => {
				queryClient.invalidateQueries("fetchSideDishes");
				message.success({
					content: "创建成功",
					createKey,
					duration: 2,
				});
				setShowNewSideDishModal(false);
			},
			onError: (error) => {
				console.log(error);
				message.error({ content: "创建失败", createKey, duration: 2 });
			},
		}
	);

	const deleteSideDish = useMutation((id) => requestDeleteSideDish(id), {
		isLoading: () => {
			message.loading({ content: "正在删除...", deleteKey });
		},
		onSuccess: () => {
			queryClient.invalidateQueries("fetchSideDishes");
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

	const editSideDish = useMutation(
		(payload) => requestEditSideDish(currentSideDish._id, payload),
		{
			isLoading: () => {
				message.loading({ content: "正在更改...", editKey });
			},
			onSuccess: () => {
				queryClient.invalidateQueries("fetchSideDishes");
				message.success({ content: "更改成功", editKey, duration: 2 });
				setShowEditSideDishModal(false);
			},
			onError: (error) => {
				console.log(error);
				message.error({ content: "更改失败", editKey, duration: 2 });
			},
		}
	);

	const allocateSideDish = useMutation(
		(payload) => requestAllocateSideDish(selectedDish._id, payload),
		{
			isLoading: () => {
				message.loading({ content: "正在更改...", allocateKey });
			},
			onSuccess: () => {
				// TODO Can be removed
				queryClient.invalidateQueries("fetchDishes");
				message.success({
					content: "更改成功",
					allocateKey,
					duration: 2,
				});
				setShowAllocateSideDishModal(false);
			},
			onError: (error) => {
				console.log(error);
				message.error({
					content: "更改失败",
					allocateKey,
					duration: 2,
				});
			},
		}
	);

	const handleCreate = (values) => {
		createSideDish.mutate(values);
	};

	const handleDelete = (record) => {
		deleteSideDish.mutate(record._id);
	};

	const handleEdit = (values) => {
		editSideDish.mutate(values);
	};

	const handleAllocate = () => {
		const payload = { sideDishes: checkedSideDishes };
		allocateSideDish.mutate(payload);
	};

	const toggleWithSideDishDishes = (dish) => {
		setSelectedDish(dish);
		setShowAllocateSideDishModal(true);
	};

	const handleCheckSideDish = (value) => {
		setCheckedSideDishes(value);
	};

	const handleSearch = (value) => {
		const sideDishes = fuzzyQuerySideDishes(sideDishesData, value);
		setSideDishes(sideDishes);
	};

	useEffect(() => {
		setSideDishes(sideDishesData);
	}, [sideDishesData]);

	return {
		sideDishes,
		isLoading,
		error,
		showEditSideDishModal,
		setShowEditSideDishModal,
		currentSideDish,
		setCurrentSideDish,
		showNewSideDishModal,
		setShowNewSideDishModal,
		showAllocateSideDishModal,
		setShowAllocateSideDishModal,
		handleCreate,
		handleDelete,
		handleEdit,
		handleAllocate,
		toggleWithSideDishDishes,
		selectedDish,
		handleCheckSideDish,
		handleSearch,
	};
};

export default useSideDishes;
