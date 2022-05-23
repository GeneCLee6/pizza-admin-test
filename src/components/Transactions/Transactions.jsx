import { Space, Skeleton, Table, Button, Tooltip, Drawer } from "antd";
import * as dayjs from "dayjs";
import { priceFormatter } from "src/utils/helpers";
import formatDate from "src/utils/format-date";
import useTransaction from "src/hooks/useTransaction";
import TransactionDetail from "./TransactionDetail";

const Transactions = () => {
	const {
		isLoading,
		error,
		orders,
		showTransactionDetailDrawer,
		setShowTransactionDetailDrawer,
		currentTransaction,
		setCurrentTransaction,
	} = useTransaction();

	const columns = [
		{
			title: "订单号",
			dataIndex: "orderNum",
			align: "center",
		},
		{
			title: "时间",
			dataIndex: "createdAt",
			defaultSortOrder: "descend",
			align: "center",
			sorter: (a, b) => dayjs(a.createdAt) - dayjs(b.createdAt),
			render: (date) => <div>{formatDate(date)}</div>,
		},
		{
			title: "菜品",
			key: "_id",
			dataIndex: "dishes",
			width: "180px",
			render: (dishes) => {
				return dishes?.map(
					({ _id, dishName, extraToppings, secondHalfPizza }) => {
						return (
							<div key={_id}>
								<div className="fw-600">{`pizza:${dishName}`}</div>
								<div className="fw-600">{`second pizza:${secondHalfPizza}`}</div>
								{
									<div className="secondary fs-xs">
										Extra Toppings:
										{extraToppings.map((i) => {
											return ` ${i} `;
										})}
									</div>
								}
							</div>
						);
					}
				);
			},
		},

		{
			title: "备注",
			dataIndex: "comment",
			ellipsis: {
				showTitle: false,
			},
			width: "90px",
			render: (comment) => (
				<Tooltip placement="topLeft" title={comment}>
					{comment}
				</Tooltip>
			),
		},
		{
			title: "总金额",
			dataIndex: "totalPrice",
			align: "center",
			render: (price) => <span>{priceFormatter(price)}</span>,
		},
		{
			title: "订单类型",
			dataIndex: "orderType",
			align: "center",
		},
		{
			title: "订单状态",
			dataIndex: "status",
			align: "center",
		},
		{
			title: "支付方法",
			dataIndex: "payMethod",
			align: "center",
		},
		{
			title: "操作",
			render: (_, record) => {
				return (
					<Button
						type="primary"
						onClick={() => {
							setCurrentTransaction(record);
							setShowTransactionDetailDrawer(true);
						}}
					>
						详情
					</Button>
				);
			},
		},
	];

	return (
		<div>
			<h1 className="font-weight-bold fs-lg">历史订单</h1>
			<div className="my-3">
				{error && <div>Something went wrong ...</div>}
				<Space />

				{isLoading ? (
					<Skeleton active />
				) : (
					<Table
						columns={columns}
						rowKey={(record) => record._id}
						dataSource={orders}
					/>
				)}
			</div>
			<Drawer
				width={460}
				onClose={() => setShowTransactionDetailDrawer(false)}
				visible={showTransactionDetailDrawer}
				bodyStyle={{ paddingBottom: 80 }}
				destroyOnClose
				closable={false}
			>
				<TransactionDetail currentTransaction={currentTransaction} />
			</Drawer>
		</div>
	);
};

export default Transactions;
