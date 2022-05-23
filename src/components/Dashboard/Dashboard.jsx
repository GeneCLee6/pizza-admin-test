import { Row, Col, Card, Space, Skeleton } from "antd";
import ReactECharts from "echarts-for-react";
import useStatics from "../../hooks/useStatics.js";
import classes from "./style.module.less";

const Dashboard = () => {
	const { isLoading, error, summary, trends } = useStatics();

	const options = {
		tooltip: {
			trigger: "axis",
		},
		grid: {
			left: "2%",
			right: "4%",
			bottom: "3%",
			containLabel: true,
		},
		xAxis: {
			type: "category",
			boundaryGap: false,
			data: trends?.total?.dateLabel,
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "总订单",
				type: "line",
				stack: "Total",
				data: trends?.total?.data,
			},
		],
	};

	return (
		<>
			{error && <div>Something went wrong ...</div>}
			<Space />

			{isLoading ? (
				<Skeleton active />
			) : (
				<>
					<Row justify="space-between" className={classes.salesRow}>
						<Col span={5}>
							<Card>
								<h4 className={classes.title}>今日销售额</h4>
								<h2 className="fs-xl">{`$ ${summary?.today?.amount}`}</h2>
								<h4>{`${summary?.today?.orderQuantity}单`}</h4>
							</Card>
						</Col>
						<Col span={5}>
							<Card>
								<h4 className={classes.title}>本周销售额</h4>
								<h2 className="fs-xl">{`$ ${summary?.week?.amount}`}</h2>
								<h4>{`${summary?.week?.orderQuantity}单`}</h4>
							</Card>
						</Col>
						<Col span={5}>
							<Card>
								<h4 className={classes.title}>本月销售额</h4>
								<h2 className="fs-xl">{`$ ${summary?.month?.amount}`}</h2>
								<h4>{`${summary?.month?.orderQuantity}单`}</h4>
							</Card>
						</Col>
						<Col span={5}>
							<Card>
								<h4 className={classes.title}>总计销售额</h4>
								<h2 className="fs-xl">{`$ ${summary?.total?.amount}`}</h2>
								<h4>{`${summary?.total?.orderQuantity}单`}</h4>
							</Card>
						</Col>
					</Row>

					<div className={classes.lineChart}>
						<h2>近七日趋势</h2>
						<ReactECharts
							style={{ height: "300px", width: "100%" }}
							option={options}
							theme="my_theme"
						/>
					</div>
				</>
			)}
		</>
	);
};

export default Dashboard;
