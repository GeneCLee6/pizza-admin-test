import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { Menu } from "antd";
import {
	DashboardOutlined,
	ShoppingCartOutlined,
	ProfileOutlined,
	FormOutlined,
	SwapLeftOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
	const router = useRouter();
	const auth = useSelector((state) => state.auth);
	const [, root, sub] = router.pathname?.split("/");

	const { userType } = auth?.user || {};
	return (
		<Menu
			defaultSelectedKeys={["/"]}
			selectedKeys={["/" + (sub && sub !== "[id]" ? sub : root)]}
			defaultOpenKeys={["/" + root]}
			mode="inline"
			theme="dark"
			style={{
				padding: "15px 0",
			}}
		>
			{userType === "manager" || userType === "admin" ? (
				<>
					<Menu.Item
						key="/dashboard"
						onClick={() => router.push("/dashboard")}
						icon={<DashboardOutlined />}
					>
						<span>Dashboard</span>
					</Menu.Item>
					{/* <SubMenu
						key="sub1"
						icon={<ExperimentOutlined />}
						title="菜品管理"
					>
						<Menu.Item
							key="/dishes"
							onClick={() => router.push("/dishes")}
						>
							菜品
						</Menu.Item>
						<Menu.Item
							key="/side-dishes"
							onClick={() => router.push("/side-dishes")}
						>
							子菜品
						</Menu.Item>
						<Menu.Item
							key="/categories"
							onClick={() => router.push("/categories")}
						>
							分类
						</Menu.Item>
					</SubMenu>*/}
				</>
			) : null}
			<Menu.Item
				key="/ordersUnprint"
				onClick={() => router.push("/ordersUnprint")}
				icon={<ShoppingCartOutlined />}
			>
				<span>未打印订单</span>
			</Menu.Item>
			<Menu.Item
				key="/ordersUnpaid"
				onClick={() => router.push("/ordersUnpaid")}
				icon={<ShoppingCartOutlined />}
			>
				<span>已打印未付款订单</span>
			</Menu.Item>
			<Menu.Item
				key="/new-order"
				onClick={() => router.push("/new-order")}
				icon={<FormOutlined />}
			>
				<span>点单</span>
			</Menu.Item>
			{/* <Menu.Item
				key="/third-party-order"
				onClick={() => router.push("/third-party-order")}
				icon={<ApartmentOutlined />}
			>
				<span>第三方订单</span>
			</Menu.Item> */}
			<Menu.Item
				key="/transactions"
				onClick={() => router.push("/transactions")}
				icon={<ProfileOutlined />}
			>
				<span>交易历史</span>
			</Menu.Item>
			<Menu.Item key="/coupons" onClick={() => router.push("/coupons")}>
				<span>优惠券</span>
			</Menu.Item>
			{userType === "manager" || userType === "admin" ? (
				<>
					{/* <Menu.Item
						key="/users"
						onClick={() => router.push("/users")}
						icon={<UsergroupAddOutlined />}
					>
						<span>用户</span>
					</Menu.Item> */}
					{/* <Menu.Item
						key="/vendors"
						onClick={() => router.push("/vendors")}
						icon={<TableOutlined />}
					>
						<span>库存</span> 
					</Menu.Item>*/}
					<Menu.Item
						key="/operations" //HOU
						onClick={() => router.push("/operations")}
						icon={<SwapLeftOutlined />}
					>
						<span>运营模式</span>
					</Menu.Item>
				</>
			) : null}
		</Menu>
	);
};

export default Sidebar;
