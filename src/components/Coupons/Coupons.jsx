import { Space, Skeleton, Table, Drawer, Popconfirm, Input, Button } from "antd";
import useCoupons from "src/hooks/useCoupons";
import NewCoupon from "./NewCoupon";

const { Search } = Input;

const Coupons = () => {
	const {
		isLoading,
		error,
		coupons,
		showNewCouponDrawer,
		setShowNewCouponDrawer,
		handleSearch,
		handleCreate,
		handleDelete,
	} = useCoupons();

	const columns = [
		{
			title: "Code",
			dataIndex: "code",
			align: "center",
		},
		{
			title: "Description",
			dataIndex: "description",
			defaultSortOrder: "descend",
			align: "center",
		},
		{
			title: "Action",
			render: (_, record) => {
				return (
					<Space size="small">
						<Popconfirm
							title="Please confirm whether you would like to delete the coupon"
							onConfirm={() => handleDelete(record)}
							okText="Yes"
							cancelText="No"
						>
							<a href="#">Delete</a>
						</Popconfirm>
					</Space>
				);
			},
		},
	];

	return (
		<div>
			<h1 className="font-weight-bold fs-lg">Coupons</h1>
			<div className="mb-3 w-50 float-right">
				<Search
					placeholder="Please enter the coupon code"
					onSearch={handleSearch}
					size="large"
					allowClear
					enterButton
				/>
			</div>
			<div className="my-3">
				{error && <div>Something went wrong ...</div>}
				<Space />

				{isLoading ? (
					<Skeleton active />
				) : (
					<Table
						columns={columns}
						rowKey={(record) => record._id}
						dataSource={coupons}
					/>
				)}
			</div>
			<div className="mt-3">
				<Button
					onClick={() => setShowNewCouponDrawer(true)}
					type="primary"
				>
					Create Coupon
				</Button>
			</div>
			<Drawer
				title="Create Coupon"
				width={520}
				onClose={() => setShowNewCouponDrawer(false)}
				visible={showNewCouponDrawer}
				bodyStyle={{ paddingBottom: 80 }}
				destroyOnClose
			>
				<NewCoupon
					handleCreate={handleCreate}
					setShowNewCouponDrawer={setShowNewCouponDrawer}
				/>
			</Drawer>
		</div>
	);
};

export default Coupons;
