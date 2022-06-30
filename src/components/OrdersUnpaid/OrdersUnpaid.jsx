import Image from "next/image";
import {
	Space,
	Skeleton,
	Button,
	Table,
	Modal,
	Radio,
	InputNumber,
} from "antd";
import useOrder from "src/hooks/useOrder";
import Checkout from "./Checkout";
import { priceFormatter } from "src/utils/helpers";
import classes from "./style.module.less";

const OrdersUnpaid = () => {
	const {
		isLoading,
		error,
		handleChangeUnpaidTotalPrice,
		showCheckoutModal,
		setShowCheckoutModal,
		unpaidOrder,
		unpaidOrders,
		handleUnpaidToggleTable,
	} = useOrder();

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
				const {
					dishID,
					upgradeDrinks,
					base,
					size,
					secondHalf,
					specialPizzaNotes,
					extraToppings,
					pizzaCombo1,
					pizzaCombo2,
					pizzaCombo3,
					pizzaEndSpecial1,
					pizzaEndSpecial2,
					pizzaEndSpecial3,
					baseCombo1,
					baseCombo2,
					baseCombo3,
					baseEndSpecial1,
					baseEndSpecial2,
					baseEndSpecial3,
					extraToppingsCombo1,
					extraToppingsCombo2,
					extraToppingsCombo3,
					extraToppingsEndSpecial1,
					extraToppingsEndSpecial2,
					extraToppingsEndSpecial3,
					secondHalfPizzaCombo1,
					secondHalfPizzaCombo2,
					secondHalfPizzaCombo3,
					secondHalfPizzaEndSpecial1,
					secondHalfPizzaEndSpecial2,
					secondHalfPizzaEndSpecial3,
					secondHalfPizzaExtraToppingsCombo1,
					secondHalfPizzaExtraToppingsCombo2,
					secondHalfPizzaExtraToppingsCombo3,
					secondHalfPizzaExtraToppingsEndSpecial1,
					secondHalfPizzaExtraToppingsEndSpecial2,
					secondHalfPizzaExtraToppingsEndSpecial3,
					secondHalfExtraToppings,
					drinkChoice,
					pizzaChoice,
					pastaChoice,
				} = record;
				console.log(record);

				let hasExtraToppings = true;
				let hasSecondHalf = true;
				let hasSpecial = true;
				let hasCombo1 = true;
				let hasCombo2 = true;
				let hasCombo3 = true;
				let hasEndSpecial1 = true;
				let hasEndSpecial2 = true;
				let hasEndSpecial3 = true;
				let hasBase1 = true;
				let hasBase2 = true;
				let hasBase3 = true;
				let hasEndSpecialBase1 = true;
				let hasEndSpecialBase2 = true;
				let hasEndSpecialBase3 = true;
				let hasExtraToppingsCombo1 = true;
				let hasExtraToppingsCombo2 = true;
				let hasExtraToppingsCombo3 = true;
				let hasExtraToppingsEndSpecial1 = true;
				let hasExtraToppingsEndSpecial2 = true;
				let hasExtraToppingsEndSpecial3 = true;
				let hasSecondHalfCombo1 = true;
				let hasSecondHalfCombo2 = true;
				let hasSecondHalfCombo3 = true;
				let hasSecondHalfEndSpecial1 = true;
				let hasSecondHalfEndSpecial2 = true;
				let hasSecondHalfEndSpecial3 = true;
				let hasSecondHalfPizzaExtraToppingsCombo1 = true;
				let hasSecondHalfPizzaExtraToppingsCombo2 = true;
				let hasSecondHalfPizzaExtraToppingsCombo3 = true;
				let hasSecondHalfPizzaExtraToppingsEndSpecial1 = true;
				let hasSecondHalfPizzaExtraToppingsEndSpecial2 = true;
				let hasSecondHalfPizzaExtraToppingsEndSpecial3 = true;
				let hasSecondHalfExtraToppings = true;

				let hasBase = true;
				let hasSize = true;

				let hasDrinkChoice = true;
				let hasPizzaChoice = true;
				let hasPastaChoice = false;
				let hasUpgrade = false;

				if (upgradeDrinks[0] === "true") {
					hasUpgrade = true;
				}

				if (pizzaChoice == "") {
					hasPizzaChoice = false;
				}

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

				if (pizzaCombo1 == "") {
					hasCombo1 = false;
					hasBase1 = false;
				}
				if (pizzaCombo1 != "") {
					hasSize = false;
					hasBase = false;
				}

				if (pizzaEndSpecial1 == "") {
					hasEndSpecial1 = false;
					hasEndSpecialBase1 = false;
				}

				if (pizzaEndSpecial1 != "") {
					hasSize = false;
					hasBase = false;
				}

				if (
					dishID.name === "9“ Authentic Garlic Bread" ||
					dishID.name === "Tartofu" ||
					dishID.name === "Valhalla Choc Top Ice cream" ||
					dishID.name === "Valhalla Ice cream" ||
					drinkChoice != ""
				) {
					hasSize = false;
					hasBase = false;
				}

				if (pizzaCombo2 == "") {
					hasCombo2 = false;
					hasBase2 = false;
				}

				if (pizzaEndSpecial2 == "") {
					hasEndSpecial2 = false;
					hasEndSpecialBase2 = false;
				}

				if (pizzaCombo3 == "") {
					hasCombo3 = false;
					hasBase3 = false;
				}

				if (pizzaEndSpecial3 == "") {
					hasEndSpecial3 = false;
					hasEndSpecialBase3 = false;
				}

				if (specialPizzaNotes[0] != "") {
					hasSize = false;
				}
				if (pastaChoice != "") {
					hasSize = false;
					hasBase = false;
					hasPastaChoice = true;
				}

				if (baseCombo1 == "") {
					hasBase1 = false;
				}

				if (baseEndSpecial1 == "") {
					hasEndSpecialBase1 = false;
				}

				if (baseCombo2 == "") {
					hasBase2 = false;
				}

				if (baseEndSpecial2 == "") {
					hasEndSpecialBase2 = false;
				}

				if (baseCombo3 == "") {
					hasBase3 = false;
				}

				if (baseEndSpecial3 == "") {
					hasEndSpecialBase3 = false;
				}

				if (extraToppingsCombo1 == "") {
					hasExtraToppingsCombo1 = false;
				}

				if (extraToppingsCombo2 == "") {
					hasExtraToppingsCombo2 = false;
				}

				if (extraToppingsCombo3 == "") {
					hasExtraToppingsCombo3 = false;
				}

				if (extraToppingsEndSpecial1 == "") {
					hasExtraToppingsEndSpecial1 = false;
				}

				if (extraToppingsEndSpecial2 == "") {
					hasExtraToppingsEndSpecial2 = false;
				}

				if (extraToppingsEndSpecial3 == "") {
					hasExtraToppingsEndSpecial3 = false;
				}

				if (
					secondHalfPizzaCombo1?.name == "No Second half pizza" ||
					secondHalfPizzaCombo1 === null
				) {
					hasSecondHalfCombo1 = false;
				}

				if (
					secondHalfPizzaCombo2?.name == "No Second half pizza" ||
					secondHalfPizzaCombo2 === null
				) {
					hasSecondHalfCombo2 = false;
				}

				if (
					secondHalfPizzaCombo3?.name == "No Second half pizza" ||
					secondHalfPizzaCombo3 === null
				) {
					hasSecondHalfCombo3 = false;
				}

				if (
					secondHalfPizzaEndSpecial1?.name ==
						"No Second half pizza" ||
					secondHalfPizzaEndSpecial1 === null
				) {
					hasSecondHalfEndSpecial1 = false;
				}

				if (
					secondHalfPizzaEndSpecial2?.name ==
						"No Second half pizza" ||
					secondHalfPizzaEndSpecial2 === null
				) {
					hasSecondHalfEndSpecial2 = false;
				}

				if (
					secondHalfPizzaEndSpecial3?.name ==
						"No Second half pizza" ||
					secondHalfPizzaEndSpecial3 === null
				) {
					hasSecondHalfEndSpecial3 = false;
				}

				if (secondHalfPizzaExtraToppingsCombo1 == "") {
					hasSecondHalfPizzaExtraToppingsCombo1 = false;
				}

				if (secondHalfPizzaExtraToppingsCombo2 == "") {
					hasSecondHalfPizzaExtraToppingsCombo2 = false;
				}

				if (secondHalfPizzaExtraToppingsCombo3 == "") {
					hasSecondHalfPizzaExtraToppingsCombo3 = false;
				}

				if (secondHalfPizzaExtraToppingsEndSpecial1 == "") {
					hasSecondHalfPizzaExtraToppingsEndSpecial1 = false;
				}

				if (secondHalfPizzaExtraToppingsEndSpecial2 == "") {
					hasSecondHalfPizzaExtraToppingsEndSpecial2 = false;
				}

				if (secondHalfPizzaExtraToppingsEndSpecial3 == "") {
					hasSecondHalfPizzaExtraToppingsEndSpecial3 = false;
				}

				if (secondHalfExtraToppings == "") {
					hasSecondHalfExtraToppings = false;
				}

				if (base == "") {
					hasBase = false;
				}

				if (size == "") {
					hasSize = false;
				}

				if (drinkChoice == "") {
					hasDrinkChoice = false;
				}

				return (
					<Space direction="vertical">
						<strong className="fs-md">{name}</strong>
						{hasPizzaChoice ? (
							<div className="size">
								PizzaChoice: {pizzaChoice}
							</div>
						) : null}
						{hasPastaChoice ? (
							<div className="size">
								PastaChoice: {pastaChoice}
							</div>
						) : null}
						{hasSize ? (
							<div className="size">Size: {size}</div>
						) : null}
						{hasBase ? (
							<div className="base">Base: {base}</div>
						) : null}
						{hasExtraToppings ? (
							<div className="secondary">
								Extra Toppings:
								{extraToppings.map((i) => {
									return ` ${i}; `;
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
									return ` ${i}; `;
								})}
							</div>
						) : null}
						{hasCombo1 ? (
							<div className="combo1">
								<b>Pizza 1: {pizzaCombo1}</b>
							</div>
						) : null}
						{hasBase1 ? (
							<div className="baseCombo1">
								<b>Base 1: {baseCombo1}</b>
							</div>
						) : null}
						{hasExtraToppingsCombo1 ? (
							<div className="extraToppingCombo1">
								Extra Toppings Pizza 1:{" "}
								{extraToppingsCombo1?.map((i) => {
									return ` ${i}; `;
								})}
							</div>
						) : null}
						{hasSecondHalfCombo1 ? (
							<div className="secondHalfCombo1">
								Second Half Pizza 1:{" "}
								{secondHalfPizzaCombo1?.name}
							</div>
						) : null}
						{hasSecondHalfPizzaExtraToppingsCombo1 ? (
							<div className="secondHalfPizzaExtraToppingsCombo1">
								Second Half Extra Toppings Pizza 1:{" "}
								{secondHalfPizzaExtraToppingsCombo1?.map(
									(i) => {
										return ` ${i}; `;
									}
								)}
							</div>
						) : null}
						{hasCombo2 ? (
							<div className="combo2">
								<b>Pizza 2: {pizzaCombo2}</b>
							</div>
						) : null}
						{hasBase2 ? (
							<div className="baseCombo2">
								<b>Base 2: {baseCombo2}</b>
							</div>
						) : null}
						{hasExtraToppingsCombo2 ? (
							<div className="extraToppingCombo2">
								Extra Toppings Pizza 2:{" "}
								{extraToppingsCombo2?.map((i) => {
									return ` ${i}; `;
								})}
							</div>
						) : null}
						{hasSecondHalfCombo2 ? (
							<div className="secondHalfCombo2">
								Second Half Pizza 2:{" "}
								{secondHalfPizzaCombo2?.name}
							</div>
						) : null}
						{hasSecondHalfPizzaExtraToppingsCombo2 ? (
							<div className="secondHalfPizzaExtraToppingsCombo2">
								Second Half Extra Toppings Pizza 2:{" "}
								{secondHalfPizzaExtraToppingsCombo2?.map(
									(i) => {
										return ` ${i}; `;
									}
								)}
							</div>
						) : null}
						{hasCombo3 ? (
							<div className="combo3">
								<b>Pizza 3: {pizzaCombo3}</b>
							</div>
						) : null}
						{hasBase3 ? (
							<div className="baseCombo3">
								<b>Base 3: {baseCombo3}</b>
							</div>
						) : null}
						{hasExtraToppingsCombo3 ? (
							<div className="extraToppingCombo3">
								Extra Toppings Pizza 3:{" "}
								{extraToppingsCombo3?.map((i) => {
									return ` ${i}; `;
								})}
							</div>
						) : null}
						{hasSecondHalfCombo3 ? (
							<div className="secondHalfCombo3">
								Second Half Pizza 3:{" "}
								{secondHalfPizzaCombo3?.name}
							</div>
						) : null}
						{hasSecondHalfPizzaExtraToppingsCombo3 ? (
							<div className="secondHalfPizzaExtraToppingsCombo3">
								Second Half Extra Toppings Pizza 3:{" "}
								{secondHalfPizzaExtraToppingsCombo3?.map(
									(i) => {
										return ` ${i}; `;
									}
								)}
							</div>
						) : null}
						{hasEndSpecial1 ? (
							<div className="combo1">
								<b>Pizza 1: {pizzaEndSpecial1}</b>
							</div>
						) : null}
						{hasEndSpecialBase1 ? (
							<div className="baseCombo1">
								<b>Base 1: {baseEndSpecial1}</b>
							</div>
						) : null}
						{hasExtraToppingsEndSpecial1 ? (
							<div className="extraToppingCombo1">
								Extra Toppings Pizza 1:{" "}
								{extraToppingsEndSpecial1?.map((i) => {
									return ` ${i}; `;
								})}
							</div>
						) : null}
						{hasSecondHalfEndSpecial1 ? (
							<div className="secondHalfCombo1">
								Second Half Pizza 1:{" "}
								{secondHalfPizzaEndSpecial1?.name}
							</div>
						) : null}
						{hasSecondHalfPizzaExtraToppingsEndSpecial1 ? (
							<div className="secondHalfPizzaExtraToppingsCombo1">
								Second Half Extra Toppings Pizza 1:{" "}
								{secondHalfPizzaExtraToppingsEndSpecial1?.map(
									(i) => {
										return ` ${i}; `;
									}
								)}
							</div>
						) : null}
						{hasEndSpecial2 ? (
							<div className="combo2">
								<b>Pizza 2: {pizzaEndSpecial2}</b>
							</div>
						) : null}
						{hasEndSpecialBase2 ? (
							<div className="baseCombo2">
								<b>Base 2: {baseEndSpecial2}</b>
							</div>
						) : null}
						{hasExtraToppingsEndSpecial2 ? (
							<div className="extraToppingCombo2">
								Extra Toppings Pizza 2:{" "}
								{extraToppingsEndSpecial2?.map((i) => {
									return ` ${i}; `;
								})}
							</div>
						) : null}
						{hasSecondHalfEndSpecial2 ? (
							<div className="secondHalfCombo2">
								Second Half Pizza 2:{" "}
								{secondHalfPizzaEndSpecial2?.name}
							</div>
						) : null}
						{hasSecondHalfPizzaExtraToppingsEndSpecial2 ? (
							<div className="secondHalfPizzaExtraToppingsCombo2">
								Second Half Extra Toppings Pizza 2:{" "}
								{secondHalfPizzaExtraToppingsEndSpecial2?.map(
									(i) => {
										return ` ${i}; `;
									}
								)}
							</div>
						) : null}
						{hasEndSpecial3 ? (
							<div className="combo3">
								<b>Pizza 3: {pizzaEndSpecial3}</b>
							</div>
						) : null}
						{hasEndSpecial3 ? (
							<div className="baseCombo3">
								<b>Base 3: {baseEndSpecial3}</b>
							</div>
						) : null}
						{hasExtraToppingsEndSpecial3 ? (
							<div className="extraToppingCombo3">
								Extra Toppings Pizza 3:{" "}
								{extraToppingsEndSpecial3?.map((i) => {
									return ` ${i}; `;
								})}
							</div>
						) : null}
						{hasSecondHalfEndSpecial3 ? (
							<div className="secondHalfCombo3">
								Second Half Pizza 3:{" "}
								{secondHalfPizzaEndSpecial3?.name}
							</div>
						) : null}
						{hasSecondHalfPizzaExtraToppingsEndSpecial3 ? (
							<div className="secondHalfPizzaExtraToppingsCombo3">
								Second Half Extra Toppings Pizza 3:{" "}
								{secondHalfPizzaExtraToppingsEndSpecial3?.map(
									(i) => {
										return ` ${i}; `;
									}
								)}
							</div>
						) : null}
						{hasSecondHalfExtraToppings ? (
							<div className="secondHalfPizzaExtraToppingsCombo3">
								Second Half Extra Toppings:{" "}
								{secondHalfExtraToppings?.map((i) => {
									return ` ${i}; `;
								})}
							</div>
						) : null}
						{hasDrinkChoice ? (
							<div className="drinkChoice">
								DrinkChoice: {drinkChoice}
								{", "}
								{hasUpgrade ? "Upgrade to 1.25L" : null}
								{hasSpecial ? "1.25L" : null}
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
			render: (quantity) => {
				return <span className="px-3">{quantity}</span>;
			},
		},
		{
			title: "小计",
			dataIndex: "price",
			render: (price, record) => {
				return <span>{priceFormatter(price * record.quantity)}</span>;
			},
		},
	];

	return (
		<>
			<div className={classes.buttonWrapper}>
				<Radio.Group
					onChange={handleUnpaidToggleTable}
					size="large"
					value={unpaidOrder?._id}
				>
					<Space wrap size="middle">
						{isLoading ? (
							<Skeleton active />
						) : (
							<>
								{unpaidOrders?.map(({ _id, orderNum }) => (
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
							{unpaidOrder ? (
								<>
									<span className="fs-lg fw-600">
										订单号3: {unpaidOrder?.orderNum}
									</span>
									<span className="fs-lg fw-600">
										Delivery Fee:{" "}
										{priceFormatter(
											unpaidOrder?.deliveryFee
										)}
									</span>
									<span className="fs-lg fw-600">
										合计:{" "}
										{priceFormatter(
											unpaidOrder?.totalPrice
										)}
									</span>
								</>
							) : null}
						</div>
						<Table
							columns={columns}
							rowKey={(record) => record?.itemId || record?._id}
							dataSource={unpaidOrder?.dishes}
							showHeader={false}
							pagination={false}
							className="border border-bottom-0"
						/>
						{unpaidOrder ? (
							<>
								<h3 className="fs-md  mt-5">Total Price</h3>
								<InputNumber
									value={unpaidOrder?.totalPrice}
									step={0.1}
									min={0}
									onChange={handleChangeUnpaidTotalPrice}
								/>
								<div className="my-3 d-flex flex-row-reverse">
									<Space>
										{/* <Button
											onClick={() => {
												// setEmailModal(true),
												handleSendEmail(
													unpaidOrder,
													currentOperation
												);
											}}
										>
											Email
										</Button> */}
										<Button
											type="primary"
											size="large"
											onClick={() =>
												setShowCheckoutModal(true)
											}
										>
											结算
										</Button>
									</Space>
								</div>
							</>
						) : null}
					</>
				)}
			</div>
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
					currentOrder={unpaidOrder}
					setShowCheckoutModal={setShowCheckoutModal}
				/>
			</Modal>
		</>
	);
};

export default OrdersUnpaid;
