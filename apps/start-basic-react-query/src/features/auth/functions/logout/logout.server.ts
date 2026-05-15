import { apiClient } from "@/lib/server/tuyau";

export default async function logoutServer(){
  const res = await apiClient.api.profile.accessTokens.destroy({}).safe()
  return res;
}