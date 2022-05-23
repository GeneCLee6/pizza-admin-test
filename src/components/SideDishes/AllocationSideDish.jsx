import { Modal, Checkbox } from "antd";

const AllocationSideDish = ({
	visible,
	onAllocate,
	onCancel,
	sideDishes,
	selectedDish,
	handleCheckSideDish,
}) => {
	const defaultValue =
		selectedDish?.sideDishes?.map((i) => i.sideDishCnName) || [];
	const checkboxData = sideDishes?.map((i) => i.sideDishCnName);

	return (
		<Modal
			visible={visible}
			title="分配子菜品"
			okText="确定"
			cancelText="取消"
			onCancel={onCancel}
			onOk={onAllocate}
		>
			<Checkbox.Group
				key={defaultValue}
				options={checkboxData}
				defaultValue={defaultValue}
				onChange={handleCheckSideDish}
			/>
		</Modal>
	);
};

export default AllocationSideDish;
