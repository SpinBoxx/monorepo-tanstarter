import { clearAuthToken, getAuthToken } from "@/lib/server/session";
import { apiClient } from "@/lib/server/tuyau";

export async function getCurrentUserFromApi() {
	const token = getAuthToken();
	if (!token) return null;

	const [payload, error] = await apiClient
		.request("profile.profile.show", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.safe();

	if (error?.status === 401) {
		clearAuthToken();
		return null;
	}

	if (error) {
		throw new Error("Profil indisponible.");
	}

	return payload.data;
}
