import { createServerFn } from "@tanstack/react-start";
import { loginInputSchema } from "../../schemas/login.schema";
import { apiClient } from "@/lib/server/tuyau";


export const login = createServerFn({ method: "POST" })
	.inputValidator(loginInputSchema)
	.handler(async ({ data }) => {

		const [response, error] = await apiClient.api.auth.accessTokens.store({body: data}).safe()

		if(error){
			console.log(error);
			
		}

		if(!response || !response.data.token){
			throw new Error("Login failed");
		}

	
		return { user: response.data };
	});
