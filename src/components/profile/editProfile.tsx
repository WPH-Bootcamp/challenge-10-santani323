"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import { AvatarUpload } from "@/components/profile/AvatarUpload";

type FormDataState = {
  name: string;
  headline: string;
};

export default function EditProfile() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);

  const avatarPreview = avatar
    ? URL.createObjectURL(avatar)
    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop";

  const [formData, setFormData] = useState<FormDataState>({
    name: "John Doe",
    headline: "Frontend Developer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("headline", formData.headline);

      if (avatar) {
        payload.append("avatar", avatar);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer YOUR_TOKEN_HERE`,
            // ❗ jangan set Content-Type
          },
          body: payload,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        Edit Profile
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">
                Edit Profile
              </DialogTitle>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <Form onSubmit={handleSubmit}>
              {/* Avatar */}
              <div className="mb-6 flex flex-col items-center gap-2">
                <div className="mb-6">
                  <AvatarUpload
                    imageUrl={avatarPreview}
                    onChange={(file) => setAvatar(file)}
                  />
                </div>

                
              </div>

              <div className="space-y-4">
                <InputField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <InputField
                  label="Profile Headline"
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" loading={loading} className="mt-6 w-full">
                Update Profile
              </Button>
            </Form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
