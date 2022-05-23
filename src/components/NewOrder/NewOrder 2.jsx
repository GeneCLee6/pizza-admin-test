import Image from "next/image";
import {
	Form,
	Modal,
	Table,
	Space,
	Button,
	InputNumber,
	Popconfirm,
	Input,
} from "antd";
import { MinusOutlined, PlusOutlined, DeleteTwoTone } from "@ant-design/icons";
import AddDishItem from "../Orders/AddDishItem";
import AddSideDishItem from "../Orders/AddSideDishItem";
import useNewOrder from "src/hooks/useNewOrder";
import Checkout from "src/components/Orders/Checkout";
import { priceFormatter } from "src/utils/helpers";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalProvider";

const { TextArea } = Input;

const NewOrder = () => {
	const [form] = Form.useForm();
	const {
		dishes,
		setDishes,
		showAddOrderDishModal,
		setShowAddOrderDishModal,
		showAddSideDishModal,
		setShowAddSideDishModal,
		handleToggleDishQuantity,
		handleDeleteDish,
		selectedSideDishItem,
		handleAddSideDishItem,
		handleSubmitOrder,
		showConfirmCancelOrder,
		showCheckoutModal,
		setShowCheckoutModal,
		currentOrder,
		handleDishChoose,
	} = useNewOrder(form);

	const {
		contextValue: { totalPrice },
	} = useContext(GlobalContext);

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
			dataIndex: "name",
			render: (name, record) => {
				const {
					secondHalf,
					specialPizzaNotes,
					extraToppings,
					pizzaChoice,
					drinkSelection,
				} = record;
				let hasExtraToppings = true;
				let hasSecondHalf = true;
				let hasSpecial = true;
				let hasPizzaChoice = true;
				let hasDrink = true;

				if (specialPizzaNotes == "") {
					hasSpecial = false;
				}

				if (extraToppings == "") {
					hasExtraToppings = false;
				}

				if (secondHalf == "") {
					hasSecondHalf = false;
				}

				if (pizzaChoice == "") {
					hasPizzaChoice = false;
				}

				if (drinkSelection == "" || !drinkSelection) {
					hasDrink = false;
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
								Second Half: {secondHalf}
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
						{hasPizzaChoice ? (
							<div className="secondary">
								Choice Pizza: {pizzaChoice}
							</div>
						) : null}
						{hasDrink ? (
							<div className="secondary">
								Choice Drink: {drinkSelection}
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
			dataIndex: "currentPrice",
			render: (currentPrice, record) => {
				return (
					<span>
						{priceFormatter(currentPrice * record.quantity)}
					</span>
				);
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
			<h1 className="font-weight-bold fs-lg text-center">点单</h1>
			<Form
				form={form}
				size="large"
				name="createOrder"
				onFinish={handleSubmitOrder}
				initialValues={{ tableNum: "", comment: "" }}
			>
				<Form.Item name="tableNum" label="这个桌号没有用">
					<InputNumber
						placeholder="请选择桌号"
						min={0}
						max={26}
						precision={0}
					/>
				</Form.Item>

				{dishes ? (
					<>
						{totalPrice ? (
							<span className="fs-lg fw-600 float-right">
								合计: ${totalPrice}
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
							添加菜品啦
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
								>
									创建订单
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
				title="选择菜品吧"
				okText="确定"
				cancelText="取消"
				destroyOnClose
				onCancel={() => {
					setShowAddOrderDishModal(false);
				}}
				width={800}
				footer={null}
			>
				<AddDishItem handleDishChoose={handleDishChoose} />
			</Modal>
			<Modal
				visible={showAddSideDishModal}
				title="请选择Pizza"
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
					setShowAddSideDishModal={setShowAddSideDishModal}
					dishes={dishes}
					setDishes={setDishes}
				/>
			</Modal>
			<Modal
				visible={showCheckoutModal}
				okText="确定哦"
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

export default NewOrder;
