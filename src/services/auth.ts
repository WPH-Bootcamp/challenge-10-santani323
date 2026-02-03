import { fetchAPI } from "@/lib/api";
import type {
  AuthRegisterPayload,
  AuthRegisterResponse,
  AuthLoginPayload,
  AuthLoginResponse,
} from "@/types/auth";

/**
 * Register service
 */
export const postRegisterService = async (
  payload: AuthRegisterPayload,
): Promise<AuthRegisterResponse> => {
  return fetchAPI<AuthRegisterResponse, AuthRegisterPayload>("/auth/register", {
    method: "POST",
    body: payload,
  });
};

/**
 * Login service
 */
export const postLoginService = async (
  payload: AuthLoginPayload,
): Promise<AuthLoginResponse> => {
  return fetchAPI<AuthLoginResponse, AuthLoginPayload>("/auth/login", {
    method: "POST",
    body: payload,
  });
};
