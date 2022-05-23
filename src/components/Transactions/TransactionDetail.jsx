import { Divider, Col, Row, Button } from "antd";
import formatDate from "src/utils/format-date";
import useThrottle from "src/hooks/useThrottle";
import usePrint from "src/hooks/usePrint";
import { throttle } from "src/utils/helpers";
import classes from "./style.module.less";

const DescriptionItem = ({ title, content }) => (
	<div className={classes.wrapper}>
		<p className={classes.label}>{title}:</p>
		{content}
	</div>
);

const TransactionDetail = ({ currentTransaction }) => {
	const {
		_id,
		orderNum,
		dishes,
		comment,
		totalPrice,
		createdAt,
		updatedAt,
		payMethod,
		status,
		orderType,
	} = currentTransaction;

	const { handlePrint } = usePrint();

	return (
		<div>
			<p className={classes.siteDescription} style={{ marginBottom: 24 }}>
				订单详情
			</p>
			<p className={classes.siteDescription}>基本信息</p>
			<Row>
				<Col span={12}>
					<DescriptionItem title="订单号" content={orderNum} />
				</Col>
				<Col span={12}>
					<DescriptionItem title="订单状态" content={status} />
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title="时间"
						content={formatDate(createdAt)}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem
						title="Update Time"
						content={formatDate(updatedAt)}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title="订单总额"
						content={`$${totalPrice}`}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem
						title="订单类型"
						content={orderType || "-"}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={8}>
					<DescriptionItem
						title="支付方式"
						content={payMethod || "-"}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<DescriptionItem title="备注" content={comment} />
				</Col>
			</Row>
			<Divider />
			<p className={classes.siteDescription}>菜品信息</p>
			<Row>
				<Col span={24}>
					{dishes?.map(
						({ _id, dishName, extraToppings, secondHalfPizza }) => {
							return (
								<div key={_id}>
									<div className="fw-600">{`pizza:${dishName}`}</div>
									<div className="fw-600">{`second pizza:${secondHalfPizza}`}</div>
									{
										<div className="secondary fs-xs">
											Extra Toppings:
											{extraToppings.map((i) => {
												return ` ${i} `;
											})}
										</div>
									}
								</div>
							);
						}
					)}
				</Col>
			</Row>
			<Divider />
			<p className={classes.siteDescription}>打印小票</p>
			<Row>
				<Col span={8}>
					<Button
						// disabled={disableBtn}
						onClick={useThrottle(() => handlePrint(_id, "cn"), 500)}
					>
						中文
					</Button>
				</Col>
				<Col span={8}>
					<Button
						// disabled={disableBtn}
						onClick={useThrottle(() => handlePrint(_id, "en"), 500)}
					>
						英文
					</Button>
				</Col>
				<Col span={8}>
					<Button
						onClick={throttle(() => handlePrint(_id, "kitchen"))}
						// disabled={disableBtn}
						type="dashed"
					>
						打印厨房小票
					</Button>
				</Col>
			</Row>
		</div>
	);
};

export default TransactionDetail;
