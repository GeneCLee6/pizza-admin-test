import Image from "next/image";
import {
	Form,
	Modal,
	Table,
	Radio,
	Space,
	Button,
	InputNumber,
	Tag,
	Popconfirm,
	Input,
	AutoComplete,
} from "antd";
import { MinusOutlined, DeleteTwoTone } from "@ant-design/icons";
import AddDishItem from "../Orders/AddDishItem";
import AddSideDishItem from "../Orders/AddSideDishItem";
import useReturnOrder from "src/hooks/useReturnOrder";
import Checkout from "src/components/Orders/Checkout";
import { priceFormatter } from "src/utils/helpers";

const { TextArea } = Input;

const ReturnOrder = () => {
	const [form] = Form.useForm();
	const {
		dishes,
		setDishes,
		showAddOrderDishModal,
		setShowAddOrderDishModal,
		showAddSideDishModal,
		setShowAddSideDishModal,
		handleAddDish,
		orderTotalPrice,
		handleToggleDishQuantity,
		handleDeleteDish,
		selectedSideDishItem,
		handleAddSideDishItem,
		handleSubmitOrder,
		showConfirmCancelOrder,
		showCheckoutModal,
		setShowCheckoutModal,
		currentOrder,
		disabledBtn,
		handleTogglePayMethod,
		payMethod,
		handleSetCashier,
	} = useReturnOrder(form);

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
			dataIndex: "dishCnName",
			render: (dishCnName, record) => {
				const { sideDishes, price, discount } = record;
				const hasSideDishes = !!sideDishes?.length;
				return (
					<Space direction="vertical">
						<strong className="fs-md">{dishCnName}</strong>

						{hasSideDishes ? (
							<div className="secondary">
								{sideDishes.map((i) => {
									const {
										price,
										sideDishCnName,
										quantity,
									} = i;

									return `${sideDishCnName}($${price})x${quantity}  `;
								})}
							</div>
						) : null}
						<Space>
							{priceFormatter(price)}
							{discount !== 1 && (
								<Tag color="geekblue">{discount}</Tag>
							)}
						</Space>
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
			<h1 className="font-weight-bold fs-lg text-center">退菜</h1>
			<Form
				form={form}
				size="large"
				name="createOrder"
				onFinish={handleSubmitOrder}
				initialValues={{ tableNum: "", comment: "" }}
			>
				<Form.Item
					name="paymethod"
					label="退款方式"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Radio.Group
						onChange={handleTogglePayMethod}
						value={payMethod}
					>
						<Radio value="card">刷卡</Radio>
						<Radio value="cash">现金</Radio>
						<Radio value="支付宝">支付宝</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					name="cashier"
					label="服务员"
					rules={[
						{
							required: true,
						},
					]}
				>
					<AutoComplete
						style={{ width: "70%" }}
						placeholder="请输入服务员姓名"
						onChange={handleSetCashier}
						options={[
							{ value: "zyz" },
							{ value: "cici" },
							{ value: "ming" },
						]}
					/>
				</Form.Item>

				<Form.Item name="tableNum" label="桌号">
					<InputNumber
						placeholder="请选择桌号"
						min={0}
						max={26}
						precision={0}
					/>
				</Form.Item>

				{dishes ? (
					<>
						{orderTotalPrice ? (
							<span className="fs-lg fw-600 float-right">
								合计: ${orderTotalPrice}
							</span>
						) : null}

						<Table
							columns={columns}
							rowKey={(record) => record?.itemId || record?._id}
							dataSource={dishes}
							showHeader={false}
							pagination={false}
							className="border border-bottom-0 mb-3"
						/>
					</>
				) : null}

				<Form.Item>
					<div className="my-3 d-flex flex-row-reverse">
						<Button
							type="primary"
							onClick={() => {
								setShowAddOrderDishModal(true);
							}}
						>
							添加菜品
						</Button>
					</div>
				</Form.Item>

				{dishes?.length ? (
					<div>
						<Form.Item name="comment" label="备注">
							<TextArea rows={4} />
						</Form.Item>
						<div className="my-3 d-flex flex-row-reverse">
							<Space>
								<Button
									type="primary"
									size="large"
									htmlType="submit"
									disabled={disabledBtn} //HOU change flow order - createorder
								>
									退菜
								</Button>

								<Button
									size="large"
									onClick={() => showConfirmCancelOrder()}
								>
									取消
								</Button>
							</Space>
						</div>
					</div>
				) : null}
			</Form>
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
				<AddDishItem handleAddDish={handleAddDish} />
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
					form={form}
					setDishes={setDishes}
				/>
			</Modal>
		</>
	);
};

export default ReturnOrder;
