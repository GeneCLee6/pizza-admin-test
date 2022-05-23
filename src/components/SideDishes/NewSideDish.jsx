import { Modal, Form, Input, InputNumber, Select } from "antd";

const { Option } = Select;

const NewSideDish = ({ visible, onCreate, onCancel }) => {
	const [form] = Form.useForm();

	return (
		<Modal
			visible={visible}
			title="创建子菜品"
			okText="创建"
			cancelText="取消"
			onCancel={onCancel}
			destroyOnClose
			onOk={() => {
				form.validateFields()
					.then((values) => {
						form.resetFields();
						onCreate(values);
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
		>
			<Form
				form={form}
				layout="vertical"
				preserve={false}
				name="form_in_modal"
				initialValues={{
					sideDishCnName: "",
					sideDishEnName: "",
					type: "",
					price: "",
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

export default NewSideDish;
