import Image from "next/image";
import {
	Form,
	Modal,
	Table,
	Space,
	Button,
	AutoComplete,
	Tag,
	Popconfirm,
	Input,
} from "antd";
import { MinusOutlined, PlusOutlined, DeleteTwoTone } from "@ant-design/icons";
import AddDishItem from "../Orders/AddDishItem";
import AddSideDishItem from "../Orders/AddSideDishItem";
import useThirdPartyOrder from "src/hooks/useThirdPartyOrder";
import { priceFormatter } from "src/utils/helpers";

const { TextArea } = Input; //HOU

const ThirdPartyOrder = () => {
	const [form] = Form.useForm();
	const {
		dishes,
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
		isSubmitting,
	} = useThirdPartyOrder(form);

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
			<h1 className="font-weight-bold fs-lg text-center">手动录单</h1>
			<Form form={form} name="createOrder" onFinish={handleSubmitOrder}>
				<Form.Item
					name="orderSource"
					label="订单来源"
					rules={[{ required: true, message: "请输入订单来源" }]}
					required
				>
					<AutoComplete
						placeholder="请选择第三方订单来源"
						options={[
							//HOU 客户不要Deliveroo了
							{ value: "Menulog" },
							{ value: "DoorDash" },
							{ value: "Uber Eats" },
						]}
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
							<Button
								disabled={isSubmitting}
								type="primary"
								htmlType="submit"
							>
								提交订单
							</Button>
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
		</>
	);
};

export default ThirdPartyOrder;
