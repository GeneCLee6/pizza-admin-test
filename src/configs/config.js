import BASE_URL from "./env";

export const baseURL =
	process.env.NODE_ENV === "production" ? BASE_URL.PRD : BASE_URL.DEV;
