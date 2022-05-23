import { Field } from "formik";
import { Collapse, Radio, Space, Checkbox } from "antd";
const { Panel } = Collapse;

import { PastaChoice, pastaExtraToppings } from "../../configs/constants";
import { useExtraToppings } from "../../hooks/useTopping";
import { retrieveItemPrice } from "../../utils/helpers";

const PastaDetail = ({ values }) => {
	const { data } = useExtraToppings("pasta");
	//const checkboxData = pastaExtraToppings?.map((i) => i.toppingName);
	return (
		<Collapse defaultActiveKey={["1", "2"]}>
			<Panel header="Pasta Choice" key="1">
				<Field name="pastaChoice">
					{({ field }) => {
						const { onChange, ...rest } = field;
						if (
							["Gnocchi", "Ravioli", "Spinach Ravioli"].includes(
								rest.value
							)
						) {
							values.pastaChoicePrice =
								rest.value === "Gnocchi" ? 1 : 1.5;
						}
						return (
							<Radio.Group {...rest} id="pastaChoice">
								<Space direction="vertical">
									{PastaChoice.map((choice) => (
										<Radio
											key={choice}
											value={choice}
											onChange={onChange}
										>
											<div>
												<div>{choice}</div>
												<div></div>
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
			<Panel header="Extra Toppings" key="2">
				<Field name="extraToppings">
					{({ field }) => {
						const { onChange, ...rest } = field;
						const toppings = [...rest.value];
						values.extraToppingsPrices = toppings.map(
							(toppingName) => {
								const extraToppings = pastaExtraToppings.filter(
									(topping) =>
										topping.toppingName === toppingName
								)[0];
								const price = retrieveItemPrice(
									extraToppings.prices
								);
								return price;
							}
						);
						return (
							<Checkbox.Group {...rest} id="extraToppings">
								<Space direction="vertical">
									{data &&
										data.map(
											({ _id, toppingName, prices }) => (
												<Checkbox
													key={_id}
													value={toppingName}
													name="extraToppings"
													onChange={onChange}
												>
													<Space>
														<div>{toppingName}</div>
														<div>{prices[0]}</div>
													</Space>
												</Checkbox>
											)
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

export default PastaDetail;
