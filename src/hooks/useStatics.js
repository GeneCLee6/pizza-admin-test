import { useState } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import {
	requestOrderStatistics,
	requestSearchOrders,
	requestSearchDishes,
} from "src/services/orders";

const useStatics = () => {
	const {
		isLoading,
		error,
		data: statisticsData,
	} = useQuery("fetchStatistics", () => requestOrderStatistics());

	const [dateRange, setDateRange] = useState({
		startDate: dayjs().startOf("day"),
		endDate: dayjs().endOf("day"),
	});

	const { data: searchData } = useQuery(
		["searchOrders", dateRange],
		() => requestSearchOrders(dateRange),
		{ enabled: !!dateRange }
	);

	const { data: searchDishData } = useQuery(
		["searchDishs", dateRange],
		() => requestSearchDishes(dateRange),
		{ enabled: !!dateRange }
	);

	const handleDateChange = (dates) => {
		setDateRange({
			startDate: dayjs(dates[0]).startOf("day"),
			endDate: dayjs(dates[1]).endOf("day"),
		});
	};

	return {
		isLoading,
		error,
		summary: statisticsData?.summary,
		trends: statisticsData?.trends,
		handleDateChange,
		searchData,
		searchDishData,
	};
};

export default useStatics;
