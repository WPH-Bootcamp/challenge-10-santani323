"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { postRegisterService, postLoginService } from "@/services/auth";

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(
    async (data: any) => {
      setLoading(true);
      setError(null);
      try {
        const response = await postRegisterService(data);
        console.log("Registration successful:", response);
        // router.push("/login");
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    },
    [router],
  );

  const login = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await postLoginService(data);
      // Success: response sudah dikembalikan ke komponen
      return response;
    } catch (err: any) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    register,
    login,
    loading,
    error,
  };
}
