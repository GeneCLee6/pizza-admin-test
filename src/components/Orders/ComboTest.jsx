import { Field } from "formik";
import { Collapse, Radio, Space, Checkbox } from "antd";
import { useExtraToppings } from "../../hooks/useTopping";
import { useSecondHalfPizza } from "../../hooks/useSecondHalfPizza";
import { useFirstHalfPizza } from "src/hooks/useFirstHalfPizza";
import { useState } from "react";
import { SoftDrink, CannedDrink, ComboBase, PizzaSize } from "src/configs/constants";
import useDishes from "src/hooks/useDishes";
import PizzaCombo2 from "./PizzaCombo2";
import PizzaCombo3 from "./PizzaCombo3";

const { Panel } = Collapse;

const ComboTest = ({ name, values, prices, dishType }) => {
	const { data: pizzaExtraToppings } = useExtraToppings("pizza");
	const { data: secondHalfPizzaOptions } = useSecondHalfPizza(name);
	const { data: firstHalfPizza } = useFirstHalfPizza(name);

	const [checkboxValues, setCheckboxValues] = useState([]);
	const [checkedIndexes, setCheckedIndexes] = useState([]);

	const combos = ["Combo 1", "Combo 2", "Combo 3"];
	const drinkOptions = name === combos[0] ? CannedDrink : SoftDrink;

	const { useStandardPizza } = useDishes();
	const { data: pizzaOptions } = useStandardPizza();

	const handleCheckBoxChange = (e, name, index) => {
		const isChecked = e.target.checked;
		if (isChecked) {
			const newCheckboxValues = [...checkboxValues, name];
			setCheckboxValues(newCheckboxValues);
			const newCheckedIndexes = [...checkedIndexes, index];
			setCheckedIndexes(newCheckedIndexes);
			return checkboxValues.length;
		}

		const newCheckboxValues = checkboxValues.filter(
			(value) => value !== name
		);
		setCheckboxValues(newCheckboxValues);
		const newCheckedIndexes = checkedIndexes.filter(
			(checkedIndex) => checkedIndex !== index
		);
		setCheckedIndexes(newCheckedIndexes);
		return;
	};

	const priceFormatter = (price) => {
		const result = new Intl.NumberFormat("en-AU", {
			style: "currency",
			currency: "AUD",
			maximumFractionDigits: 1,
			minimumFractionDigits: 1,
		}).format(price);
		return result;
	};
	const plusPriceFormatter = (price) => `+${priceFormatter(price)}0`;

	const retrieveItemPrice = (price, size) => {
		if (!size) return price[0];
		switch (size) {
			case PizzaSize[0]:
				return price[0];

			case PizzaSize[1]:
				return price[1];

			case PizzaSize[2]:
				return price[2];

			default:
				throw new Error("Invalid price");
		}
	};

	return (
		<Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6", "7"]}>
			{/* Pizza Selection*/}
			<Panel header="Pizza Select" key="1">
				<Field name="pizzaCombo1">
					{({ field }) => {
						const { onChange: onChangeFormik, ...rest } = field;

						return (
							<Radio.Group {...rest} id="pizzaCombo1">
								<Space direction="vertical">
									{pizzaOptions?.map((name, index) => {
										return (
											<Radio
												key={name}
												value={name}
												size="lg"
												name="pizza"
												onChange={(e) => {
													handleCheckBoxChange(
														e,
														name,
														index
													);
													onChangeFormik(e);
												}}
											>
												<Space>
													<div
														fontWeight="600"
														fontSize="15px"
													>
														{name}
													</div>
												</Space>
											</Radio>
										);
									})}
								</Space>
							</Radio.Group>
						);
					}}
				</Field>
			</Panel>
			{/* base select */}
			<Panel header="Pizza Combo 1 Base" key="2">
				<Field name="baseCombo1">
					{({ field }) => {
						const { onChange, ...rest } = field;
						if (rest.value) {
							const base = ComboBase.filter(
								(base) => base.name === rest.value
							)[0];
							values.basePriceCombo1 = base.price;
						}

						return (
							<Radio.Group {...rest} id="baseCombo1">
								<Space align="start" pl="2" gap={2}>
									{ComboBase.map(({ name, price }) => (
										<Radio
											key={name}
											value={name}
											size="lg"
											onChange={onChange}
										>
											<Space>
												<div
													fontWeight="600"
													fontSize="15px"
													texttransform="capitalize"
												>
													{name}
												</div>
												{!!price && (
													<div
														fontWeight="600"
														fontSize="15px"
														ml={4}
													>
														{plusPriceFormatter(
															price
														)}
													</div>
												)}
											</Space>
										</Radio>
									))}
								</Space>
							</Radio.Group>
						);
					}}
				</Field>
			</Panel>
			{/* Extra Topping Selection*/}
			<Panel header="Extra Toppings" key="3">
				<Field name="extraToppingsCombo1">
					{({ field }) => {
						const { onChange, ...rest } = field;
						const toppings = [...rest.value];
						values.extraToppingsPricesCombo1 = toppings.map(
							(toppingName) => {
								const pizzaExtraTopping =
									pizzaExtraToppings?.filter(
										(topping) =>
											topping.toppingName === toppingName
									)[0];
								if (values.secondHalfPizzaCombo1) {
									const price =
										retrieveItemPrice(
											pizzaExtraTopping.prices,
											"large"
										) / 2;
									return price;
								} else {
									const price = retrieveItemPrice(
										pizzaExtraTopping.prices,
										"large"
									);
									return price;
								}
							}
						);
						return (
							<Checkbox.Group {...rest} id="extraToppingsCombo1">
								<Space direction="vertical">
									{pizzaExtraToppings?.map(
										({ _id, toppingName, prices }) => {
											const itemPrice = retrieveItemPrice(
												prices,
												"large"
											);
											return (
												<Checkbox
													key={_id}
													value={toppingName}
													size="lg"
													name="extraToppingsCombo1"
													onChange={onChange}
												>
													<Space>
														<div
															fontWeight="600"
															fontSize="15px"
															texttransform="capitalize"
														>
															{toppingName}
														</div>
														{!!itemPrice && (
															<div
																fontWeight="600"
																fontSize="15px"
																ml={4}
															>
																{values
																	?.secondHalfPizzaCombo1[0]
																	? plusPriceFormatter(
																		itemPrice /
																		2
																	)
																	: plusPriceFormatter(
																		itemPrice
																	)
																}
															</div>
														)}
													</Space>
												</Checkbox>
											);
										}
									)}
								</Space>
							</Checkbox.Group>
						);
					}}
				</Field>
			</Panel>
			{/* Second Half Selection*/}
			<Panel header="Second Half" key="4">
				<Field name="secondHalfPizzaCombo1">
					{({ field }) => {
						const { onChange, ...rest } = field;
						if (values.secondHalfPizzaCombo1) {
							values.secondHalfPriceCombo1 = 1;
						}

						if (values.secondHalfPizzaCombo1.length === 0) {
							values.secondHalfPriceCombo1 = 0;
							values.secondHalfPizzaExtraToppingsCombo1 = "";
							values.secondHalfTotalToppingPriceCombo1 = "";
						}

						return (
							<Radio.Group {...rest} id="secondHalfPizzaCombo1">
								<Space direction="vertical">
									{secondHalfPizzaOptions?.map(
										({ name, prices, _id }) => {
											const itemPrice = retrieveItemPrice(
												prices,
												values.size
											);

											const firstHalfPrice =
												retrieveItemPrice(
													firstHalfPizza[0].prices,
													values.size
												);
											const addPrice =
												itemPrice - firstHalfPrice;
											return (
												<Checkbox
													key={_id}
													value={name}
													size="lg"
													name="secondHalfPizzaCombo1"
													onChange={onChange}
													disabled={
														values?.secondHalfPizzaCombo1[0] &&
														values?.secondHalfPizzaCombo1[0] !== name
													}
												>
													<Space
														width="100%"
														justifycontent="space-between"
													>
														<div
															fontWeight="600"
															fontSize="25px"
															texttransform="capitalize"
														>
															{name}
														</div>
														{PizzaSize[0] && (
															<div
																fontWeight="600"
																fontSize="15px"
																ml={4}
															>
																{addPrice > 0
																	? plusPriceFormatter(
																		addPrice
																	)
																	: null}
															</div>
														)}
													</Space>
												</Checkbox>
											);
										}
									)}
								</Space>
							</Radio.Group>
						);
					}}
				</Field>
			</Panel>
			{/* Extra Topping Selection For Second Half*/}
			<Panel header="Extra Toppings For Second Half" key="5">
				<Field name="secondHalfPizzaExtraToppingsCombo1">
					{({ field }) => {
						const { onChange, ...rest } = field;
						const toppings = [...rest.value];
						values.secondHalfPizzaExtraToppingsPricesCombo1 =
							toppings.map((toppingName) => {
								const pizzaExtraTopping =
									pizzaExtraToppings?.filter(
										(topping) =>
											topping.toppingName === toppingName
									)[0];
								const price =
									retrieveItemPrice(
										pizzaExtraTopping.prices,
										"large"
									) / 2;
								return price;
							});
						return (
							<Checkbox.Group
								{...rest}
								id="secondHalfPizzaExtraToppingsCombo1"
							>
								<Space direction="vertical">
									{pizzaExtraToppings?.map(
										({ _id, toppingName, prices }) => {
											const itemPrice = retrieveItemPrice(
												prices,
												"large"
											);
											return (
												<Checkbox
													key={_id}
													value={toppingName}
													size="lg"
													name="secondHalfPizzaExtraToppingsCombo1"
													onChange={onChange}
												>
													<Space>
														<div
															fontWeight="600"
															fontSize="15px"
															texttransform="capitalize"
														>
															{toppingName}
														</div>
														{!!itemPrice && (
															<div
																fontWeight="600"
																fontSize="15px"
																ml={4}
															>
																{values
																	?.secondHalfPizzaCombo1[0]
																	? plusPriceFormatter(
																		itemPrice /
																		2
																	)
																	: plusPriceFormatter(
																		itemPrice
																	)}
															</div>
														)}
													</Space>
												</Checkbox>
											);
										}
									)}
								</Space>
							</Checkbox.Group>
						);
					}}
				</Field>
			</Panel>
			{(name === "Combo Special 2" || name === "Combo Special 3") && (
				<PizzaCombo2 values={values} name={name} />
			)}
			{name === "Combo Special 3" && (
				<PizzaCombo3 values={values} name={name} />
			)}
			{/* Drink Selection*/}
			<Panel header="Drink Selection" key="6">
				<Field name="drinkChoice">
					{({ field }) => {
						const { onChange, ...rest } = field;
						return (
							<Radio.Group {...rest} id="drinkChoice">
								<Space align="vertical" direction="vertical">
									{drinkOptions.map((name) => (
										<Radio
											key={name}
											value={name}
											size="lg"
											onChange={onChange}
										>
											<div
												fontWeight="600"
												fontSize="15px"
											>
												{name}
											</div>
										</Radio>
									))}
								</Space>
							</Radio.Group>
						);
					}}
				</Field>
			</Panel>
			{/* Upgrade Drink Selection*/}
			{name === "Combo Special 1" && (
				<Panel header="Upgrade Drink Selection" key="7">
					<Field name="upgradeDrinks">
						{({ field }) => {
							const { onChange } = field;
							values.upgradeDrinkPrice =
								values.upgradeDrinks.length * 2;
							const itemPrice = 2;
							return (
								<Checkbox.Group id="upgradeDrinks">
									<Space align="start" pl="2" gap={2}>
										<Checkbox
											size="lg"
											value="true"
											name="upgradeDrinks"
											onChange={onChange}
										>
											<Space>
												<div
													fontWeight="600"
													fontSize="15px"
													textTransform="capitalize"
												>
													Would you like to upgrade your
													drink to 1.25L?
												</div>
												{!!itemPrice && (
													<div
														fontWeight="600"
														fontSize="15px"
														ml={4}
													>
														{plusPriceFormatter(
															itemPrice
														)}
													</div>
												)}
											</Space>
										</Checkbox>
									</Space>
								</Checkbox.Group>
							);
						}}
					</Field>
				</Panel>
			)}
		</Collapse>
	);
};

export default ComboTest;
