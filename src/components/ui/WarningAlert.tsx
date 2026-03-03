"use clinet";

import React from "react";

type WarningAlertProps = {
  message: string;
};

export default function WarningAlert({ message }: WarningAlertProps) {
  return (
    <div
      className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
      role="alert"
    >
      <p className="font-bold">Warning</p>
      <p>{message}</p>
    </div>
  );
}
