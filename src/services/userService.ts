import { fetchAPI } from "@/lib/api";
import type { User, UpdateProfilePayload } from "@/types/users";

export const getUserProfileService = async (): Promise<User> => {
  return fetchAPI<User>("/users/me");
};

export const postProfileService = async (
  payload: UpdateProfilePayload,
): Promise<UpdateProfilePayload> => {
  return fetchAPI<UpdateProfilePayload>("/users/profile", {
    method: "PATCH",
    body: payload,
  });
};
