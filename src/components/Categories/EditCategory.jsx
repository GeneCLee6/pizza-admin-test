import { Form, Input, InputNumber, Button, Switch } from "antd";
import { useEffect } from "react";

const EditCategory = ({ onCreate, currentCategory }) => {
	const [form] = Form.useForm();
	const { categoryCnName, categoryEnName, priority, offShelf } =
		currentCategory || {};

	useEffect(() => {
		form.resetFields();
	}, [currentCategory, form]);

	return (
		<Form
			form={form}
			onFinish={() => {
				form.validateFields()
					.then((values) => {
						//form.resetFields();
						onCreate(values);
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
			layout="vertical"
			name="form_in_modal"
			initialValues={{
				categoryCnName,
				categoryEnName,
				priority,
				offShelf,
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
			<Form.Item name="offShelf" label="下架" valuePropName="checked">
				<Switch checkedChildren="是" unCheckedChildren="否" />
			</Form.Item>
			<Form.Item
				name="priority"
				label="优先级"
				rules={[
					{
						required: false,
						message: "数字越大，优先级越高",
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
				提交
			</Button>
		</Form>
	);
};

export default EditCategory;
