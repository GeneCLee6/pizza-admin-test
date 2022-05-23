export const priceFormatter = (price) => {
	const result = new Intl.NumberFormat("en-AU", {
		style: "currency",
		currency: "AUD",
		maximumFractionDigits: 2,
		minimumFractionDigits: 1,
	}).format(price);
	return result;
};

export const priceRounder = (price) => {
	return Math.round(price * 100) / 100;
};

export const isClient = typeof window !== "undefined";

export const throttle = (fn, delay = 500) => {
	let preTime = Date.now();

	return (event) => {
		const context = this;
		event.persist && event.persist();
		let doTime = Date.now();
		if (doTime - preTime >= delay) {
			fn.apply(context);
			preTime = Date.now();
		}
	};
};

/**
 * 模糊查询
 * @param  {Array}  list     原数组
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
export const fuzzyQueryDishes = (list, keyWord) => {
	var reg = new RegExp(keyWord);
	var arr = [];
	for (var i = 0; i < list.length; i++) {
		if (reg.test(list[i]?.name)) {
			arr.push(list[i]);
		}
	}
	return arr;
};

export const fuzzyQuerySideDishes = (list, keyWord) => {
	var reg = new RegExp(keyWord);
	var arr = [];
	for (var i = 0; i < list.length; i++) {
		if (reg.test(list[i]?.sideDishCnName)) {
			arr.push(list[i]);
		}
	}
	return arr;
};

export const fuzzyQueryCategories = (list, keyWord) => {
	var reg = new RegExp(keyWord);
	var arr = [];
	for (var i = 0; i < list.length; i++) {
		if (reg.test(list[i]?.categoryName)) {
			arr.push(list[i]);
		}
	}
	return arr;
};

export const fuzzyQueryVendors = (list, keyWord) => {
	var reg = new RegExp(keyWord);
	var arr = [];
	for (var i = 0; i < list.length; i++) {
		if (reg.test(list[i]?.vendorName) || reg.test(list[i]?.staffName)) {
			arr.push(list[i]);
		}
	}
	return arr;
};

export const fuzzyQueryCoupons = (list, keyWord) => {
	var reg = new RegExp(keyWord);
	var arr = [];
	for (var i = 0; i < list.length; i++) {
		if (reg.test(list[i]?.code)) {
			arr.push(list[i]);
		}
	}
	return arr;
};

export const retrieveItemPrice = (prices, size) => {
	if (!size) return prices[0];
	switch (size) {
		case PizzaSize[0]:
			return prices[0];

		case PizzaSize[1]:
			return prices[1];

		case PizzaSize[2]:
			return prices[2];

		default:
			throw new Error("Invalid price");
	}
};
