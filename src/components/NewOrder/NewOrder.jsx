import Image from "next/image";
import {
	Form,
	Modal,
	Table,
	Space,
	Button,
	Popconfirm,
	Input,
	Row,
	Col,
	Select,
} from "antd";
import { MinusOutlined, PlusOutlined, DeleteTwoTone } from "@ant-design/icons";
import AddDishItem from "../Orders/AddDishItem";
import AddSideDishItem from "../Orders/AddSideDishItem";
import useNewOrder from "src/hooks/useNewOrder";
import useOperations from "src/hooks/useOperation";
import Checkout from "src/components/Orders/Checkout";
import { ShippingRequirements } from "src/configs/constants";
import { priceFormatter } from "src/utils/helpers";
import { useState, useEffect } from "react";

import axios from "axios";
import FormItem from "antd/lib/form/FormItem";

const { TextArea } = Input;
const { Option } = Select;

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

	const formInputs = {
		address: "",
		addressData: {},
	};

	const [inputs, setInputs] = useState(formInputs);
	const [isRenderAddressDropDown, setIsRenderAddressDropDown] = useState(
		false
	);
	const [addressesFound, setAddressesFound] = useState([]);
	const [suburbSelect, setSuburbSelect] = useState(true);
	const [totalPrice, setTotalPrice] = useState(0);
	const [deliveryFee, setDeliveryFee] = useState(0);
	const [min, setMin] = useState(0);

	const { currentOperation } = useOperations();

	const onSelectAddress = (selectedAddress) => {
		const addressData = Object.assign({}, selectedAddress);
		const formattedAddress = addressData.formatted;
		handleInputsChange("address", formattedAddress);
		handleInputsChange("addressData", addressData);
		setIsRenderAddressDropDown(false);
	};
	const runAutoCompleteAddress = async (address) => {
		const apiKey = process.env.GEOAPIFY_API_KEY;
		const text = address;
		const filter = "countrycode:au";
		const lang = "en";
		const format = "json";
		const baseApiUrl = "https://api.geoapify.com/v1/geocode/autocomplete";
		const api = `${baseApiUrl}?text=${text}&filter=${filter}&lang=${lang}&format=${format}&apiKey=${apiKey}`;
		const res = await axios.get(api);
		const addresses = res.data.results;
		setAddressesFound(addresses);
	};

	const handleInputsChange = async (inputName, inputValue) => {
		if (inputName === "address" && inputValue !== inputs.address) {
			if (inputValue.trim().length > 4) {
				setIsRenderAddressDropDown(true);
				runAutoCompleteAddress(inputValue);
			} else {
				setInputs((inputs) => ({ ...inputs, addressData: {} }));
				setIsRenderAddressDropDown(false);
			}
			setInputs((inputs) => ({ ...inputs, [inputName]: inputValue }));
		} else if (inputName == "suburb") {
			ShippingRequirements.map((suburbs) => {
				suburbs.suburbs.map((suburb) => {
					if (suburb == inputValue) {
						setMin(suburbs.minOrderCost);
						setDeliveryFee(suburbs.fee);
					}
				});
			});
		}
	};

	useEffect(() => {
		let sum = 0;
		dishes.map((element) => {
			sum += element.currentPrice * element.quantity;
		});
		setTotalPrice(sum);
	}, [dishes]);

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
							onConfirm={() => {
								handleDeleteDish(record);
							}}
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
			<h1 className="font-weight-bold fs-lg text-left">点单</h1>
			<Form
				form={form}
				size="large"
				name="createOrder"
				onFinish={(value) => {
					if (value.PoD == "delivery" && totalPrice < min) {
						alert("The order cost should be higher than " + min);
					} else if (
						value.PoD == "delivery" &&
						inputs.address == ""
					) {
						alert("Address is needed");
					} else {
						handleSubmitOrder(
							value,
							inputs.address,
							min,
							deliveryFee,
							totalPrice,
							currentOperation
						);
						setInputs("");
						setDeliveryFee(0);
						setMin(0);
					}
				}}
				layout="vertical"
			>
				<Row>
					<Col span={6}>
						<Form.Item
							name="PoD"
							label="Pick up or Delivery"
							required
						>
							<Select
								onChange={(value) => {
									if (value == "delivery") {
										setSuburbSelect(false);
									} else {
										setSuburbSelect(true);
									}
								}}
							>
								<Option disabled selected>
									Please Select
								</Option>
								<Option value="pick up">Pick Up</Option>
								<Option value="delivery">Delivery</Option>
							</Select>
						</Form.Item>

						<Form.Item name="payMethod" label="Pay Method" required>
							<Select>
								<Option disabled selected>
									Please Select
								</Option>
								<Option value="cash">Pay by Cash</Option>
								<Option value="pay over phone">
									Pay over Phone
								</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={6} offset={2}>
						<Form.Item name="name" label="Name" required>
							<Input />
						</Form.Item>
						<Form.Item name="phone" label="Phone Number" required>
							<Input />
						</Form.Item>
					</Col>
					<Col span={6} offset={2}>
						<Form.Item name="email" label="Email" required>
							<Input />
						</Form.Item>

						<Form.Item name="address" label="Address">
							<Input
								type="text"
								value={inputs.address}
								onChange={(e) => {
									handleInputsChange(
										"address",
										e.target.value
									);
								}}
							/>
							{isRenderAddressDropDown && (
								<Col>
									{addressesFound.map((address, index) => (
										<Row key={index}>
											<Button
												onClick={() => {
													onSelectAddress(address);
												}}
												cursor="pointer"
												color="black"
												backgroundColor="white"
												display="block"
											>
												{address.formatted}
											</Button>
										</Row>
									))}
								</Col>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={6}>
						<Form.Item name="suburb" label="Suburb">
							<Select
								onChange={async (value) => {
									await handleInputsChange("suburb", value);
								}}
								disabled={suburbSelect}
							>
								<Option disabled selected>
									Please Select
								</Option>
								<Option value="Bellerive">Bellerive</Option>
								<Option value="Rosny">Rosny</Option>
								<Option value="Rosny Park">Rosny Park</Option>
								<Option value="Montagu Bay">Montagu Bay</Option>
								<Option value="Warrane">Warrane</Option>
								<Option value="Rose Bay">Rose Bay</Option>
								<Option value="Mornington">Mornington</Option>
								<Option value="Lindisfarne">Lindisfarne</Option>
								<Option value="Howrah">Howrah</Option>
								<Option value="Rokeby">Rokeby</Option>
								<Option value="Tranmere">Tranmere</Option>
								<Option value="Clarendon Vale">
									Clarendon Vale
								</Option>
								<Option value="Oakdowns">Oakdowns</Option>
								<Option value="Geilston Bay">
									Geilston Bay
								</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={6} offset={2}>
						<FormItem label="Delivery Fee" name="deliveryFee">
							<div>{deliveryFee}</div>
						</FormItem>
					</Col>
				</Row>

				{dishes ? (
					<>
						{totalPrice ? (
							<span className="fs-lg fw-600 float-right">
								合计: ${totalPrice.toFixed(2)}
							</span>
						) : null}
						<Table
							columns={columns}
							rowKey={(record) => {
								record?.itemId || record._id;
							}}
							dataSource={dishes}
							showHeader={false}
							pagination={false}
							className="border border-bottom-0 mb-3"
							onChange={() => {
								let price = 0;
								dishes.forEach((element) => {
									price += element.currentPrice;
								});
								setTotalPrice(price);
							}}
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
						<Form.Item
							name="comment"
							label="备注"
							initialValue={""}
						>
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
				width={1000}
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
