import { Field } from "formik";
import { Collapse, Radio, Space } from "antd";
import { SoftDrink, CannedDrink } from "src/configs/constants";

const { Panel } = Collapse;

const DrinkDetail = ({ name }) => {
	const drinkOptions =
		name === "Soft Drink (Canned)" ? CannedDrink : SoftDrink;

	return (
		<Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6", "7"]}>
			{/* Drink Selection*/}
			<Panel header="Drink Selection" key="1">
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
		</Collapse>
	);
};

export default DrinkDetail;
