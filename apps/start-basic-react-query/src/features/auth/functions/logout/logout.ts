import { apiClient } from "@/lib/server/tuyau";
import { createServerFn } from "@tanstack/react-start";
import { logoutWithApi } from "../auth.server";
import { clearAuthToken } from "@/lib/server/session";
import logoutServer from "./logout.server";

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  const [response, error] = await logoutServer()
   
  if(error){
    console.log(JSON.stringify(error.response, null, 2));
    throw new Error("Logout failed");
  }

  if(!response){
    console.log("error response");
    throw new Error("Logout failed");
  }

  clearAuthToken();

  return { message: "Deconnecte." };

});