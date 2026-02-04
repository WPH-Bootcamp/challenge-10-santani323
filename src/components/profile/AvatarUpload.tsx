import { useEffect, useMemo, useState } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import { useUser } from "@/hooks/useUser";
import { getInitials } from "@/lib/formater";

type AvatarUploadProps = {
  imageUrl: string;
  onChange: (file: File) => void;
};

export function AvatarUpload({ imageUrl, onChange }: AvatarUploadProps) {
  const { fetchUserProfile, user, loading: userLoading } = useUser();
  const initials = useMemo(() => getInitials(user?.name), [user?.name]);
  return (
    <div className="relative mx-auto h-28 w-28">
      {/* Avatar */}
      {/* <img
        src={imageUrl}
        alt="Profile"
        className="h-full w-full rounded-full object-cover"
      /> */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={user?.name}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <div className="h-full w-full rounded-full object-cover flex items-center justify-center bg-gray-200 text-gray-500 font-semibold text-2xl">
          {initials || "JD"}
        </div>
      )}

      {/* Camera Button */}
      <label
        htmlFor="avatar"
        className="
          absolute bottom-0 right-0
          flex h-9 w-9 cursor-pointer
          items-center justify-center
          rounded-full bg-blue-500
          text-white shadow-md
          hover:bg-blue-600
        "
      >
        <CameraIcon className="h-5 w-5" />
        <input
          id="avatar"
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              onChange(e.target.files[0]);
            }
          }}
        />
      </label>
    </div>
  );
}
