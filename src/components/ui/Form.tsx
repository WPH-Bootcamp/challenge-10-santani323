"use client";

import React from "react";

type FormProps = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
};

export default function Form({
  children,
  onSubmit,
  className = "",
}: FormProps) {
  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`} noValidate>
      {children}
    </form>
  );
}
