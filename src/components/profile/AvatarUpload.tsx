import { CameraIcon } from "@heroicons/react/24/solid";

type AvatarUploadProps = {
  imageUrl: string;
  onChange: (file: File) => void;
};

export function AvatarUpload({ imageUrl, onChange }: AvatarUploadProps) {
  return (
    <div className="relative mx-auto h-28 w-28">
      {/* Avatar */}
      <img
        src={imageUrl}
        alt="Profile"
        className="h-full w-full rounded-full object-cover"
      />

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
