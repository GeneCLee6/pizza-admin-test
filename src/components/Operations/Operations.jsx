import { Space, Skeleton, Table, Popconfirm } from "antd";
import useOperations from "src/hooks/useOperation";

const Operations = () => {
	const { isLoading, error, operations, currentOperation, handleConfirm } =
		useOperations();

	const columns = [
		{
			title: "Mode",
			dataIndex: "mode",
			align: "center",
		},
		{
			title: "Pick up time",
			dataIndex: "pickupTime",
			defaultSortOrder: "descend",
			align: "center",
			render: (pickupTime) => {
				return <div>{`min:${pickupTime[0]} max:${pickupTime[1]}`}</div>;
			},
		},
		{
			title: "Delivery time",
			dataIndex: "deliverTime",
			defaultSortOrder: "descend",
			align: "center",
			render: (deliverTime) => {
				return (
					<div>{`min:${deliverTime[0]} max:${deliverTime[1]}`}</div>
				);
			},
		},
		{
			title: "Action",
			render: (_, record) => {
				return (
					<Space size="middle">
						<Popconfirm
							title="Please confirm whether you would like to change the mode"
							onConfirm={() => handleConfirm(record)}
							okText="Yes"
							cancelText="No"
						>
							<a href="#">Change to this mode</a>
						</Popconfirm>
					</Space>
				);
			},
		},
	];

	console.log("currentOperation", currentOperation);

	return (
		<div>
			<h1 className="font-weight-bold fs-lg">
				Current Mode:
				{currentOperation ? currentOperation[0].mode : null}
			</h1>
			<div className="my-3">
				{error && <div>Something went wrong ...</div>}
				<Space />

				{isLoading ? (
					<Skeleton active />
				) : (
					<Table
						columns={columns}
						rowKey={(record) => record._id}
						dataSource={operations}
					/>
				)}
			</div>
		</div>
	);
};

export default Operations;
