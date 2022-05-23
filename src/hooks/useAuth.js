import { useState, useEffect } from "react";
import Router from "next/router";
import AuthStorage from "src/utils/auth-storage";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { requestUserLogin } from "src/services/users";
import { setToken, deleteToken } from "src/utils/authentication";

const useAuth = () => {
	const [loading, setLoading] = useState(false);

	const auth = useSelector((state) => state.auth);

	const { userType } = auth?.user || {};

	const handleLogin = async (values) => {
		try {
			setLoading(true);

			const response = await requestUserLogin(values);
			AuthStorage.value = {
				token: response?.token,
				userId: response?.user?._id,
				role: response?.user?.userType,
			};
			setToken(response?.token);
			if (response?.user?.userType === "staff") {
				Router.push("/orders");
			} else {
				Router.push("/");
			}
		} catch (error) {
			console.log(error);
			notification.error({
				message: "登陆失败",
				description: error?.response?.data?.message,
			});
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = () => {
		AuthStorage.destroy();
		deleteToken();
		Router.reload();
	};

	useEffect(() => {
		if (AuthStorage.loggedIn) {
			if (userType === "staff") {
				Router.push("/orders");
			} else {
				Router.push("/");
			}
		}
	}, [userType]);

	return { loading, handleLogin, handleLogout };
};

export default useAuth;
