import React from "react";
import { Menu, Dropdown, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import Avatar from "src/components/Avatar";
import useAuth from "src/hooks/useAuth";
import classes from "./style.module.less";

const AvatarDropDown = () => {
	const { handleLogout: onLogout } = useAuth();

	const auth = useSelector((state) => state.auth);

	const { firstName, lastName, email } = auth?.user || {};

	const dispatch = useDispatch();

	const handleLogout = React.useCallback(async () => {
		Modal.confirm({
			title: "确定退出登陆?",
			icon: <ExclamationCircleOutlined />,
			onOk: () => {
				onLogout();
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	}, [dispatch]);

	const menu = (
		<Menu className={classes.menuDropdown}>
			<div className={classes.name}>
				<Avatar size={50} src={auth.avatar} fullName={`${firstName} ${lastName}`} />
				<div className={classes.fullName}>
					<strong>{`${firstName} ${lastName}`}</strong>
					<div className="text-small">{email}</div>
				</div>
			</div>
			<Menu.Divider />
			{/* <Menu.Item key="change">
				<Link href="/change-password">
					<a className={classes.item}>
						<BiKey />
						<span>更改密码</span>
					</a>
				</Link>
			</Menu.Item> */}
			<Menu.Item key="logout">
				<a className={classes.item} onClick={handleLogout}>
					<AiOutlineLogout />
					<span>退出登陆</span>
				</a>
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown overlay={menu} trigger={["click"]}>
			<div style={{ lineHeight: "50px" }}>
				<Avatar
					size={30}
					src={auth.avatar}
					fullName={`${firstName} ${lastName}`}
					style={{
						cursor: "pointer",
					}}
				/>
			</div>
		</Dropdown>
	);
};

export default AvatarDropDown;
