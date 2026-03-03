"use client";

import React from "react";

type SuccessAlertProps = {
  message: string;
};
export default function SuccessAlert({ message }: SuccessAlertProps) {
  return (
    <div
      className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
      role="alert"
    >
      <p className="font-bold">Success</p>
      <p>{message}</p>
    </div>
  );
}
