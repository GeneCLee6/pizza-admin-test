import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { message } from "antd";

import {
	requestAllCategories,
	requestCreateNewCategory,
	requestDeleteCategory,
	requestEditCategory,
} from "src/services/categories";
import { fuzzyQueryCategories } from "src/utils/helpers";

const createKey = "createCategory";
const deleteKey = "deleteCategory";
const editKey = "editCategory";

const useCategory = () => {
	const {
		isLoading,
		error,
		data: categoriesData,
	} = useQuery("fetchCategories", () => requestAllCategories());
	const queryClient = useQueryClient();

	const [categories, setCategories] = useState([]);
	const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
	const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
	const [currentCategory, setCurrentCategory] = useState(null);

	useEffect(() => {
		categoriesData?.length && setCategories(categoriesData);
	}, [categoriesData]);

	const createCategory = useMutation(
		(payload) => requestCreateNewCategory(payload),
		{
			isLoading: () => {
				message.loading({ content: "正在创建...", createKey });
			},
			onSuccess: () => {
				queryClient.invalidateQueries("fetchCategories");
				message.success({
					content: "创建成功",
					createKey,
					duration: 2,
				});
				setShowNewCategoryModal(false);
			},
			onError: (error) => {
				console.log(error);
				message.error({
					content: "创建失败",
					createKey,
					duration: 2,
				});
			},
		}
	);

	const deleteCategory = useMutation((id) => requestDeleteCategory(id), {
		isLoading: () => {
			message.loading({ content: "正在删除...", deleteKey });
		},
		onSuccess: () => {
			queryClient.invalidateQueries("fetchCategories");
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

	const editCategory = useMutation(
		(payload) => requestEditCategory(currentCategory._id, payload),
		{
			isLoading: () => {
				message.loading({ content: "正在更改...", editKey });
			},
			onSuccess: () => {
				queryClient.invalidateQueries("fetchCategories");
				message.success({
					content: "更改成功",
					editKey,
					duration: 2,
				});
				setShowEditCategoryModal(false);
			},
			onError: (error) => {
				console.log(error);
				message.error({
					content: "更改失败",
					editKey,
					duration: 2,
				});
			},
		}
	);

	const handleCreate = (values) => {
		createCategory.mutate(values);
	};

	const handleDelete = (record) => {
		deleteCategory.mutate(record._id);
	};

	const handleEdit = (values) => {
		editCategory.mutate(values);
	};

	const handleSearch = (value) => {
		const categories = fuzzyQueryCategories(categoriesData, value);
		setCategories(categories);
	};

	return {
		isLoading,
		error,
		categoriesData,
		categories,
		currentCategory,
		setCurrentCategory,
		showNewCategoryModal,
		setShowNewCategoryModal,
		showEditCategoryModal,
		setShowEditCategoryModal,
		handleCreate,
		handleDelete,
		handleEdit,
		handleSearch,
	};
};

export default useCategory;
