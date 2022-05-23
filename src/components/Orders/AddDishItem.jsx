import { Menu, Row, Col, Card, Input } from "antd";
import Image from "next/image";
import useCategory from "src/hooks/useCategory";
import useAddDishItem from "src/hooks/useAddDishItem";
import { priceRounder } from "src/utils/helpers";

const { Search } = Input;
const { Meta } = Card;

const AddDishItem = ({ handleDishChoose }) => {
	const { categories } = useCategory();
	const { setCategoryId, dishes, handleSearch } = useAddDishItem(categories);

	return (
		<div>
			<div className="mb-3 w-50 ">
				<Search
					placeholder="请输入菜名（中文/英文）"
					onSearch={handleSearch}
					size="large"
					allowClear
					enterButton
				/>
			</div>
			<Menu onClick={({ key }) => setCategoryId(key)} mode="horizontal">
				{categories?.map(({ _id, categoryName }) => (
					<Menu.Item key={_id}>{categoryName}</Menu.Item>
				))}
			</Menu>
			<div className="mt-3">
				<div className="site-card-wrapper">
					<Row gutter={[16, 16]}>
						{dishes?.map((i) => (
							<Col key={i._id} span={6}>
								<Card
									hoverable
									onClick={() => {
										handleDishChoose(i);
									}}
									cover={
										i.photo ? (
											<Image
												alt="dish photo"
												src={i.photo}
												width={150}
												height={100}
											/>
										) : null
									}
								>
									<Meta
										title={i.name}
										description={priceRounder(i.prices[0])}
									/>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			</div>
		</div>
	);
};

export default AddDishItem;
