import { Space, Skeleton, Table, Button, Modal, Popconfirm, Input } from "antd";
import * as dayjs from "dayjs";
import useVendor from "src/hooks/useVendor";
import formatDate from "src/utils/format-date";
import NewVendor from "./NewVendor";
import EditVendor from "./EditVendor";

const { Search } = Input;

const Vendors = () => {
	const {
		isLoading,
		error,
		vendors,
		handleCreate,
		handleDelete,
		handleEdit,
		showNewVendorModal,
		setShowNewVendorModal,
		showEditVendorModal,
		setShowEditVendorModal,
		currentVendor,
		setCurrentVendor,
		handleSearch,
	} = useVendor();

	const columns = [
		{
			title: "日期",
			dataIndex: "vendorDate",
			defaultSortOrder: "descend",
			width: "120px",
			align: "center",
			sorter: (a, b) => dayjs(a.vendorDate) - dayjs(b.vendorDate),
			render: (date) => <div>{formatDate(date)}</div>,
		},
		{
			title: "供货商",
			dataIndex: "vendorName",
			align: "center",
		},
		{
			title: "金额",
			dataIndex: "amount",
			width: "65px",
			align: "center",
			sorter: (a, b) => a.amount - b.amount,
			render: (amount) => <div>{`$${amount}`}</div>,
		},
		{
			title: "备注",
			dataIndex: "comment",
			align: "center",
		},
		{
			title: "确认人",
			dataIndex: "staffName",
			align: "center",
		},
		{
			title: "操作",
			render: (_, record) => {
				return (
					<Space size="middle">
						<Button
							type="primary"
							onClick={() => {
								setCurrentVendor(record);
								setShowEditVendorModal(true);
							}}
						>
							编辑
						</Button>
						<Popconfirm
							title="确认删除该记录?"
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
		<div>
			<h1 className="font-weight-bold fs-lg">库存记录</h1>
			<div className="mb-3 w-50 float-right">
				<Search
					placeholder="请输入供应商或确认人"
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
						dataSource={vendors}
					/>
				)}
			</div>
			<div className="mt-3">
				<Button
					onClick={() => setShowNewVendorModal(true)}
					type="primary"
				>
					添加新库存记录
				</Button>
			</div>
			<Modal
				visible={showNewVendorModal}
				title="创建新库存记录"
				okText="创建"
				cancelText="取消"
				destroyOnClose
				onCancel={() => {
					setShowNewVendorModal(false);
				}}
				footer={null}
			>
				<NewVendor handleCreate={handleCreate} />
			</Modal>
			<Modal
				visible={showEditVendorModal}
				title="编辑库存记录"
				okText="确定"
				cancelText="取消"
				destroyOnClose
				onCancel={() => {
					setShowEditVendorModal(false);
				}}
				footer={null}
			>
				<EditVendor
					onCreate={handleEdit}
					currentVendor={currentVendor}
				/>
			</Modal>
		</div>
	);
};

export default Vendors;
