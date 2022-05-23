import React from "react";

import { useDispatch } from "react-redux";
import useAsync from "react-use/lib/useAsync";

import AuthStorage from "src/utils/auth-storage";
import Link from "next/link";

import Image from "next/image";

import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { actionLogout, actionForgotPassword } from "src/redux/actions/auth";

import classes from "./style.module.less";

const ForgotPassword = (props) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = React.useState(false);
	const [sent, setSent] = React.useState(false);

	useAsync(async () => {
		if (AuthStorage.loggedIn) {
			await dispatch(await actionLogout());
		}
	}, []);

	const onFinish = async (values) => {
		try {
			setLoading(true);
			await dispatch(
				await actionForgotPassword({
					...values,
				})
			);

			setSent(true);
		} finally {
			setLoading(false);
		}
	};

	if (sent) {
		return (
			<div className={classes.wrapper}>
				<div className={classes.left}>
					<div className={classes.leftOverlay} />
					<div className={classes.leftContent}>
						<div className="d-flex justify-content-center align-content-center flex-1 flex-column">
							<div
								style={{
									width: 350,
									margin: "0 auto 40px",
									borderRadius: 4,
									background: "#fff",
									padding: "40px 20px",
									color: "#000",
								}}
							>
								<div className="text-center mb-5">
									<Image
										src="/images/logo.png"
										//src="http://www.napoletanapizza.com/image/data/napole_logo.png"
										alt="Logo"
										width={150}
										height={150}
									/>
								</div>

								<p className="text-center mt-3 text-black">
									An email has been sent to your email address
									to reset your password. Please check your
									email and reset your password before logging
									in.
								</p>

								<div className="text-center">
									<Link href="/login">
										<Button
											type="primary"
											className="mt-3"
											loading={loading}
										>
											Login
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={classes.wrapper}>
			<div className={classes.left}>
				<div className={classes.leftOverlay} />
				<div className={classes.leftContent}>
					<div className="d-flex justify-content-center align-content-center flex-1 flex-column">
						<Form
							name="normal_login"
							className="login-form"
							initialValues={{
								remember: true,
							}}
							onFinish={onFinish}
							style={{
								width: 350,
								margin: "40px auto 40px",
								borderRadius: 4,
								background: "#fff",
								padding: "40px 20px",
							}}
							size="large"
						>
							<div className="text-center mb-5">
								<Image
									src="/images/logo.png"
									//src="http://www.napoletanapizza.com/image/data/napole_logo.png"
									alt="Logo"
									width={150}
									height={150}
								/>
							</div>
							<p className="text-center mb-3">
								输入你的电子邮件地址。我们会发送给你一个链接，让你重置你的密码。
							</p>

							<Form.Item
								name="email"
								rules={[
									{
										type: "email",
										message:
											"The input is not valid E-mail!",
									},
									{
										required: true,
										message: "Please input your E-mail!",
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
							<Button
								type="primary"
								block
								htmlType="submit"
								className="login-form-button"
								loading={loading}
							>
								重制密码
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
