"use client";

import { useState } from "react";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import SuccessAlert from "@/components/ui/SuccessAlert";
import WarningAlert from "@/components/ui/WarningAlert";

export default function RegisterPage() {
  const { register, loading, error, message, statusResponse } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) {
      newErrors.name = "Name is required";
      hasError = true;
    }
    if (!username) {
      newErrors.username = "Username is required";
      hasError = true;
    }
    if (!username) {
      newErrors.username = "Username is required";
      hasError = true;
    }
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
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      hasError = true;
    }
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      hasError = true;
    }
    setErrors(newErrors);
    if (hasError) return false;

    try {
      const response = await register({ name, username, email, password });
      // Handle registration logic here
      console.log("Registration successful:", response);
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8">
        <div className="bg-white rounded-b-lg shadow-md p-8">
          <h1 className="text-2xl font-semibold text-left mb-8">Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            {/* Username Field */}
            {statusResponse === 200 && <SuccessAlert message={message} />}
            {statusResponse !== 200 && error && (
              <WarningAlert message={error} />
            )}
            
            <InputField
              label={"Name"}
              name={"name"}
              type={"text"}
              placeholder={"Enter your name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
            <InputField
              label={"Username"}
              name={"username"}
              type={"text"}
              placeholder={"Enter your username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
            />
            <InputField
              label={"Email"}
              name={"email"}
              type={"email"}
              placeholder={"Enter your email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <InputField
              label={"Password"}
              name={"password"}
              type={"password"}
              placeholder={"Enter your password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <InputField
              label={"Confirm Password"}
              name={"confirmPassword"}
              type={"password"}
              placeholder={"Confirm your password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
            >
              Register
            </Button>
          </Form>{" "}
          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
