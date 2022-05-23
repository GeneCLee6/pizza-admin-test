import { Modal, Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";

const { Option } = Select;

const EditSideDish = ({ visible, onEdit, onCancel, currentSideDish }) => {
	const [form] = Form.useForm();
	const { sideDishCnName, sideDishEnName, type, price } =
		currentSideDish || {};

	useEffect(() => {
		form.resetFields();
	}, [currentSideDish, form, visible]);

	return (
		<Modal
			visible={visible}
			title="编辑子菜品"
			okText="确定"
			cancelText="取消"
			onCancel={onCancel}
			onOk={() => {
				form.validateFields()
					.then((values) => {
						form.resetFields();
						onEdit(values);
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
		>
			<Form
				form={form}
				layout="vertical"
				name="form_in_modal"
				initialValues={{
					sideDishCnName,
					sideDishEnName,
					type,
					price,
				}}
			>
				<Form.Item
					name="sideDishCnName"
					label="中文名"
					rules={[
						{
							required: true,
							message: "请输入子菜品名称（中文）",
						},
					]}
				>
					<Input placeholder="请输入子菜品名称（中文）" />
				</Form.Item>
				<Form.Item
					name="sideDishEnName"
					label="英文名"
					rules={[
						{
							required: true,
							message: "请输入子菜品名称（英文）",
						},
					]}
				>
					<Input placeholder="请输入子菜品名称（英文）" />
				</Form.Item>
				<Form.Item
					name="type"
					label="类别"
					rules={[
						{
							required: true,
							message: "请选择子菜品类别",
						},
					]}
				>
					<Select placeholder="请选择子菜品类别">
						<Option value="荤">荤</Option>
						<Option value="素">素</Option>
					</Select>
				</Form.Item>
				<Form.Item
					name="price"
					label="价格"
					rules={[
						{
							required: true,
							message: "请输入子菜品价格",
						},
					]}
				>
					<InputNumber
						style={{ width: 160 }}
						min={0}
						max={100}
						placeholder="请输入子菜品价格"
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default EditSideDish;
