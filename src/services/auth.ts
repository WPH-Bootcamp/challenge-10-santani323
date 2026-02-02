import { fetchAPI } from "@/lib/api";
import {
  AuthRegisterResponse,
  AuthRegisterPayload,
  AuthLoginPayload, 
} from "@/types/auth";

export async function postRegisterService(
  data: AuthRegisterPayload,
): Promise<AuthRegisterResponse> {
  return fetchAPI<AuthRegisterResponse, AuthRegisterPayload>("/auth/register", {
    method: "POST",
    body: data,
  });
}

export async function postLoginService(
  data: AuthLoginPayload,
): Promise<AuthRegisterResponse> {
  return fetchAPI<AuthRegisterResponse, AuthLoginPayload>("/auth/login", {
    method: "POST",
    body: data,
  });
}
