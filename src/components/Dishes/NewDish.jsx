import { useState } from "react";
import {
	Form,
	Button,
	Col,
	Row,
	Input,
	Select,
	Switch,
	Divider,
	InputNumber,
	Upload,
	Space,
	notification,
} from "antd";
import useCategory from "src/hooks/useCategory";
import { baseURL } from "src/configs/config";
import { UploadOutlined } from "@ant-design/icons";
import classes from "./style.module.less";

const { Option } = Select;

const NewDish = ({ handleCreate, setShowNewDishDrawer }) => {
	const { categoriesData } = useCategory();

	const [checkHasStock, setCheckHasStock] = useState(false);

	const normFile = (e) => {
		const { error } = e?.file || {};
		if (error) {
			const { message } = e?.file?.response || {};
			notification.error({
				message: "上传失败",
				description: message,
			});
			return;
		}
		if (Array.isArray(e)) {
			return e;
		}
		const arr = [];
		arr.push(e.fileList[e.fileList.length - 1]);
		return e && arr;
	};

	return (
		<Form onFinish={handleCreate} layout="vertical" requiredMark="optional">
			<p className={classes.subTitle}>基本信息</p>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						name="dishCnName"
						label="中文名"
						rules={[
							{
								required: true,
								message: "请输入菜品名称（中文）",
							},
						]}
					>
						<Input placeholder="请输入菜品名称（中文）" />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						name="dishEnName"
						label="英文名"
						rules={[
							{
								required: true,
								message: "请输入菜品名称（英文）",
							},
						]}
					>
						<Input placeholder="请输入菜品名称（英文）" />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						name="category"
						label="菜品类别"
						rules={[
							{
								required: true,
								message: "请选择菜品类别",
							},
						]}
					>
						<Select placeholder="请选择菜品类别">
							{categoriesData?.map((i) => (
								<Option key={i._id} value={i.categoryCnName}>
									{i.categoryCnName}
								</Option>
							))}
						</Select>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						name="spiceLevel"
						label="辣度"
						rules={[
							{
								required: true,
								message: "请选择菜品辣度",
							},
						]}
					>
						<Select placeholder="请选择菜品辣度">
							<Option value="0">无</Option>
							<Option value="1">微辣</Option>
							<Option value="2">中辣</Option>
							<Option value="3">重辣</Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={24}>
					<Form.Item
						name="cnDescription"
						label="描述（中文）"
						rules={[
							{
								required: false,
								message: "请输入菜品描述信息（中文）",
							},
						]}
					>
						<Input.TextArea
							rows={2}
							placeholder="请输入菜品描述信息（中文）(可选)"
							showCount
							maxLength={80}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={24}>
					<Form.Item
						name="enDescription"
						label="描述（英文）"
						rules={[
							{
								required: false,
								message: "请输入菜品描述信息（英文）",
							},
						]}
					>
						<Input.TextArea
							rows={2}
							placeholder="请输入菜品描述信息（英文）"
							showCount
							maxLength={80}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={24}>
					<Form.Item
						name="photo"
						label="图片（最大尺寸5M，支持jpg, jpeg, png格式）"
						valuePropName="fileList"
						getValueFromEvent={normFile}
					>
						<Upload
							name="image"
							action={`${baseURL}/dishes/fileUpload`}
							listType="picture"
							maxCount={1}
						>
							<Button icon={<UploadOutlined />}>点击上传</Button>
						</Upload>
					</Form.Item>
				</Col>
			</Row>
			<Divider />

			<p className={classes.subTitle}>价格</p>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						name="price"
						label="原价"
						rules={[
							{
								required: true,
								message: "请输入菜品价格",
							},
						]}
					>
						<InputNumber
							style={{ width: 160 }}
							addonBefore="$"
							placeholder="请输入菜品价格"
							min="0"
							max="999"
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						name="discount"
						label="折扣"
						rules={[
							{
								required: false,
								message: "请输入菜品名称（中文）",
							},
						]}
					>
						<InputNumber
							style={{ width: 160 }}
							placeholder="请输入菜品折扣 (可选)"
							min="0"
							max="1"
							step="0.1"
						/>
					</Form.Item>
				</Col>
			</Row>
			<Divider />

			<p className={classes.subTitle}>其他信息</p>
			<Row gutter={16}>
				<Col span={8}>
					<Form.Item
						name="isNewDish"
						label="新品"
						valuePropName="checked"
					>
						<Switch checkedChildren="是" unCheckedChildren="否" />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item
						name="isRecommend"
						label="推荐"
						valuePropName="checked"
					>
						<Switch checkedChildren="是" unCheckedChildren="否" />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item
						name="hasSideDish"
						label="子菜品"
						valuePropName="checked"
					>
						<Switch checkedChildren="是" unCheckedChildren="否" />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={8}>
					<Form.Item
						name="hasSpecification"
						label="规格"
						valuePropName="checked"
					>
						<Switch checkedChildren="是" unCheckedChildren="否" />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Row>
						<Form.Item
							name="hasStock"
							label="库存"
							valuePropName="checked"
						>
							<Switch
								checkedChildren="有"
								unCheckedChildren="无"
								onChange={() =>
									setCheckHasStock(!checkHasStock)
								}
							/>
						</Form.Item>
					</Row>
				</Col>
				<Col span={8}>
					<Form.Item name="stock" label="库存量">
						<InputNumber
							min={0}
							max={999}
							disabled={!checkHasStock}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={8}>
					<Form.Item
						name="offShelf"
						label="下架"
						valuePropName="checked"
					>
						<Switch checkedChildren="是" unCheckedChildren="否" />
					</Form.Item>
				</Col>
			</Row>
			<Divider />

			<Space>
				<Button htmlType="submit" type="primary">
					Submit
				</Button>
				<Button onClick={() => setShowNewDishDrawer(false)}>
					Cancel
				</Button>
			</Space>
		</Form>
	);
};

export default NewDish;
