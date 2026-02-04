import { useRef } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import { getInitials } from "@/lib/formater";
import { useSelector } from "react-redux";
import type { ProfileState } from "@/types/users";

type AvatarUploadProps = {
  preview?: string;
  onChange: (file: File) => void;
};

export function AvatarUpload({ preview, onChange }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { username, avatarUrl } = useSelector(
    (state: { profile: ProfileState }) => state.profile,
  );
  
  const displayUrl = preview || avatarUrl;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onChange(e.target.files[0]);
    }
  };

  return (
    <div className="relative mx-auto h-28 w-28">
      {displayUrl ? (
        <img
          src={displayUrl}
          alt={username || "User Avatar"}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-center text-2xl font-semibold text-gray-500">
          {getInitials(username) || ""}
        </div>
      )}

      {/* Camera Button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white shadow-md transition-colors hover:bg-blue-600"
        aria-label="Upload avatar"
      >
        <CameraIcon className="h-5 w-5" />
      </button>
      
      <input
        ref={inputRef}
        id="avatar"
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  );
}
