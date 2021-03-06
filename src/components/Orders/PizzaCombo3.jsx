import { Field } from "formik";
import { Collapse, Radio, Space, Checkbox } from "antd";
import { useExtraToppings } from "../../hooks/useTopping";
import { useSecondHalfPizza } from "../../hooks/useSecondHalfPizza";
import { useFirstHalfPizza } from "src/hooks/useFirstHalfPizza";
import { useState } from "react";
import { PizzaSize, ComboBase } from "src/configs/constants";
import useDishes from "src/hooks/useDishes";

const { Panel } = Collapse;

const PizzaCombo3 = ({ name, values, prices, dishType }) => {
	const { data: pizzaExtraToppings } = useExtraToppings("pizza");
	const { data: secondHalfPizzaOptions } = useSecondHalfPizza(name);
	const { data: firstHalfPizza } = useFirstHalfPizza(name);

	const [checkboxValues, setCheckboxValues] = useState([]);
	const [checkedIndexes, setCheckedIndexes] = useState([]);

	//	const combos = ["Combo 1", "Combo 2", "Combo 3"];
	//const drinkOptions = name === combos[0] ? CannedDrink : SoftDrink;
	//const chosenComboIndex = combos.indexOf(name);
	//const pizzaChoiceLimit = chosenComboIndex + 1;

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
		<Collapse defaultActiveKey={["1", "2", "3", "4", "5"]}>
			{/* Pizza Selection*/}
			<Panel header="Pizza Select" key="1">
				<Field name="pizzaCombo3">
					{({ field }) => {
						const { onChange: onChangeFormik, ...rest } = field;

						return (
							<Radio.Group {...rest} id="pizzaCombo3">
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
			<Panel header="Pizza Combo 3 Base" key="2">
				<Field name="baseCombo3">
					{({ field }) => {
						const { onChange, ...rest } = field;
						if (rest.value) {
							const base = ComboBase.filter(
								(base) => base.name === rest.value
							)[0];
							values.basePriceCombo3 = base.price;
						}

						return (
							<Radio.Group {...rest} id="baseCombo3">
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
				<Field name="extraToppingsCombo3">
					{({ field }) => {
						const { onChange, ...rest } = field;
						const toppings = [...rest.value];
						values.extraToppingsPricesCombo3 = toppings.map(
							(toppingName) => {
								const pizzaExtraTopping = pizzaExtraToppings?.filter(
									(topping) =>
										topping.toppingName === toppingName
								)[0];
								if (values.secondHalfPizzaCombo3) {
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
							<Checkbox.Group {...rest} id="extraToppingsCombo3">
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
													name="extraToppingsCombo3"
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
																	?.secondHalfPizzaCombo3[0]
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
			{/* Second Half Selection*/}
			<Panel header="Second Half" key="4">
				<Field name="secondHalfPizzaCombo3">
					{({ field }) => {
						const { onChange, ...rest } = field;
						if (values.secondHalfPizzaCombo3) {
							values.secondHalfPriceCombo3 = 1;
						}
						if (values.secondHalfPizzaCombo3.length === 0) {
							values.secondHalfPriceCombo3 = 0;
							values.secondHalfPizzaExtraToppingsCombo3 = "";
							values.secondHalfTotalToppingPriceCombo3 = "";
						}

						return (
							<Radio.Group {...rest} id="secondHalfPizzaCombo3">
								<Space direction="vertical">
									{secondHalfPizzaOptions?.map(
										({ name, prices, _id }) => {
											const itemPrice = retrieveItemPrice(
												prices,
												values.size
											);

											const firstHalfPrice = retrieveItemPrice(
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
													name="secondHalfPizzaCombo3"
													onChange={onChange}
													disabled={
														values?.secondHalfPizzaCombo3[0] &&
														values?.secondHalfPizzaCombo3[0] !== name
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
				<Field name="secondHalfPizzaExtraToppingsCombo3">
					{({ field }) => {
						const { onChange, ...rest } = field;
						const toppings = [...rest.value];
						values.secondHalfPizzaExtraToppingsPricesCombo3 = toppings.map(
							(toppingName) => {
								const pizzaExtraTopping = pizzaExtraToppings?.filter(
									(topping) =>
										topping.toppingName === toppingName
								)[0];
								const price =
									retrieveItemPrice(
										pizzaExtraTopping.prices,
										"large"
									) / 2;
								return price;
							}
						);
						return (
							<Checkbox.Group
								{...rest}
								id="secondHalfPizzaExtraToppingsCombo3"
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
													name="secondHalfPizzaExtraToppingsCombo3"
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
																	?.secondHalfPizzaCombo3[0]
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
		</Collapse>
	);
};

export default PizzaCombo3;
