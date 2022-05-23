const globalReducer = (state, action) => {
	switch (action.type) {
		case "CLEAR_CART":
			return {
				...state,
				cart: [],
			};
		case "REMOVE":
			return {
				...state,
				cart: state.cart.filter(
					(cartItem) => cartItem._id !== action.payload
				),
			};
		case "ADD_TO_CART":
			return {
				...state,
				cart: [...state.cart, action.payload],
			};
		case "GET_TOTALS":
			let { totalPrice, totalQuantity } = state.cart.reduce(
				(cartTotal, cartItem) => {
					const { currentPrice: price, quantity } = cartItem;
					const itemTotalPrice = price * quantity;
					cartTotal.totalPrice += itemTotalPrice;
					cartTotal.totalQuantity += quantity;
					return cartTotal;
				},
				{
					totalPrice: 0,
					totalQuantity: 0,
				}
			);
			totalPrice = parseFloat(totalPrice.toFixed(2));
			return {
				...state,
				totalPrice,
				totalQuantity,
			};
		case "LOADING":
			return {
				...state,
				loading: true,
			};
		case "DISPLAY_ITEMS":
			return {
				...state,
				cart: action.payload,
				loading: false,
			};
		case "UPDATE_ITEM":
			const newItem = action.payload;
			const newCart = state.cart.map((item) => {
				if (item._id === newItem._id) return newItem;
				return item;
			});

			return {
				...state,
				cart: newCart,
			};
		case "TOGGLE_QUANTITY":
			let tempCart = state.cart
				.map((cartItem) => {
					if (
						cartItem._id === action.payload._id ||
						cartItem?.itemId === action.payload._id
					) {
						if (action.payload.type === "increase") {
							return {
								...cartItem,
								quantity: cartItem.quantity + 1,
							};
						} else if (action.payload.type === "decrease") {
							return {
								...cartItem,
								quantity: cartItem.quantity - 1,
							};
						}
					}
					return cartItem;
				})
				.filter((cartItem) => cartItem.quantity !== 0);
			return {
				...state,
				cart: tempCart,
			};
	}
	throw new Error("no matching action type");
};

export default globalReducer;
