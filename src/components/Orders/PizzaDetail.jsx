import { Field } from "formik";
import { Collapse, Radio, Space, Checkbox } from "antd";
import { useExtraToppings } from "../../hooks/useTopping";
import { useSecondHalfPizza } from "../../hooks/useSecondHalfPizza";
import { PizzaSize, PizzaBase } from "../../configs/constants";
import { useFirstHalfPizza } from "src/hooks/useFirstHalfPizza";

const { Panel } = Collapse;
const PizzaDetail = ({ name, values, prices }) => {
	const { data: pizzaExtraToppings } = useExtraToppings("pizza");
	const { data: secondHalfPizzaOptions } = useSecondHalfPizza(name);
	const { data: firstHalfPizza } = useFirstHalfPizza(name);
	const selectedSize = values?.size || "small";

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
		<Collapse defaultActiveKey={["1", "2", "3", "4"]}>
			<Panel header="Pizza Size" key="1">
				<Field name="size">
					{({ field }) => {
						const { onChange, ...rest } = field;
						if (rest.value) {
							const sizeIndex = PizzaSize.indexOf(rest.value);
							values.sizePrice = prices[sizeIndex] - prices[0];
						}

						return (
							<Radio.Group {...rest} id="size">
								<Space align="start" pl="2" gap={2}>
									{PizzaSize.map((size, index) => (
										<Radio
											key={size}
											value={size}
											size="lg"
											onChange={onChange}
											width="100%"
										>
											<Space width="100%">
												<div
													fontWeight="600"
													fontSize="15px"
													texttransform="capitalize"
												>
													{size}
												</div>
												{size !== PizzaSize[0] && (
													<div
														fontWeight="600"
														fontSize="15px"
														ml={4}
													>
														{plusPriceFormatter(
															prices[index] -
																prices[0]
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
			{/* Base Selection*/}
			<Panel header="Pizza Base" key="2">
				<Field name="base">
					{({ field }) => {
						const { onChange, ...rest } = field;
						if (rest.value) {
							const base = PizzaBase.filter(
								(base) => base.name === rest.value
							)[0];
							values.basePrice = base.price;
						}

						return (
							<Radio.Group {...rest} id="base">
								<Space align="start" pl="2" gap={2}>
									{PizzaBase.map(({ name, price }) => (
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
				<Field name="extraToppings">
					{({ field }) => {
						const { onChange, ...rest } = field;
						const toppings = [...rest.value];
						values.extraToppingsPrices = toppings.map(
							(toppingName) => {
								const pizzaExtraTopping = pizzaExtraToppings?.filter(
									(topping) =>
										topping.toppingName === toppingName
								)[0];
								const price = retrieveItemPrice(
									pizzaExtraTopping.prices,
									selectedSize
								);
								return price;
							}
						);
						return (
							<Checkbox.Group {...rest} id="extraToppings">
								<Space direction="vertical">
									{pizzaExtraToppings?.map(
										({ _id, toppingName, prices }) => {
											const itemPrice = retrieveItemPrice(
												prices,
												selectedSize
											);
											return (
												<Checkbox
													key={_id}
													value={toppingName}
													size="lg"
													name="extraToppings"
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
																{plusPriceFormatter(
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
				<Field name="secondHalf">
					{({ field }) => {
						const { onChange, ...rest } = field;
						if (rest.value.length) {
							const secondHalf = secondHalfPizzaOptions.filter(
								(option) => option.name === rest.value
							)[0];
							const itemPrice = retrieveItemPrice(
								secondHalf.prices,
								values.size
							);

							const firstHalfPrice = retrieveItemPrice(
								firstHalfPizza[0].prices,
								values.size
							);

							const subtractedPrice = itemPrice - firstHalfPrice;
							values.secondHalfPrice =
								subtractedPrice > 0 ? subtractedPrice : 0;
						}
						return (
							<Radio.Group {...rest} id="secondHalf">
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
												<Radio
													key={_id}
													value={name}
													size="lg"
													name="secondHalf"
													onChange={onChange}
													isDisabled={
														values?.secondHalf[0] &&
														values
															?.secondHalf[0] !==
															name
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
												</Radio>
											);
										}
									)}
								</Space>
							</Radio.Group>
						);
					}}
				</Field>
			</Panel>
		</Collapse>
	);
};

export default PizzaDetail;
