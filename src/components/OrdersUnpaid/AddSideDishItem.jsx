import { useState, useContext } from "react";
import { Formik, Form, Field } from "formik";
import PizzaDetail from "src/components/Orders/PizzaDetail";
import PastaDetail from "src/components/Orders/PastaDetail";
import FridayAndSaturdaySpecial from "./FridayAndSaturdaySpecial";
import ThursdayAndSundaySpecial from "./ThursdayAndSundaySpecial";
import PickUpSpecialDetail from "src/components/Orders/PickUpSpecialDetail";
import { v4 as uuid } from "uuid";

import { GlobalContext } from "../../contexts/GlobalProvider";

const AddSideDishItem = ({
	selectedSideDishItem,
	setShowAddSideDishModal,
	dishes,
	setDishes,
}) => {
	const { _id, name, description, dishType, prices, photo } =
		selectedSideDishItem;

	const [itemQuantity] = useState(1);

	const { addItem } = useContext(GlobalContext);

	let initialValues = {
		size: "",
		sizePrice: 0,
		base: "",
		basePrice: 0,
		pizzaSpecialPrice: 10,
		pizzaChoice: "",
		extraToppings: "",
		extraToppingsPrices: [],
		extraToppingSumPrice: 0,
		secondHalf: "",
		secondHalfPrice: 0,
		firstHalf: "",
		firstHalfPrice: 0,
		note: "",
		pastaChoice: "",
		pastaChoicePrice: 0,
		drinkChoice: "",
		specialPizzaNotes: "",
		dishPrice: 0,
		currentPrice: 0,
	};

	const handleAddToCart = (item) => {
		const totalToppingPrice = item.extraToppingsPrices.reduce(
			(sum, value) => (sum += value),
			0
		);

		let currentPrice = 0;
		if (dishType === "pizza") {
			const firstHalfPrice = prices[0];
			const pizzaPrice =
				firstHalfPrice +
				item.sizePrice +
				item.basePrice +
				totalToppingPrice +
				item.secondHalfPrice;
			currentPrice = pizzaPrice;
		}
		if (dishType === "pasta") {
			const pastaPrice = prices[0];
			const toalPastaPrice = pastaPrice;
			currentPrice = toalPastaPrice + totalToppingPrice;
		}
		if (dishType === "pizzaspecial") {
			currentPrice = totalToppingPrice + prices[0] + item.sizePrice;
		}
		if (
			dishType === "pizzaendspecial" ||
			dishType === "pizzacombospecial"
		) {
			currentPrice = prices[0];
		}
		if (
			["drink", "dessert", "main", "pizzacombospecial"].includes(dishType)
		)
			currentPrice = prices[0];

		const unique_id = uuid();

		const newItem = {
			_id,
			itemId: unique_id,
			name,
			...item,
			dishType,
			quantity: itemQuantity,
			currentPrice: currentPrice,
			photo: photo,
		};

		addItem(newItem);
		setDishes([...dishes, newItem]);
		return;
	};

	return (
		<Formik
			enableReinitialize
			initialValues={initialValues}
			onSubmit={async (cart, { resetForm }) => {
				handleAddToCart(cart);
				resetForm();
				setShowAddSideDishModal(false);
			}}
		>
			{({ isSubmitting, errors, touched, values }) => (
				<Form>
					<div>
						<div>{name}</div>
						<div>{description}</div>
					</div>
					{dishType === "pizza" && (
						<PizzaDetail
							prices={prices}
							values={values}
							name={name}
						/>
					)}
					{dishType === "pasta" && <PastaDetail values={values} />}
					{dishType === "pizzaspecial" && (
						<PickUpSpecialDetail
							prices={prices}
							values={values}
							name={name}
						/>
					)}
					{dishType === "pizzaendspecial" && (
						<FridayAndSaturdaySpecial
							prices={prices}
							values={values}
							name={name}
						/>
					)}
					{dishType === "pizzacombospecial" && (
						<ThursdayAndSundaySpecial
							prices={prices}
							values={values}
							name={name}
						/>
					)}

					{/* Note Selection*/}
					<div>Special Instructions</div>
					<div>
						<Field name="note">
							{({ field }) => (
								<textarea
									id="note"
									placeholder="Add a note"
									{...field}
								/>
							)}
						</Field>
					</div>
					<div>
						<button type="submit">Add to Cart 啊</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default AddSideDishItem;
