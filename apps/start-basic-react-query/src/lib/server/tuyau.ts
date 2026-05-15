import type { Tuyau } from "@tuyau/core/client";
import { createTuyau } from "@tuyau/core/client";
import type { InferRoutes } from "@tuyau/core/types";
import { registry } from "api/registry";
import { getAuthToken } from "./session";

type ApiRegistry = typeof registry;

function getApiBaseUrl() {
	const url = process.env.API_URL!;
	return url.replace(/\/+$/, "");
}

export const apiClient: Tuyau<
	ApiRegistry,
	InferRoutes<ApiRegistry>
> = createTuyau({
	baseUrl: getApiBaseUrl(),
	registry,
	credentials: "include",
	hooks: {
	 beforeRequest: [
      (request) => {
        const token = getAuthToken()
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      }
    ]
	},
	headers: { Accept: "application/json" },
	redirect: "manual",
});
