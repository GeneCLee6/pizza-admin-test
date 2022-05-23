import {
	useReducer,
	useMemo,
	useEffect,
	useCallback,
	createContext,
} from "react";
import globalReducer from "../redux/reducers/globalReducer";
export const GlobalContext = createContext({});

const initialState = {
	loading: false,
	cart: [],
	totalQuantity: 0,
	totalPrice: 0,
};

const GlobalProvider = (props) => {
	const [state, dispatch] = useReducer(globalReducer, initialState);

	const { cart, totalQuantity, totalPrice } = state;
	const clearCart = useCallback(() => {
		dispatch({ type: "CLEAR_CART" });
	}, [dispatch]);

	const toggleQuantity = useCallback(
		(_id, type) => {
			dispatch({ type: "TOGGLE_QUANTITY", payload: { _id, type } });
		},
		[dispatch]
	);

	const updateItem = useCallback(
		(newItem) => {
			dispatch({ type: "UPDATE_ITEM", payload: newItem });
		},
		[dispatch]
	);

	const addItem = useCallback(
		(item) => {
			dispatch({ type: "ADD_TO_CART", payload: item });
		},
		[dispatch]
	);

	const removeItem = useCallback(
		(_id) => {
			dispatch({ type: "REMOVE", payload: _id });
		},
		[dispatch]
	);

	const contextValue = useMemo(() => ({ cart, totalQuantity, totalPrice }), [
		cart,
		totalQuantity,
		totalPrice,
	]);

	useEffect(() => {
		dispatch({ type: "GET_TOTALS" });
	}, [state.cart]);

	return (
		<GlobalContext.Provider
			value={{
				contextValue,
				clearCart,
				toggleQuantity,
				addItem,
				removeItem,
				updateItem,
			}}
		>
			{props.children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
