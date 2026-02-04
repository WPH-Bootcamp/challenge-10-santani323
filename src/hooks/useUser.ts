"use client";

import { useState, useCallback } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useRouter } from "next/navigation";
import { getUserProfileService } from "@/services/userService";
import type { User } from "@/types/users";
import { setUser as setUserRedux } from "@/store/slices/profileSlice";
export function useUser() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUserLocal] = useState<User | null>(null);
  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const userProfile = await getUserProfileService();
      dispatch(setUserRedux(userProfile));
      setUserLocal(userProfile);
    } catch (err: any) {
      setError(err.message || "Failed to fetch user profile");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);
  return {
    fetchUserProfile,
    user,
    loading,
    error,
  };
}
