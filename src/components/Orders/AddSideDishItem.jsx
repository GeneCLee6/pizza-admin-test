import { useState, useContext } from "react";
import { Formik, Form, Field } from "formik";
import PizzaDetail from "src/components/Orders/PizzaDetail";
import PastaDetail from "src/components/Orders/PastaDetail";
import FridayAndSaturdaySpecial from "./FridayAndSaturdaySpecial";
import ThursdayAndSundaySpecial from "./ThursdayAndSundaySpecial";
import PickUpSpecialDetail from "src/components/Orders/PickUpSpecialDetail";
import DrinkDetail from "./DrinkDetail";
import { v4 as uuid } from "uuid";

import { GlobalContext } from "../../contexts/GlobalProvider";
import ComboTest from "./ComboTest";

const AddSideDishItem = ({
	selectedSideDishItem,
	setShowAddSideDishModal,
	dishes,
	setDishes,
}) => {
	const {
		_id,
		name,
		description,
		dishType,
		prices,
		photo,
	} = selectedSideDishItem;

	const [itemQuantity] = useState(1);

	const { addItem } = useContext(GlobalContext);

	let initialValues = {
		size: "",
		sizePrice: 0,
		base: "",
		basePrice: 0,
		drinkChoice: "",
		extraToppings: "",
		extraToppingsPrices: [],
		extraToppingSumPrice: 0,
		extraToppingsCombo1: "",
		extraToppingsPricesCombo1: [],
		extraToppingsCombo2: "",
		extraToppingsPricesCombo2: [],
		extraToppingsCombo3: "",
		extraToppingsPricesCombo3: [],
		secondHalfPizzaExtraToppingsCombo1: "",
		secondHalfPizzaExtraToppingsPricesCombo1: [],
		secondHalfPizzaExtraToppingsCombo2: "",
		secondHalfPizzaExtraToppingsPricesCombo2: [],
		secondHalfPizzaExtraToppingsCombo3: "",
		secondHalfPizzaExtraToppingsPricesCombo3: [],
		secondHalf: "",
		secondHalfPrice: 0,
		secondHalfExtraToppings: "",
		secondHalfExtraToppingsPrices: [],
		secondHalfPriceCombo1: 0,
		secondHalfPriceCombo2: 0,
		secondHalfPriceCombo3: 0,
		firstHalf: "",
		firstHalfPrice: 0,
		note: "",
		pastaChoice: "",
		pastaChoicePrice: 0,
		pizzaSpecialPrice: 10,
		pizzaChoice: "",
		specialPizzaNotes: "",
		dishPrice: 0,
		currentPrice: 0,
		pizzaCombo1: "",
		baseCombo1: "",
		basePriceCombo1: 0,
		secondHalfPizzaCombo1: "",
		pizzaCombo2: "",
		baseCombo2: "",
		basePriceCombo2: 0,
		secondHalfPizzaCombo2: "",
		pizzaCombo3: "",
		baseCombo3: "",
		basePriceCombo3: 0,
		secondHalfPizzaCombo3: "",
		upgradeDrinks: [],
		upgradeDrinkPrice: 0,
	};

	const handleAddToCart = (item) => {
		const totalToppingPrice = item.extraToppingsPrices.reduce(
			(sum, value) => (sum += value),
			0
		);
		const totalToppingPriceCombo1 = item.extraToppingsPricesCombo1.reduce(
			(sum, value) => (sum += value),
			0
		);
		const totalToppingPriceCombo2 = item.extraToppingsPricesCombo2.reduce(
			(sum, value) => (sum += value),
			0
		);
		const totalToppingPriceCombo3 = item.extraToppingsPricesCombo3.reduce(
			(sum, value) => (sum += value),
			0
		);
		let secondHalfTotalToppingPriceCombo1 = item.secondHalfPizzaExtraToppingsPricesCombo1.reduce(
			(sum, value) => (sum += value),
			0
		);
		let secondHalfTotalToppingPriceCombo2 = item.secondHalfPizzaExtraToppingsPricesCombo2.reduce(
			(sum, value) => (sum += value),
			0
		);
		let secondHalfTotalToppingPriceCombo3 = item.secondHalfPizzaExtraToppingsPricesCombo3.reduce(
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
		if (dishType === "gourmet") {
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
		) {
			currentPrice = prices[0];
		}
		if (dishType === "testspecial") {
			const firstHalfPrice = prices[0];
			if (item.secondHalfPriceCombo1 === 0) {
				item.secondHalfPizzaExtraToppingsCombo1 = "";
				secondHalfTotalToppingPriceCombo1 = 0;
			}
			if (item.secondHalfPriceCombo2 === 0) {
				item.secondHalfPizzaExtraToppingsCombo2 = "";
				secondHalfTotalToppingPriceCombo2 = 0;
			}
			if (item.secondHalfPriceCombo3 === 0) {
				item.secondHalfPizzaExtraToppingsCombo3 = "";
				secondHalfTotalToppingPriceCombo3 = 0;
			}
			const pizzaPrice =
				firstHalfPrice +
				item.secondHalfPriceCombo1 +
				item.secondHalfPriceCombo2 +
				item.secondHalfPriceCombo3 +
				totalToppingPriceCombo1 +
				totalToppingPriceCombo2 +
				totalToppingPriceCombo3 +
				secondHalfTotalToppingPriceCombo1 +
				secondHalfTotalToppingPriceCombo2 +
				secondHalfTotalToppingPriceCombo3 +
				item.basePriceCombo1 +
				item.basePriceCombo2 +
				item.basePriceCombo3 +
				item.upgradeDrinkPrice;
			currentPrice = pizzaPrice;
		}

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
					{dishType === "gourmet" && (
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
					{dishType === "testspecial" && (
						<ComboTest
							prices={prices}
							values={values}
							name={name}
							dishType={dishType}
						/>
					)}
					{dishType === "drink" && <DrinkDetail name={name} />}

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
