import { Space, Popconfirm, Skeleton, Table, Button, Radio, Input } from "antd";
import useSideDishes from "src/hooks/useSideDishes";
import useDishes from "src/hooks/useDishes";
import NewSideDish from "./NewSideDish";
import EditSideDish from "./EditSideDish";
import AllocationSideDish from "./AllocationSideDish";
import { priceFormatter } from "src/utils/helpers";

const { Search } = Input;

const SideDishes = () => {
	const {
		sideDishes,
		isLoading,
		error,
		currentSideDish,
		setCurrentSideDish,
		showNewSideDishModal,
		setShowNewSideDishModal,
		showEditSideDishModal,
		setShowEditSideDishModal,
		showAllocateSideDishModal,
		setShowAllocateSideDishModal,
		handleEdit,
		handleCreate,
		handleDelete,
		handleAllocate,
		toggleWithSideDishDishes,
		selectedDish,
		handleCheckSideDish,
		handleSearch,
	} = useSideDishes();
	const { isLoading: isDishesLoading, dishesData } = useDishes();
	const withSideDishDishes = dishesData?.filter((i) => !!i.hasSideDish);

	const columns = [
		{
			title: "中文名",
			dataIndex: "sideDishCnName",
		},
		{
			title: "英文名",
			dataIndex: "sideDishEnName",
		},
		{
			title: "类型",
			dataIndex: "type",
		},
		{
			title: "价格",
			dataIndex: "price",
			render: (price) => priceFormatter(price),
		},
		{
			title: "操作",
			render: (_, record) => {
				return (
					<Space size="middle">
						<Button
							type="primary"
							onClick={() => {
								setCurrentSideDish(record);
								setShowEditSideDishModal(true);
							}}
						>
							编辑
						</Button>
						<Popconfirm
							title="确认删除该子菜品?"
							onConfirm={() => handleDelete(record)}
							okText="确定"
							cancelText="取消"
						>
							<a href="#">删除</a>
						</Popconfirm>
					</Space>
				);
			},
		},
	];

	return (
		<>
			<h1 className="font-weight-bold fs-lg">子菜品</h1>
			<div className="mb-4">
				<span className="fs-sm">可选主菜品：</span>
				<Radio.Group size="large" defaultValue="all">
					<Space wrap>
						{isDishesLoading ? (
							<Skeleton active />
						) : (
							<>
								{withSideDishDishes?.map((i) => (
									<Radio.Button
										key={i._id}
										value={i.dishCnName}
										onClick={() =>
											toggleWithSideDishDishes(i)
										}
									>
										{i.dishCnName}
									</Radio.Button>
								))}
							</>
						)}
					</Space>
				</Radio.Group>
			</div>
			<div className="mb-3 w-50 float-right">
				<Search
					placeholder="请输入子菜品名（中文）"
					onSearch={handleSearch}
					size="large"
					allowClear
					enterButton
				/>
			</div>
			<div>
				{error && <div>Something went wrong ...</div>}
				<Space />

				{isLoading ? (
					<Skeleton active />
				) : (
					<>
						<h3 className="fs-sm">子菜品列表:</h3>
						<Table
							columns={columns}
							rowKey={(record) => record._id}
							dataSource={sideDishes}
						/>
					</>
				)}
			</div>
			<div className="mt-3">
				<Button
					onClick={() => setShowNewSideDishModal(true)}
					type="primary"
				>
					创建新子菜品
				</Button>
			</div>
			<NewSideDish
				visible={showNewSideDishModal}
				onCreate={handleCreate}
				onCancel={() => {
					setShowNewSideDishModal(false);
				}}
			/>
			<EditSideDish
				visible={showEditSideDishModal}
				onEdit={handleEdit}
				currentSideDish={currentSideDish}
				onCancel={() => {
					setShowEditSideDishModal(false);
				}}
			/>
			<AllocationSideDish
				visible={showAllocateSideDishModal}
				onAllocate={handleAllocate}
				selectedDish={selectedDish}
				sideDishes={sideDishes}
				onCancel={() => {
					setShowAllocateSideDishModal(false);
				}}
				handleCheckSideDish={handleCheckSideDish}
			/>
		</>
	);
};

export default SideDishes;
