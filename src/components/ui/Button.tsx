"use client";

import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  onClick,
  className = "",
}: ButtonProps) {
  const baseStyle =
    "w-full py-2 px-4 rounded-full font-medium transition duration-200 focus:outline-none";

  const variants = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500",
    secondary:
      "bg-gray-500 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant]} ${
        disabled || loading ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
