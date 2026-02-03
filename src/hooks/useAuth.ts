"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { postRegisterService, postLoginService } from "@/services/auth";

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [statusResponse, setStatusResponse] = useState("");

  const register = useCallback(
    async (data: any) => {
      setLoading(true);
      setError(null);
      try {
        const response = await postRegisterService(data);

        if ("id" in response) {
          setStatusResponse("200");
          setMessage("Registration successful");
          setTimeout(() => {
            router.push("/login");
          }, 5000);
        } else {
          setStatusResponse(response.statusCode.toString());
          setError(response.message);
        }
      } catch (err: any) {
        console.log("Registration Error:", err);
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
