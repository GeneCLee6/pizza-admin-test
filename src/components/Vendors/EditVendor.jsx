import { Form, Input, InputNumber, Button, AutoComplete } from "antd";
import { useEffect } from "react";
import * as dayjs from "dayjs";
import DatePicker from "src/components/Forms/DatePicker";

const EditVendor = ({ onCreate, currentVendor }) => {
	const [form] = Form.useForm();
	const { vendorDate, vendorName, amount, comment, staffName } =
		currentVendor || {};

	useEffect(() => {
		form.resetFields();
	}, [currentVendor, form]);

	return (
		<Form
			form={form}
			onFinish={() => {
				form.validateFields()
					.then((values) => {
						form.resetFields();
						onCreate(values);
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
			layout="vertical"
			name="form_in_modal"
			initialValues={{
				vendorDate: dayjs(vendorDate),
				vendorName,
				amount,
				comment,
				staffName,
			}}
		>
			<Form.Item
				name="vendorName"
				label="供应商"
				rules={[
					{
						required: true,
						message: "请输入供应商名",
					},
				]}
			>
				<Input placeholder="请输入供应商名" />
			</Form.Item>
			<Form.Item
				name="vendorDate"
				label="日期"
				rules={[
					{
						type: "object",
						required: true,
						message: "请选择供货日期",
					},
				]}
			>
				<DatePicker />
			</Form.Item>
			<Form.Item
				name="amount"
				label="金额"
				rules={[
					{
						required: true,
						message: "请输入金额",
					},
				]}
			>
				<InputNumber
					style={{ width: 160 }}
					min={0}
					max={100000}
					placeholder="请输入金额"
				/>
			</Form.Item>
			<Form.Item
				name="staffName"
				label="确认人"
				rules={[
					{
						required: true,
						message: "请输入确认人姓名",
					},
				]}
			>
				<AutoComplete
					placeholder="请输入确认人姓名"
					options={[
						{ value: "zyz" },
						{ value: "cici" },
						{ value: "ming" },
					]}
				/>
			</Form.Item>
			<Form.Item name="comment" label="备注">
				<Input.TextArea
					rows={2}
					placeholder="请输入备注"
					showCount
					maxLength={100}
				/>
			</Form.Item>
			<Button type="primary" htmlType="submit">
				提交
			</Button>
		</Form>
	);
};

export default EditVendor;
