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
         
        router.push("/login");
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    },
    [router],
  );

  return {
    register,
    loading,
    error,
  };
}
