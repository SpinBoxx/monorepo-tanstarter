import { createServerFn } from "@tanstack/react-start";

export const getCurrentUser = createServerFn({ method: "GET" }).handler(
	async () => {
		const { getCurrentUserFromApi } = await import("./user.server");
		return getCurrentUserFromApi();
	},
);