import { Field } from "formik";
import { Collapse, Radio, Space, Checkbox } from "antd";
import { useState } from "react";
import { SoftDrink } from "src/configs/constants";
import useDishes from "src/hooks/useDishes";

const { Panel } = Collapse;

const FridayAndSaturdaySpecial = ({ name }) => {
	const [checkboxValues, setCheckboxValues] = useState([]);
	const [checkedIndexes, setCheckedIndexes] = useState([]);

	const drinkOptions = SoftDrink;

	const { useStandardPizza } = useDishes();
	const { data: pizzaOptions } = useStandardPizza();

	const pizzaChoiceLimit = name === "Friday & Saturday Special 1" ? 2 : 3;

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

	return (
		<Collapse defaultActiveKey={["1", "2", "3", "4"]}>
			{/* Pizza Selection*/}
			<Panel header="Pizza Select" key="1">
				<Field name="specialPizzaNotes">
					{({ field }) => {
						const { onChange: onChangeFormik, ...rest } = field;

						return (
							<Checkbox.Group {...rest} id="specialPizzaNotes">
								<Space direction="vertical">
									{pizzaOptions?.map((name, index) => {
										return (
											<Checkbox
												key={name}
												value={name}
												size="lg"
												name="pizza"
												disabled={
													checkboxValues.length >=
														pizzaChoiceLimit &&
													!checkedIndexes.includes(
														index
													)
												}
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
											</Checkbox>
										);
									})}
								</Space>
							</Checkbox.Group>
						);
					}}
				</Field>
			</Panel>
			{/* Drink Selection*/}
			<Panel header="Drink Selection" key="2">
				<Field name="drinkSelection">
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
		</Collapse>
	);
};

export default FridayAndSaturdaySpecial;
