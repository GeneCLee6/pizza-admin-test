export const PizzaSize = ["small", "large", "family"];

export const PizzaBase = [
	{
		name: "normal crust",
		price: 0,
	},
	{
		name: "thin pan",
		price: 1.0,
	},
	{
		name: "deep pan",
		price: 1.0,
	},
];

export const ComboBase = [
	{
		name: "normal crust",
		price: 0,
	},
	{
		name: "thin pan",
		price: 1,
	},
	{
		name: "deep pan",
		price: 1,
	},
];

export const PastaChoice = [
	"Fettuccine",
	"Spaghetti",
	"Penne",
	"Gnocchi",
	"Ravioli",
	"Spinach Ravioli",
];

export const pastaExtraToppings = [
	{
		_id: "62466d719a97096751915562",
		toppingName: "BACON",
		prices: [1],
	},
	{
		_id: "62466d719a97096751915563",
		toppingName: "ROASTED CHICKEN",
		prices: [1],
	},
	{
		_id: "62466d719a97096751915564",
		toppingName: "PEPPERONI",
		prices: [1],
	},
	{
		_id: "62466d719a97096751915565",
		toppingName: "MUSHROOM",
		prices: [1],
	},
];

export const CannedDrink = ["Coke", "Sprite", "Fanta"];

export const SoftDrink = [
	"Coke",
	"Coke No Sugar",
	"Diet Coke",
	"Coke Vanilla",
	"Coke Vanilla No Sugar",
	"Spinach Ravioli",
	"Coke",
	"Sprite",
	"Fanta",
];

export const ShippingRequirements = [
	{
		suburbs: ["Bellerive"],
		minOrderCost: 15,
		fee: 4,
	},
	{
		suburbs: ["Rosny", "Rosny Park", "Montagu Bay", "Warrane", "Rose Bay"],
		minOrderCost: 16,
		fee: 5,
	},
	{
		suburbs: ["Mornington", "Lindisfarne", "Howrah", "Rokeby"],
		minOrderCost: 19,
		fee: 6,
	},
	{
		suburbs: ["Tranmere", "Clarendon Vale", "Oakdowns", "Geilston Bay"],
		minOrderCost: 21,
		fee: 7,
	},
];
