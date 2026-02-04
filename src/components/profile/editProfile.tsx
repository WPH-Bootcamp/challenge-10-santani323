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

type FormData = {
  name: string;
  profileHeadline: string;
};

export default function EditProfile() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "John Doe",
    profileHeadline: "Frontend Developer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setOpen(false);
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
          <DialogPanel
            className="
              w-full max-w-sm
              rounded-xl bg-white shadow-lg
              p-6
            "
          >
            {/* Header (tanpa border) */}
            <div className="mb-4 flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">
                Edit Profile
              </DialogTitle>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <Form onSubmit={handleSubmit}>
              {/* Avatar */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 rounded-full bg-blue-500 p-1.5 text-white hover:bg-blue-600"
                  >
                    ✎
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <InputField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />

                <InputField
                  label="Profile Headline"
                  name="profileHeadline"
                  value={formData.profileHeadline}
                  onChange={handleChange}
                  placeholder="Enter your profile headline"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="mt-6 w-full"
              >
                {loading ? "Saving..." : "Update Profile"}
              </Button>
            </Form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
