import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { useSelector } from "react-redux";
import Image from "next/image";
import { Layout, BackTop, Button, notification } from "antd";
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	DownloadOutlined,
} from "@ant-design/icons";
import Sidebar from "src/components/Layout/Sidebar";
import Header from "src/components/Layout/Header";
import Footer from "src/components/Layout/Footer";
import AvatarDropDown from "src/components/AvatarDropDown";
import Notifications from "src/components/Notifications";
import { requestSendExcelReport } from "src/services/orders";

import classes from "./style.module.less";

const { Content, Sider } = Layout;

const MainLayout = (props) => {
	const { children } = props;

	const [collapsed, setCollapsed] = useState(false);
	const [mobiShow, setMobiShow] = useState(false);
	const [broken, setBroken] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const auth = useSelector((state) => state.auth);
	const { userType } = auth?.user || {};

	useEffect(() => {
		const handleRouteChange = (url) => {
			setMobiShow(false);
		};

		Router.events.on("routeChangeStart", handleRouteChange);
		return () => {
			Router.events.off("routeChangeStart", handleRouteChange);
		};
	}, []);

	const handleToggle = () => {
		if (broken) {
			setMobiShow(!mobiShow);
		} else {
			setCollapsed(!collapsed);
		}
	};

	const handleExport = async () => {
		setIsLoading(true);
		const res = await requestSendExcelReport();
		let { status } = res;
		if (status === true) {
			notification.success({
				message: "excel发送成功",
				duration: 0,
			});
			setIsLoading(false);
		} else {
			notification.error({
				message: "excel发送失败",
			});
			setIsLoading(false);
		}
	};

	return (
		<>
			<Layout
				style={{
					minHeight: "100vh",
				}}
				className={classes.root}
			>
				<Sider
					trigger={null}
					collapsible
					collapsed={collapsed && !broken}
					className={classes.sidebar}
					breakpoint="lg"
					onBreakpoint={(val) => {
						setBroken(val);
						if (val) {
							setCollapsed(false);
							setMobiShow(false);
						}
					}}
					style={{
						left: broken && !mobiShow ? -200 : 0,
					}}
				>
					<Link href="/orders">
						<a>
							<div className={classes.logo}>
								<img
									src="/images/logo.png"
									//src="http://www.napoletanapizza.com/image/data/napole_logo.png"
									alt="Logo"
								/>
								{/* {!collapsed && <span>Napoletana Pizza</span>} */}
							</div>
						</a>
					</Link>
					<Sidebar />
				</Sider>
				<Layout
					className={classes.siteLayout}
					style={{
						paddingLeft: broken ? 0 : collapsed ? 50 : 200,
					}}
				>
					<Header
						style={{
							left: broken ? 0 : collapsed ? 50 : 200,
						}}
					>
						{React.createElement(
							collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
							{
								className: classes.trigger,
								onClick: handleToggle,
							}
						)}
						{broken && (
							<Link href="/">
								<a>
									<div className={classes.logoCenter}>
										<img
											src="/images/logo.png"
											//src="http://www.napoletanapizza.com/image/data/napole_logo.png"
											alt="Logo"
											width={98}
											height={31}
										/>
										{/* <span>Napoletana Pizza</span> */}
									</div>
								</a>
							</Link>
						)}
						<div className={classes.headerRight}>
							{userType === "manager" || userType === "admin" ? (
								<Button
									type="primary"
									shape="circle"
									icon={<DownloadOutlined />}
									size="large"
									loading={isLoading}
									onClick={() => handleExport()}
								/>
							) : null}
							<Notifications />
							<AvatarDropDown />
						</div>
					</Header>
					{mobiShow && broken && (
						<div
							className={classes.overlay}
							onClick={() => setMobiShow(false)}
						/>
					)}
					<Content
						style={{
							margin: 32,
						}}
					>
						{children}
					</Content>
					<Footer />
				</Layout>
			</Layout>
			<BackTop />
		</>
	);
};

export default MainLayout;
