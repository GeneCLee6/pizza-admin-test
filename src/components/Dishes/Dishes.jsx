import {
	Space,
	Popconfirm,
	Radio,
	Skeleton,
	Table,
	Button,
	Drawer,
	Tag,
	Input,
} from "antd";
import Image from "next/image";
import NewDish from "./NewDish";
import EditDish from "./EditDish";
import { priceFormatter } from "src/utils/helpers";

import useDishes from "src/hooks/useDishes";
import useCategory from "src/hooks/useCategory";

const { Search } = Input;

const Dishes = () => {
	const {
		isLoading,
		error,
		dishes,
		currentDish,
		setCurrentDish,
		showNewDishDrawer,
		setShowNewDishDrawer,
		showEditDishDrawer,
		setShowEditDishDrawer,
		handleCreate,
		handleDelete,
		handleEdit,
		onCategoryChange,
		handleSearch,
	} = useDishes();

	const { isLoading: isCategoriesLoading, categoriesData } = useCategory();

	const columns = [
		{
			title: "菜品",
			dataIndex: "dishCnName",
		},
		{
			title: "现价",
			dataIndex: "price",
			sorter: (a, b) => a.price * a.discount - b.price * b.discount,
			render: (price, dish) => {
				const { discount } = dish;
				return (
					<Space>
						{priceFormatter(price * discount)}
						{discount !== 1 && (
							<Tag color="geekblue">{discount}</Tag>
						)}
					</Space>
				);
			},
		},
		{
			title: "图片",
			dataIndex: "photo",
			render: (photo) => {
				if (!photo) return null;
				return (
					<Image
						alt="dish photo"
						src={photo}
						width={80}
						height={80}
					/>
				);
			},
		},
		{
			title: "库存",
			dataIndex: "hasStock",
			render: (hasStock, dish) => {
				if (!hasStock) return <span>/</span>;
				return <span>{dish.stock}</span>;
			},
		},
		{
			title: "类别",
			dataIndex: "category",
			render: (category) => {
				if (!category) return <span>/</span>;
				return <span>{category.categoryCnName}</span>;
			},
		},

		{
			title: "操作",
			render: (_, record) => {
				return (
					<Space size="middle">
						<Button
							type="primary"
							onClick={() => {
								setCurrentDish(record);
								setShowEditDishDrawer(true);
							}}
						>
							编辑
						</Button>
						<Popconfirm
							title="确认删除该菜品?"
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
			<h1 className="font-weight-bold fs-lg">菜品</h1>
			<div className="mb-4">
				<Radio.Group
					onChange={onCategoryChange}
					size="large"
					defaultValue="all"
				>
					<Space wrap>
						{isCategoriesLoading ? (
							<Skeleton active />
						) : (
							<>
								<Radio.Button value="all">所有</Radio.Button>
								{categoriesData?.map(
									({ _id, categoryCnName }) => (
										<Radio.Button
											key={_id}
											value={categoryCnName}
										>
											{categoryCnName}
										</Radio.Button>
									)
								)}
							</>
						)}
					</Space>
				</Radio.Group>
			</div>
			<div className="mb-3 w-50 float-right">
				<Search
					placeholder="请输入菜名（中文）"
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
					<Table
						columns={columns}
						rowKey={(record) => record._id}
						dataSource={dishes}
					/>
				)}
			</div>
			<div className="mt-3">
				<Button
					onClick={() => setShowNewDishDrawer(true)}
					type="primary"
				>
					创建新菜品
				</Button>
			</div>
			<Drawer
				title="创建新菜品"
				width={520}
				onClose={() => setShowNewDishDrawer(false)}
				visible={showNewDishDrawer}
				bodyStyle={{ paddingBottom: 80 }}
				destroyOnClose
			>
				<NewDish
					handleCreate={handleCreate}
					setShowNewDishDrawer={setShowNewDishDrawer}
				/>
			</Drawer>
			<Drawer
				title="编辑菜品"
				width={520}
				onClose={() => setShowEditDishDrawer(false)}
				visible={showEditDishDrawer}
				bodyStyle={{ paddingBottom: 80 }}
				destroyOnClose
			>
				<EditDish
					currentDish={currentDish}
					handleEdit={handleEdit}
					setShowEditDishDrawer={setShowEditDishDrawer}
				/>
			</Drawer>
		</>
	);
};

export default Dishes;
