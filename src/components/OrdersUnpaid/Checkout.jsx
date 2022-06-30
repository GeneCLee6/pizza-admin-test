import { Table, Button } from "antd";
import useCheckout from "src/hooks/useCheckout";
import { priceFormatter } from "src/utils/helpers";

const Checkout = ({ currentOrder, setShowCheckoutModal, form, setDishes }) => {
	const { handleCheckout } = useCheckout(
		setShowCheckoutModal,
		form,
		setDishes
	);

	console.log("currentOrder", currentOrder);

	const columns = [
		{
			title: "Dish",
			dataIndex: ["dishID", "name"],
		},

		{
			title: "Price",
			align: "center",
			dataIndex: "price",
			render: (price, record) => {
				return <span>{priceFormatter(price)}</span>;
			},
		},

		{
			title: "Quantity",
			align: "center",
			dataIndex: "quantity",
		},
		{
			title: "Price",
			dataIndex: "price",
			align: "right",
			render: (price, record) => {
				return <span>{priceFormatter(price * record.quantity)}</span>;
			},
		},
	];

	return (
		<div className="px-4 py-2">
			<h1 className="text-center mb.2">CHECKOUT</h1>
			<Table
				columns={columns}
				rowKey={(record) => record?.itemId || record?._id}
				dataSource={currentOrder?.dishes}
				size="small"
				pagination={false}
				summary={() => (
					<>
						<Table.Summary.Row>
							<Table.Summary.Cell />
							<Table.Summary.Cell />
							<Table.Summary.Cell>
								<span className="font-weight-bold fs-lg">
									Delivery Fee
								</span>
							</Table.Summary.Cell>
							<Table.Summary.Cell className="text-right">
								<span className="font-weight-bold fs-lg text-primary">
									${currentOrder?.deliveryFee.toFixed(2)}
								</span>
							</Table.Summary.Cell>
						</Table.Summary.Row>
						<Table.Summary.Row>
							<Table.Summary.Cell />
							<Table.Summary.Cell />
							<Table.Summary.Cell>
								<span className="font-weight-bold fs-lg">
									Total Price
								</span>
							</Table.Summary.Cell>
							<Table.Summary.Cell className="text-right">
								<span className="font-weight-bold fs-lg text-primary">
									${currentOrder?.totalPrice.toFixed(2)}
								</span>
							</Table.Summary.Cell>
						</Table.Summary.Row>
					</>
				)}
			/>

			<div className="w-100 mx-auto mt-5 mb-4 d-flex justify-content-between">
				<Button
					type="primary"
					size="large"
					className="w-25"
					// disabled={disabledBtn}
					onClick={() => handleCheckout(currentOrder)}
				>
					Print大
				</Button>
			</div>
		</div>
	);
};

export default Checkout;
