import { fetchAPI } from "@/lib/api";
import type { User } from "@/types/users";

export const getUserProfileService = async (): Promise<User> => {
  return fetchAPI<User>("/users/me");
};


