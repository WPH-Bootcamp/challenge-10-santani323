import { fetchAPI } from "@/lib/api";
import { AuthRegisterResponse } from "@/types/auth";

export async function postRegisterService(data: any) {
  return fetchAPI<AuthRegisterResponse>("auth/register", {
    method: "POST",
    body: data,
  });
}
