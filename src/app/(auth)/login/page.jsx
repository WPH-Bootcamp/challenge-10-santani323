"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import Link from "next/link";
import SuccessAlert from "@/components/ui/SuccessAlert";
import WarningAlert from "@/components/ui/WarningAlert";


export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useAuth();
  const [message, setMessage] = useState("");
  const [statusResponne, setStatusResponse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { email: "", password: "" };
    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is not valid";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    }
    setErrors(newErrors);
    if (hasError) return false;
    try {
      const response = await login({ email, password });
      setStatusResponse(200);
      setMessage("Login successful");
      // Simpan token ke localStorage
      if (response && response.token) {
        localStorage.setItem("token", response.token);
      }
      router.push("/");
    } catch (err) {
      setStatusResponse(err?.statusCode);
      setMessage(err?.message);
      console.log("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-semibold text-center mb-8">Sign In</h1>
          {statusResponne === 200 && <SuccessAlert message={message} />}
          {statusResponne !== 200 && message && (
            <WarningAlert message={message} />
          )}
          <Form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              error={errors.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              required
              error={errors.password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" disabled={loading} className="w-full mt-4">
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Form>
          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
