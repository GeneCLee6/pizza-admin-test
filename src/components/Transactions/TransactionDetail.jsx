import { Divider, Col, Row, Button } from "antd";
import formatDate from "src/utils/format-date";
import useThrottle from "src/hooks/useThrottle";
import usePrint from "src/hooks/usePrint";
import { throttle } from "src/utils/helpers";
import classes from "./style.module.less";

const DescriptionItem = ({ title, content }) => (
	<div className={classes.wrapper}>
		<p className={classes.label}>{title}:</p>
		{content}
	</div>
);

const TransactionDetail = ({ currentTransaction }) => {
	console.log("currentTransaction", currentTransaction);
	const {
		_id,
		address,
		orderNum,
		dishes,
		comment,
		totalPrice,
		createdAt,
		updatedAt,
		payMethod,
		status,
		isPaid,
		orderType,
		phone,
		name,
	} = currentTransaction;
	console.log("dishes", dishes);

	const { handlePrint } = usePrint();

	return (
		<div>
			<p className={classes.siteDescription} style={{ marginBottom: 24 }}>
				订单详情
			</p>
			<p className={classes.siteDescription}>基本信息</p>
			<Row>
				<Col span={12}>
					<DescriptionItem title="订单号" content={orderNum} />
				</Col>
				<Col span={12}>
					<DescriptionItem title="订单状态" content={status} />
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title="时间"
						content={formatDate(createdAt)}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem
						title="Update Time"
						content={formatDate(updatedAt)}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title="订单总额"
						content={`$${totalPrice}`}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem
						title="订单类型"
						content={orderType || "-"}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title="支付方式"
						content={payMethod || "-"}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem
						title="是否付款"
						content={isPaid ? "yes" : "no"}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem title="地址" content={address || "-"} />
				</Col>
				<Col span={12}>
					<DescriptionItem title="电话" content={phone || "-"} />
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<DescriptionItem title="姓名" content={name} />
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<DescriptionItem title="备注" content={comment} />
				</Col>
			</Row>
			<Divider />
			<p className={classes.siteDescription}>菜品信息</p>
			<Row>
				<Col span={24}>
					{dishes?.map(
						({
							_id,
							dishName,
							upgradeDrinks,
							base,
							size,
							specialPizzaNotes,
							extraToppings,
							secondHalfPizza,
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
						}) => {
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
								secondHalfPizza == "No Second half pizza" ||
								secondHalfPizza === null
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
								dishName === "9“ Authentic Garlic Bread" ||
								dishName === "Tartofu" ||
								dishName === "Valhalla Choc Top Ice cream" ||
								dishName === "Valhalla Ice cream" ||
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
								secondHalfPizzaCombo1 ==
									"No Second half pizza" ||
								secondHalfPizzaCombo1 === null
							) {
								hasSecondHalfCombo1 = false;
							}

							if (
								secondHalfPizzaCombo2 ==
									"No Second half pizza" ||
								secondHalfPizzaCombo2 === null
							) {
								hasSecondHalfCombo2 = false;
							}

							if (
								secondHalfPizzaCombo3 ==
									"No Second half pizza" ||
								secondHalfPizzaCombo3 === null
							) {
								hasSecondHalfCombo3 = false;
							}

							if (
								secondHalfPizzaEndSpecial1 ==
									"No Second half pizza" ||
								secondHalfPizzaEndSpecial1 === null
							) {
								hasSecondHalfEndSpecial1 = false;
							}

							if (
								secondHalfPizzaEndSpecial2 ==
									"No Second half pizza" ||
								secondHalfPizzaEndSpecial2 === null
							) {
								hasSecondHalfEndSpecial2 = false;
							}

							if (
								secondHalfPizzaEndSpecial3 ==
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

							console.log("sec", secondHalfExtraToppings);
							return (
								<div key={_id}>
									<div className="fw-600">{`Dish Name:${dishName}`}</div>
									{hasPizzaChoice ? (
										<div name="pizzachoice">{`Pizza Choice: ${pizzaChoice}`}</div>
									) : null}
									{hasPastaChoice ? (
										<div name="pastachoice">{`Pasta Choice: ${pastaChoice}`}</div>
									) : null}
									{hasBase ? (
										<div name="base">{`Base: ${base}`}</div>
									) : null}
									{hasSize ? (
										<div name="size">{`Size: ${size}`}</div>
									) : null}
									{hasExtraToppings ? (
										<div className="secondary fs-xs">
											Extra Toppings:
											{extraToppings.map((i) => {
												return ` ${i}; `;
											})}
										</div>
									) : null}
									{hasSecondHalf ? (
										<div className="secondary fs-xs">{`Second Half:${secondHalfPizza}`}</div>
									) : null}
									{/* {extraToppings[0] != "" ? (
										<div className="secondary fs-xs">
											Extra Toppings:
											{extraToppings.map((i) => {
												return ` ${i} `;
											})}
										</div>
									) : null} */}
									{hasSpecial ? (
										<div className="secondary">
											Special:
											{specialPizzaNotes.map((i) => {
												return ` ${i}; `;
											})}
										</div>
									) : null}
									{hasCombo1 ? (
										<div className="fw-600">{`Pizza 1:${pizzaCombo1}`}</div>
									) : null}
									{hasBase1 ? (
										<div className="secondary fs-xs">{`Base Pizza 1:${baseCombo1}`}</div>
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
										<div className="secondary fs-xs">{`Second Half Pizza 1:${secondHalfPizzaCombo1}`}</div>
									) : null}
									{hasSecondHalfPizzaExtraToppingsCombo1 ? (
										<div className="secondary fs-xs">
											Second Half Extra Toppings Pizza 1:
											{secondHalfPizzaExtraToppingsCombo1.map(
												(i) => {
													return ` ${i} `;
												}
											)}
										</div>
									) : null}

									{hasCombo2 ? (
										<div className="fw-600">{`Pizza 2:${pizzaCombo2}`}</div>
									) : null}
									{hasBase2 ? (
										<div className="secondary fs-xs">{`Base Pizza 2:${baseCombo2}`}</div>
									) : null}
									{hasExtraToppingsCombo2 ? (
										<div className="secondary fs-xs">
											Extra Toppings Pizza 2:
											{extraToppingsCombo2.map((i) => {
												return ` ${i} `;
											})}
										</div>
									) : null}
									{hasSecondHalfCombo2 ? (
										<div className="secondary fs-xs">{`Second Half Pizza 2:${secondHalfPizzaCombo2}`}</div>
									) : null}
									{hasSecondHalfPizzaExtraToppingsCombo2 ? (
										<div className="secondary fs-xs">
											Second Half Extra Toppings Pizza 2:
											{secondHalfPizzaExtraToppingsCombo2.map(
												(i) => {
													return ` ${i} `;
												}
											)}
										</div>
									) : null}
									{hasCombo3 ? (
										<div className="fw-600">{`Pizza 3:${pizzaCombo3}`}</div>
									) : null}
									{hasBase3 ? (
										<div className="secondary fs-xs">{`Base Pizza 3:${baseCombo3}`}</div>
									) : null}
									{hasExtraToppingsCombo3 ? (
										<div className="secondary fs-xs">
											Extra Toppings Pizza 3:
											{extraToppingsCombo3.map((i) => {
												return ` ${i} `;
											})}
										</div>
									) : null}
									{hasSecondHalfCombo3 ? (
										<div className="secondary fs-xs">{`Second Half Pizza 3:${secondHalfPizzaCombo3}`}</div>
									) : null}
									{hasSecondHalfPizzaExtraToppingsCombo3 ? (
										<div className="secondary fs-xs">
											Second Half Extra Toppings Pizza 3:
											{secondHalfPizzaExtraToppingsCombo3.map(
												(i) => {
													return ` ${i} `;
												}
											)}
										</div>
									) : null}
									{hasEndSpecial1 ? (
										<div className="fw-600">{`Pizza 1:${pizzaEndSpecial1}`}</div>
									) : null}
									{hasEndSpecialBase1 ? (
										<div className="secondary fs-xs">{`Base Pizza 1:${baseEndSpecial1}`}</div>
									) : null}

									{hasExtraToppingsEndSpecial1 ? (
										<div className="extraToppingCombo1">
											Extra Toppings Pizza 1:{" "}
											{extraToppingsEndSpecial1?.map(
												(i) => {
													return ` ${i}; `;
												}
											)}
										</div>
									) : null}

									{hasSecondHalfEndSpecial1 ? (
										<div className="secondary fs-xs">{`Second Half Pizza 1:${secondHalfPizzaEndSpecial1}`}</div>
									) : null}
									{hasSecondHalfPizzaExtraToppingsEndSpecial1 ? (
										<div className="secondary fs-xs">
											Second Half Extra Toppings Pizza 1:
											{secondHalfPizzaExtraToppingsEndSpecial1.map(
												(i) => {
													return ` ${i} `;
												}
											)}
										</div>
									) : null}

									{hasEndSpecial2 ? (
										<div className="fw-600">{`Pizza 2:${pizzaEndSpecial2}`}</div>
									) : null}
									{hasEndSpecialBase2 ? (
										<div className="secondary fs-xs">{`Base Pizza 2:${baseEndSpecial2}`}</div>
									) : null}
									{hasExtraToppingsEndSpecial2 ? (
										<div className="secondary fs-xs">
											Extra Toppings Pizza 2:
											{extraToppingsEndSpecial2.map(
												(i) => {
													return ` ${i} `;
												}
											)}
										</div>
									) : null}
									{hasSecondHalfEndSpecial2 ? (
										<div className="secondary fs-xs">{`Second Half Pizza 2:${secondHalfPizzaEndSpecial2}`}</div>
									) : null}
									{hasSecondHalfPizzaExtraToppingsEndSpecial2 ? (
										<div className="secondary fs-xs">
											Second Half Extra Toppings Pizza 2:
											{secondHalfPizzaExtraToppingsEndSpecial2.map(
												(i) => {
													return ` ${i} `;
												}
											)}
										</div>
									) : null}
									{hasEndSpecial3 ? (
										<div className="fw-600">{`Pizza 3:${pizzaEndSpecial3}`}</div>
									) : null}
									{hasEndSpecialBase3 ? (
										<div className="secondary fs-xs">{`Base Pizza 3:${baseEndSpecial3}`}</div>
									) : null}
									{hasExtraToppingsEndSpecial3 ? (
										<div className="secondary fs-xs">
											Extra Toppings Pizza 3:
											{extraToppingsEndSpecial3.map(
												(i) => {
													return ` ${i} `;
												}
											)}
										</div>
									) : null}
									{hasSecondHalfEndSpecial3 ? (
										<div className="secondary fs-xs">{`Second Half Pizza 3:${secondHalfPizzaEndSpecial3}`}</div>
									) : null}
									{hasSecondHalfPizzaExtraToppingsEndSpecial3 ? (
										<div className="secondary fs-xs">
											Second Half Extra Toppings Pizza 3:
											{secondHalfPizzaExtraToppingsEndSpecial3.map(
												(i) => {
													return ` ${i} `;
												}
											)}
										</div>
									) : null}
									{hasSecondHalfExtraToppings ? (
										<div className="secondHalfPizzaExtraToppingsCombo3">
											Second Half Extra Toppings:{" "}
											{secondHalfExtraToppings?.map(
												(i) => {
													return ` ${i}; `;
												}
											)}
										</div>
									) : null}
									{hasDrinkChoice ? (
										<div className="drinkChoice">
											DrinkChoice: {drinkChoice}
											{", "}
											{hasUpgrade
												? "Upgrade to 1.25L"
												: null}
											{hasSpecial ? "1.25L" : null}
										</div>
									) : null}
								</div>
							);
						}
					)}
				</Col>
			</Row>
			<Divider />
			<p className={classes.siteDescription}>打印小票</p>
			<Row>
				<Col span={8}>
					<Button
						// disabled={disableBtn}
						onClick={useThrottle(() => handlePrint(_id, "cn"), 500)}
					>
						中文
					</Button>
				</Col>
				{/* <Col span={8}>
					<Button
						// disabled={disableBtn}
						onClick={useThrottle(() => handlePrint(_id, "en"), 500)}
					>
						英文
					</Button>
				</Col> */}
				<Col span={8}>
					<Button
						onClick={throttle(() => handlePrint(_id, "kitchen"))}
						// disabled={disableBtn}
						type="dashed"
					>
						打印厨房小票
					</Button>
				</Col>
			</Row>
		</div>
	);
};

export default TransactionDetail;
