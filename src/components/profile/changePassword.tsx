"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Form from "@/components/ui/Form";

export default function ChangePassword() {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setPasswordMessage("Password berhasil diubah!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsLoading(false);
      setTimeout(() => setPasswordMessage(null), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-md">
      {passwordMessage && (
        <div className="mb-4 rounded-md bg-green-50 text-green-700 px-4 py-3 text-sm border border-green-200">
          ✓ {passwordMessage}
        </div>
      )}
      <Form onSubmit={handlePasswordChange}>
        <InputField
          label="Current Password"
          name="currentPassword"
          type="password"
          placeholder="Masukkan password lama"
          value={passwordForm.currentPassword}
          onChange={(e) =>
            setPasswordForm((prev) => ({
              ...prev,
              currentPassword: e.target.value,
            }))
          }
          required
        />
        <InputField
          label="New Password"
          name="newPassword"
          type="password"
          placeholder="Masukkan password baru"
          value={passwordForm.newPassword}
          onChange={(e) =>
            setPasswordForm((prev) => ({
              ...prev,
              newPassword: e.target.value,
            }))
          }
          required
        />
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Ulangi password baru"
          value={passwordForm.confirmPassword}
          onChange={(e) =>
            setPasswordForm((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          required
        />
        <Button type="submit" loading={isLoading} className="w-auto px-6">
          Save Password
        </Button>
      </Form>
    </div>
  );
}
