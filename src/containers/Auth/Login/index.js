import React from "react";
//import Link from "next/link";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import useAuth from "src/hooks/useAuth";

import Logo from "src/components/Layout/Logo";
import classes from "./style.module.less";

const Login = () => {
	const { loading, handleLogin } = useAuth();

	return (
		<div className={classes.wrapper}>
			<div className={classes.left}>
				<div className={classes.leftOverlay} />
				<div className={classes.leftContent}>
					<div className="ml-4 flex-1">
						<h1 className="pt-0 text-white">Napoletana Pizza Admin System</h1>
					</div>
				</div>
			</div>
			<div className={classes.right}>
				<div className="d-flex justify-content-center align-content-center flex-1 flex-column">
					<Form
						name="normal_login"
						className="login-form"
						initialValues={{
							remember: true,
						}}
						onFinish={(values) => handleLogin(values)}
						style={{
							width: 350,
							padding: 20,
							margin: "0 auto 40px",
							borderRadius: 4,
							background: "#fff",
						}}
						size="large"
					>
						<div className="text-center mb-5">
							<Logo width={150} height={150} />
						</div>
						<Form.Item
							name="email"
							rules={[
								{
									type: "email",
									message: "请输入邮箱地址!",
								},
								{
									required: true,
									message: "请输入邮箱地址!",
								},
							]}
						>
							<Input
								prefix={
									<UserOutlined className="site-form-item-icon" />
								}
								placeholder="邮箱"
							/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: "请输入密码!",
								},
							]}
						>
							<Input.Password
								prefix={
									<LockOutlined className="site-form-item-icon" />
								}
								type="password"
								placeholder="密码"
							/>
						</Form.Item>
						{/* <Form.Item>
							<div className="text-center">
								<Link href="/forgot-password">
									<a className="login-form-forgot">
										忘记密码
									</a>
								</Link>
							</div>
						</Form.Item> */}

						<Button
							type="primary"
							block
							htmlType="submit"
							className="login-form-button"
							loading={loading}
						>
							登陆
						</Button>
					</Form>
				</div>
				<div className="py-2">
					<strong className="text-primary">Napoletana Pizza</strong>
					<span> 2021 © All Rights Reserved.</span>
				</div>
			</div>
		</div>
	);
};

export default Login;
