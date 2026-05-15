import type { User } from "api/types";
import {
	clearAuthToken,
	getAuthToken,
	setAuthToken,
} from "@/lib/server/session";
import { apiClient } from "@/lib/server/tuyau";

type ApiErrorResponse = {
	error?: string;
	message?: string;
};

type LoginApiData = {
	token: string;
	user: User;
};

function getApiError(payload: unknown, fallback: string) {
	if (!payload || typeof payload !== "object") return fallback;
	const response = payload as ApiErrorResponse;
	return response.error ?? response.message ?? fallback;
}

export async function loginWithApi(data: { email: string; password: string }) {
	const [payload, error] = await apiClient
		.request("auth.access_tokens.store", {
			body: data,
		})
		.safe();

	if (error || !payload.data.token) {
		return {
			error: getApiError(error?.response, "Connexion impossible."),
			status: error?.status ?? 502,
		} as const;
	}

	const session = payload.data satisfies LoginApiData;
	setAuthToken(session.token);

	return { user: session.user } as const;
}

export async function logoutWithApi() {
	const token = getAuthToken();
	if (token) {
		await apiClient
			.request("profile.access_tokens.destroy", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.safe()
			.catch(() => null);
	}

	clearAuthToken();
	return { message: "Deconnecte." };
}
