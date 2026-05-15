import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { z } from "zod";

const loginInputSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

export const login = createServerFn({ method: "POST" })
	.inputValidator(loginInputSchema)
	.handler(async ({ data }) => {
		const { loginWithApi } = await import("./auth.server");
		const result = await loginWithApi(data);

		if ("error" in result) {
			setResponseStatus(result.status);
			throw new Error(result.error);
		}

		return { user: result.user };
	});

export const logout = createServerFn({ method: "POST" }).handler(async () => {
	const { logoutWithApi } = await import("./auth.server");
	return logoutWithApi();
});