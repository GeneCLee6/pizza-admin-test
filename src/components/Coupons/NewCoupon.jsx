import {
	Form,
	Button,
	Col,
	Row,
	Input,
	Space,
} from "antd";

const NewCoupon = ({ handleCreate, setShowNewCouponDrawer }) => {

	return (
		<Form onFinish={handleCreate} layout="vertical" requiredMark="optional">
			<Row gutter={16}>
				<Col span={24}>
					<Form.Item
						name="description"
						label="Description"
						rules={[
							{
								required: true,
								message: "Please enter a Description",
							},
						]}
					>
						<Input.TextArea
							rows={2}
							placeholder="Please enter a Description"
							showCount
							maxLength={80}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Space>
				<Button htmlType="submit" type="primary">
					Submit
				</Button>
				<Button onClick={() => setShowNewCouponDrawer(false)}>
					Cancel
				</Button>
			</Space>
		</Form>
	);
};

export default NewCoupon;
