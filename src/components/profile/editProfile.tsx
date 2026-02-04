"use client";

import { useState, useEffect } from "react";
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
import { useUser } from "@/hooks/useUser";
import { useSelector } from "react-redux";
import type { ProfileState } from "@/types/users";

type FormDataState = {
  name: string;
  headline: string;
};

export default function EditProfile() {
  const { fetchUserProfile, updateUserProfile } = useUser();
  const profile = useSelector(
    (state: { profile: ProfileState }) => state.profile,
  );

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    headline: "",
  });

  useEffect(() => {
    if (open) {
      setFormData({
        name: profile?.name || "",
        headline: profile?.headline || "",
      });
      setAvatar(null);
      setAvatarPreview("");
    }
  }, [open, profile]);

  useEffect(() => {
    if (!avatar) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(avatar);
  }, [avatar]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // If UpdateProfilePayload expects an object, not FormData:
      const payload: any = {
        name: formData.name,
        headline: formData.headline,
      };
      // If avatar is required as a file, you may need to handle it differently in your API
      // if (avatar) {
      //   payload.avatar = avatar;
      // }
      if (avatar) payload.append("avatar", avatar);
      await updateUserProfile(payload);
      await fetchUserProfile();
      setOpen(false);
    } catch (err) {
      console.error(err);
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
                <AvatarUpload
                  preview={avatarPreview}
                  onChange={(file) => setAvatar(file)}
                />
              </div>

              {/* Fields */}
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
