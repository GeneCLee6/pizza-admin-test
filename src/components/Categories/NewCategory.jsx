import { Form, Input, InputNumber, Button } from "antd";

const NewCategory = ({ handleCreate }) => {
	const [form] = Form.useForm();

	return (
		<Form
			form={form}
			onFinish={() => {
				form.validateFields()
					.then((values) => {
						form.resetFields();
						handleCreate(values);
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
			layout="vertical"
			name="form_in_modal"
			initialValues={{
				categoryCnName: "",
				categoryEnName: "",
				priority: 0,
			}}
		>
			<Form.Item
				name="categoryCnName"
				label="中文名"
				rules={[
					{
						required: true,
						message: "请输入分类名称（中文）",
					},
				]}
			>
				<Input placeholder="请输入分类名称（中文）" />
			</Form.Item>
			<Form.Item
				name="categoryEnName"
				label="英文名"
				rules={[
					{
						required: true,
						message: "请输入分类名称（英文）",
					},
				]}
			>
				<Input placeholder="请输入分类名称（英文）" />
			</Form.Item>
			<Form.Item
				name="priority"
				label="优先级"
				rules={[
					{
						required: true,
						message: "请输入分类优先级（默认0，数字越大，优先级越高）",
					},
				]}
			>
				<InputNumber
					style={{ width: 160 }}
					min={0}
					max={100}
					placeholder="数字越大，优先级越高"
				/>
			</Form.Item>
			<Button type="primary" htmlType="submit">
				创建
			</Button>
		</Form>
	);
};

export default NewCategory;
