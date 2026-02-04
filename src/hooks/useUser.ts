"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { postRegisterService, postLoginService } from "@/services/authService";
import { getUserProfileService } from "@/services/userService";
import type { User } from "@/types/users";
export function useUser() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const userProfile = await getUserProfileService();
      setUser(userProfile);
    } catch (err: any) {
      setError(err.message || "Failed to fetch user profile");
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    fetchUserProfile,
    user,
    loading,
    error,
  };
}
