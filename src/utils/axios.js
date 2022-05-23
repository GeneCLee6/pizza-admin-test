import axios from "axios";
import { getToken } from "./authentication";
import { baseURL } from "../configs/config.js";
import { isClient } from "src/utils/helpers";

const service = axios.create({
	baseURL,
	timeout: 10000,
});

// Add a request interceptor
service.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
service.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

const appendAuthToken = (config) => {
	if (!isClient) return { ...config };
	const jwtToken = getToken();
	const Authorization = jwtToken && `Bearer ${jwtToken}`;

	return { ...config, headers: { Authorization, ...config.header } };
};

export const get = (url, config = {}) =>
	service.get(url, appendAuthToken(config));

export const post = (url, data, config = {}) =>
	service.post(url, data, appendAuthToken(config));

export const put = (url, data, config = {}) =>
	service.put(url, data, appendAuthToken(config));

export const patch = (url, data, config = {}) =>
	service.patch(url, data, appendAuthToken(config));

export const del = (url, config = {}) =>
	service.delete(url, appendAuthToken(config));
