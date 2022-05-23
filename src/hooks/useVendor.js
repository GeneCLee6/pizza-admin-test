import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { message } from "antd";
import {
	requestAllVendors,
	requestCreateNewVendor,
	requestDeleteVendor,
	requestEditVendor,
} from "src/services/vendors";
import { fuzzyQueryVendors } from "src/utils/helpers";

const createKey = "createVendor";
const deleteKey = "deleteVendor";
const editKey = "editVendor";

const useVendor = () => {
	const [vendors, setVendors] = useState([]);
	const [showNewVendorModal, setShowNewVendorModal] = useState(false);
	const [showEditVendorModal, setShowEditVendorModal] = useState(false);
	const [currentVendor, setCurrentVendor] = useState(null);

	const {
		isLoading,
		error,
		data: vendorsData,
	} = useQuery(["fetchVendors"], () => requestAllVendors());

	const queryClient = useQueryClient();

	useEffect(() => {
		setVendors(vendorsData);
	}, [vendorsData]);

	const createVendor = useMutation(
		(payload) => requestCreateNewVendor(payload),
		{
			isLoading: () => {
				message.loading({ content: "正在创建...", createKey });
			},
			onSuccess: () => {
				queryClient.invalidateQueries("fetchVendors");
				message.success({
					content: "创建成功",
					createKey,
					duration: 2,
				});
				setShowNewVendorModal(false);
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

	const deleteVendor = useMutation((id) => requestDeleteVendor(id), {
		isLoading: () => {
			message.loading({ content: "正在删除...", deleteKey });
		},
		onSuccess: () => {
			queryClient.invalidateQueries("fetchVendors");
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

	const editVendor = useMutation(
		(payload) => requestEditVendor(currentVendor._id, payload),
		{
			isLoading: () => {
				message.loading({ content: "正在更改...", editKey });
			},
			onSuccess: () => {
				queryClient.invalidateQueries("fetchVendors");
				message.success({
					content: "更改成功",
					editKey,
					duration: 2,
				});
				setShowEditVendorModal(false);
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

	const handleCreate = async (fieldsValue) => {
		const payload = {
			...fieldsValue,
			vendorDate: fieldsValue?.vendorDate?.toDate(),
		};
		createVendor.mutate(payload);
	};

	const handleDelete = (record) => {
		deleteVendor.mutate(record._id);
	};

	const handleEdit = (fieldsValue) => {
		const payload = {
			...fieldsValue,
			vendorDate: fieldsValue?.vendorDate?.toDate(),
		};
		editVendor.mutate(payload);
	};

	const handleSearch = (value) => {
		const vendors = fuzzyQueryVendors(vendorsData, value);
		setVendors(vendors);
	};

	return {
		isLoading,
		error,
		vendors,
		handleCreate,
		handleDelete,
		handleEdit,
		showNewVendorModal,
		setShowNewVendorModal,
		showEditVendorModal,
		setShowEditVendorModal,
		currentVendor,
		setCurrentVendor,
		handleSearch,
	};
};

export default useVendor;
