import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { message } from "antd";

import {
	requestAllOperations,
	requestUpdateOperation,
	requestCurrentOperation,
} from "src/services/operations";
const updateKey = "updateOperation";

const useOperations = () => {
	const queryClient = useQueryClient();

	const { isLoading, error, data: operationsData } = useQuery(
		["fetchOperations"],
		() => requestAllOperations()
	);

	const { data: currentOperationData } = useQuery(
		["fetchCurrentOperation"],
		() => requestCurrentOperation()
	);

	const [operations, setOperations] = useState([]);

	const [currentOperation, setCurrentOperation] = useState(null);
	useEffect(() => {
		operationsData?.length && setOperations(operationsData);
	}, [operationsData]);

	useEffect(() => {
		currentOperationData?.length &&
			setCurrentOperation(currentOperationData);
	}, [currentOperationData]);

	const updateOperation = useMutation((id) => requestUpdateOperation(id), {
		isLoading: () => {
			message.loading({ content: "Updating...", updateKey });
		},
		onSuccess: () => {
			queryClient.invalidateQueries("UpdateOperation");
			message.success({
				content: "Successfully Updated",
				updateKey,
				duration: 2,
			});
			requestCurrentOperation().then((response) => {
				setCurrentOperation(response);
			});
		},
		onError: (error) => {
			console.log(error);
			message.error({ content: "Update Failed", updateKey, duration: 2 });
		},
	});

	const handleConfirm = (record) => {
		updateOperation.mutate(record._id);
	};

	return {
		isLoading,
		error,
		operationsData,
		operations,
		currentOperation,
		setOperations,
		handleConfirm,
	};
};

export default useOperations;
