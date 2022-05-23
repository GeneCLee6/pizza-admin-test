import { Field } from "formik";
import { Collapse, Radio, Space, Checkbox } from "antd";
import { useExtraToppings } from "../../hooks/useTopping";
import { PizzaSize } from "../../configs/constants";
import useDishes from "src/hooks/useDishes";

const { Panel } = Collapse;

const PickUpSpecialDetail = ({ values, prices }) => {
	const { useStandardPizza } = useDishes();
	const { data: pizzaOptions } = useStandardPizza();
	const { data: pizzaExtraToppings } = useExtraToppings("pizza");
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
			{/* Pizza Selection*/}
			<Panel header="Pizza Select" key="2">
				<Field name="pizzaChoice">
					{({ field }) => {
						const { onChange, ...rest } = field;
						return (
							<Radio.Group {...rest} id="pizzaChoice">
								<Space align="start" pl="2" gap={2}>
									{pizzaOptions?.map((name) => (
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
									pizzaExtraTopping?.prices,
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
		</Collapse>
	);
};

export default PickUpSpecialDetail;
