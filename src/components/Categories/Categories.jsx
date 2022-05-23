import { Space, Popconfirm, Skeleton, Table, Button, Modal, Input } from "antd";
import NewCategory from "./NewCategory";
import EditCategory from "./EditCategory";
import useCategory from "src/hooks/useCategory";

const { Search } = Input;

const Categories = () => {
	const {
		isLoading,
		error,
		categories,
		currentCategory,
		setCurrentCategory,
		showNewCategoryModal,
		setShowNewCategoryModal,
		showEditCategoryModal,
		setShowEditCategoryModal,
		handleCreate,
		handleDelete,
		handleEdit,
		handleSearch,
	} = useCategory();

	const columns = [
		{
			title: "菜品分类名",
			dataIndex: "categoryCnName",
		},
		{
			title: "菜品分类名（英文）",
			dataIndex: "categoryEnName",
		},
		{
			title: "优先级",
			dataIndex: "priority",
			sorter: (a, b) => a.priority - b.priority,
		},
		{
			title: "操作",
			render: (_, record) => {
				return (
					<Space size="middle">
						<Button
							type="primary"
							onClick={() => {
								setCurrentCategory(record);
								setShowEditCategoryModal(true);
							}}
						>
							编辑
						</Button>
						<Popconfirm
							title="确认删除该分类?"
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
			<h1 className="font-weight-bold fs-lg">分类</h1>
			<div className="mb-3 w-50 float-right">
				<Search
					placeholder="请输入分类名（中文）"
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
						dataSource={categories}
					/>
				)}
			</div>
			<div className="mt-3">
				<Button
					onClick={() => setShowNewCategoryModal(true)}
					type="primary"
				>
					创建新菜品分类
				</Button>
			</div>
			<Modal
				visible={showNewCategoryModal}
				title="创建新菜品分类"
				okText="创建"
				cancelText="取消"
				destroyOnClose
				onCancel={() => {
					setShowNewCategoryModal(false);
				}}
				footer={null}
			>
				<NewCategory handleCreate={handleCreate} />
			</Modal>
			<Modal
				visible={showEditCategoryModal}
				title="编辑菜品分类"
				okText="确定"
				cancelText="取消"
				destroyOnClose
				onCancel={() => {
					setShowEditCategoryModal(false);
				}}
				footer={null}
			>
				<EditCategory
					onCreate={handleEdit}
					currentCategory={currentCategory}
				/>
			</Modal>
		</>
	);
};

export default Categories;
