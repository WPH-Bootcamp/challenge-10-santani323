"use client";

import { useState, useCallback } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useRouter } from "next/navigation";
import {
  getUserProfileService,
  postProfileService,
} from "@/services/userService";
import type { UpdateProfilePayload, User } from "@/types/users";
import { updateUser } from "@/store/slices/profileSlice";
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
      dispatch(updateUser(userProfile));
      setUserLocal(userProfile);
    } catch (err: any) {
      setError(err.message || "Failed to fetch user profile");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);
  const updateUserProfile = useCallback(
    async (payload: UpdateProfilePayload) => {
      setLoading(true);
      setError(null);
      try {
        const updatedProfile = await postProfileService(payload);
        if ("id" in updatedProfile) {
          setError("This endpoint is not implemented yet.");
          router.refresh();
        } else {
          await fetchUserProfile();
        }
      } catch (err: any) {
        setError(err.message || "Failed to update user profile");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, fetchUserProfile, router],
  );

  return {
    fetchUserProfile,
    user,
    loading,
    error,
    updateUserProfile,
  };
}
