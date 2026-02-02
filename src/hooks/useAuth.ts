"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { postRegisterService } from "@/services/auth";

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

  const login = useCallback(
    async (data: any) => {
      setLoading(true);
      setError(null);
      try {
        const { postLoginService } = await import("@/services/auth");
        const response = await postLoginService(data);
        console.log("Login successful:", response);
        // router.push("/dashboard");
        return response;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  return {
    register,
    login,
    loading,
    error,
  };
}
