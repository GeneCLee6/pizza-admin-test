import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { message } from "antd";

import {
	requestAllCoupons,
	requestCreateNewCoupon,
	requestDeleteCoupon,
} from "src/services/coupons";

import { fuzzyQueryCoupons } from "src/utils/helpers";

const createKey = "createCoupon";
const deleteKey = "deleteCoupon";

const useCoupons = () => {
	const queryClient = useQueryClient();

	const {
		isLoading,
		error,
		data: couponsData,
	} = useQuery(["fetchCoupons"], () => requestAllCoupons());

	const [showNewCouponDrawer, setShowNewCouponDrawer] = useState(false);
	const [coupons, setCoupons] = useState([]);

	useEffect(() => {
		couponsData?.length && setCoupons(couponsData);
	}, [couponsData]);

	const createCoupon = useMutation((payload) => requestCreateNewCoupon(payload), {
		isLoading: () => {
			message.loading({ content: "Creating...", createKey });
		},
		onSuccess: () => {
			queryClient.invalidateQueries("fetchCoupons");
			message.success({
				content: "Successfully Created",
				createKey,
				duration: 2,
			});
			setShowNewCouponDrawer(false);
		},
		onError: (error) => {
			console.log(error);
			message.error({
				content: "Create Failed",
				createKey,
				duration: 2,
			});
		},
	});

	const deleteCoupon = useMutation((id) => requestDeleteCoupon(id), {
		isLoading: () => {
			message.loading({ content: "Deleting...", deleteKey });
		},
		onSuccess: () => {
			queryClient.invalidateQueries("fetchCoupons");
			message.success({
				content: "Successfully Deleted",
				deleteKey,
				duration: 2,
			});
		},
		onError: (error) => {
			console.log(error);
			message.error({ content: "Delete Failed", deleteKey, duration: 2 });
		},
	});

	const handleCreate = (values) => {
		const payload = {
			...values,
			code: 0,
		};
		createCoupon.mutate(payload);
	};

	const handleDelete = (record) => {
		deleteCoupon.mutate(record.code);
	};

	const handleSearch = (value) => {
		const coupons = fuzzyQueryCoupons(couponsData, value);
		setCoupons(coupons);
	};

	return {
		isLoading,
		error,
		couponsData,
		coupons,
		setCoupons,
		showNewCouponDrawer,
		setShowNewCouponDrawer,
		handleCreate,
		handleDelete,
		handleSearch,
	};
};

export default useCoupons;
