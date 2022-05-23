import Image from "next/image";
import {
	Space,
	Skeleton,
	Button,
	Table,
	Popconfirm,
	Input,
	Modal,
	Radio,
} from "antd";
import AddDishItem from "./AddDishItem";
import AddSideDishItem from "./AddSideDishItem";
import Checkout from "./Checkout";
import { MinusOutlined, PlusOutlined, DeleteTwoTone } from "@ant-design/icons";
import useOrder from "src/hooks/useOrder";
import usePrint from "src/hooks/usePrint";
import { priceFormatter, throttle } from "src/utils/helpers";
import classes from "./style.module.less";
import { useState } from "react";
import useOperations from "src/hooks/useOperation";

const { TextArea } = Input;

const Orders = () => {
	//	const [form] = Form.useForm();
	const {
		isLoading,
		error,
		currentOrders,
		currentOrder,
		handleToggleTable,
		handleChangeTotalPrice,
		handleToggleDishQuantity,
		handleDeleteDish,
		handleAddDish,
		showCheckoutModal,
		setShowCheckoutModal,
		showConfirmCancelOrder,
		showAddOrderDishModal,
		setShowAddOrderDishModal,
		showAddSideDishModal,
		setShowAddSideDishModal,
		selectedSideDishItem,
		handleAddSideDishItem,
		handleSendEmail,
	} = useOrder();

	const { currentOperation } = useOperations();

	const { handlePrint } = usePrint();
	//const [emailModal, setEmailModal] = useState(false);

	const columns = [
		{
			title: "图片",
			dataIndex: "photo",
			width: "80px",
			render: (photo) => {
				if (!photo) return null;
				return (
					<Image
						alt="dish photo"
						src={photo}
						width={80}
						height={80}
					/>
				);
			},
		},
		{
			title: "菜品",
			dataIndex: ["dishID", "name"],
			render: (name, record) => {
				const { secondHalf, specialPizzaNotes, extraToppings } = record;
				let hasExtraToppings = true;
				let hasSecondHalf = true;
				let hasSpecial = true;

				if (specialPizzaNotes == "") {
					hasSpecial = false;
				}

				if (extraToppings == "") {
					hasExtraToppings = false;
				}

				if (
					secondHalf?.name == "No Second half pizza" ||
					secondHalf === null
				) {
					hasSecondHalf = false;
				}

				return (
					<Space direction="vertical">
						<strong className="fs-md">{name}</strong>

						{hasExtraToppings ? (
							<div className="secondary">
								Extra Toppings:
								{extraToppings.map((i) => {
									return ` ${i} `;
								})}
							</div>
						) : null}
						{hasSecondHalf ? (
							<div className="secondary">
								Second Half: {secondHalf?.name}
							</div>
						) : null}
						{hasSpecial ? (
							<div className="secondary">
								Special:
								{specialPizzaNotes.map((i) => {
									return ` ${i} `;
								})}
							</div>
						) : null}
					</Space>
				);
			},
		},

		{
			title: "数量",
			width: "180px",
			dataIndex: "quantity",
			render: (quantity, record) => {
				return (
					<>
						<Button
							onClick={() =>
								handleToggleDishQuantity(record, "decrease")
							}
						>
							<MinusOutlined />
						</Button>
						<span className="px-3">{quantity}</span>
						<Button
							onClick={() =>
								handleToggleDishQuantity(record, "increase")
							}
						>
							<PlusOutlined />
						</Button>
					</>
				);
			},
		},
		{
			title: "小计",
			dataIndex: "price",
			render: (price, record) => {
				return <span>{priceFormatter(price * record.quantity)}</span>;
			},
		},

		{
			title: "操作",
			render: (_, record) => {
				return (
					<Space size="middle">
						<Popconfirm
							title="确认删除该菜品?"
							onConfirm={() => handleDeleteDish(record)}
							okText="确定"
							cancelText="取消"
						>
							<DeleteTwoTone
								twoToneColor="#c53030"
								style={{ fontSize: "16px" }}
							/>
						</Popconfirm>
					</Space>
				);
			},
		},
	];

	return (
		<>
			<div className={classes.buttonWrapper}>
				<Radio.Group
					onChange={handleToggleTable}
					size="large"
					value={currentOrder?._id}
				>
					<Space wrap size="middle">
						{isLoading ? (
							<Skeleton active />
						) : (
							<>
								{currentOrders?.map(({ _id, orderNum }) => (
									<Radio.Button key={_id} value={_id}>
										{" "}
										Order Number: {orderNum}
									</Radio.Button>
								))}
							</>
						)}
					</Space>
				</Radio.Group>
			</div>
			<div className="p-3 bg-white">
				{error && <div>Something went wrong ...</div>}
				<Space />

				{isLoading ? (
					<Skeleton active />
				) : (
					<>
						<div className="d-flex justify-content-between align-items-center mb-2">
							{currentOrder ? (
								<>
									<span className="fs-lg fw-600">
										订单号: {currentOrder?.orderNum}
									</span>
									<span className="fs-lg fw-600">
										合计: ${currentOrder?.totalPrice}
									</span>
								</>
							) : null}
						</div>
						<Table
							columns={columns}
							rowKey={(record) => record?.itemId || record?._id}
							dataSource={currentOrder?.dishes}
							showHeader={false}
							pagination={false}
							className="border border-bottom-0"
						/>
						{currentOrder ? (
							<>
								<h3 className="fs-md  mt-5">Total Price</h3>
								<TextArea
									rows={1}
									value={currentOrder?.totalPrice}
									onChange={handleChangeTotalPrice}
								/>
								<div className="my-3 d-flex flex-row-reverse">
									<Space>
										<Button
											onClick={() => {
												// setEmailModal(true)
												handleSendEmail(
													currentOrder,
													currentOperation
												);
											}}
										>
											Email
										</Button>
										<Button
											onClick={throttle(() =>
												handlePrint(
													currentOrder?._id,
													"kitchen"
												)
											)}
											size="large"
											type="dashed"
										>
											打印厨房小票啦
										</Button>
										<Button
											type="primary"
											size="large"
											onClick={() =>
												setShowCheckoutModal(true)
											}
										>
											结算
										</Button>

										<Button
											size="large"
											onClick={() =>
												showConfirmCancelOrder()
											}
										>
											取消
										</Button>
									</Space>
								</div>
							</>
						) : null}
					</>
				)}
			</div>
			<Modal
				visible={showAddOrderDishModal}
				title="选择菜品"
				okText="确定"
				cancelText="取消"
				destroyOnClose
				onCancel={() => {
					setShowAddOrderDishModal(false);
				}}
				width={800}
				footer={null}
			>
				<AddDishItem
					handleAddDish={handleAddDish}
					//currentCategory={currentCategory}
				/>
			</Modal>
			<Modal
				visible={showAddSideDishModal}
				title="请选择配菜"
				okText="确定"
				cancelText="取消"
				destroyOnClose
				onCancel={() => {
					setShowAddSideDishModal(false);
				}}
				width={500}
				footer={null}
			>
				<AddSideDishItem
					selectedSideDishItem={selectedSideDishItem}
					handleAddSideDishItem={handleAddSideDishItem}
				/>
			</Modal>
			<Modal
				visible={showCheckoutModal}
				okText="确定"
				cancelText="取消"
				destroyOnClose
				onCancel={() => {
					setShowCheckoutModal(false);
				}}
				footer={null}
			>
				<Checkout
					currentOrder={currentOrder}
					setShowCheckoutModal={setShowCheckoutModal}
				/>
			</Modal>
			{/* <Modal
				visible={emailModal}
				title="Send Email"
				footer={null}
				destroyOnClose
				onCancel={() => {
					setEmailModal(false);
				}}
			>
				<Form
					form={form}
					size="large"
					name="createOrder"
					onFinish={(value) => {
						handleSendEmail(value, currentOrder, currentOperation)
						setEmailModal(false);
						
					}}
				>
					<Form.Item name="orderNum" label="Order Number">
						<input style={{ width: 300 }} />
					</Form.Item>
					<Form.Item name="orderType" label="Order Type">
						<input style={{ width: 300 }} />
					</Form.Item>
					<Form.Item name="email" label="Email">
						<input style={{ width: 300 }} />
					</Form.Item>
					<Button
						type="primary"
						size="large"
						htmlType="submit"
					>
						Send Email
					</Button>
				</Form>
			</Modal> */}
		</>
	);
};

export default Orders;
