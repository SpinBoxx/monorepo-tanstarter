import {
	deleteCookie,
	getCookie,
	setCookie,
} from "@tanstack/react-start/server";

const AUTH_COOKIE_NAME = "start_basic_api_token";
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function getAuthToken() {
	return getCookie(AUTH_COOKIE_NAME) ?? null;
}

export function setAuthToken(token: string) {
	setCookie(AUTH_COOKIE_NAME, token, {
		httpOnly: true,
		maxAge: AUTH_COOKIE_MAX_AGE,
		path: "/",
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
	});
}

export function clearAuthToken() {
	deleteCookie(AUTH_COOKIE_NAME, {
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
	});
}
