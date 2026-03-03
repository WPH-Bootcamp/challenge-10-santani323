import React, { useState } from "react";

type TagInputProps = {
  label: string;
  name: string;
  value: string[];
  onChange: (tags: string[]) => void;
};

export default function TagInput({ label, name, value, onChange }: TagInputProps) {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        onChange([...value, input.trim()]);
      }
      setInput("");
    } else if (e.key === "Backspace" && !input && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  const handleRemoveTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="mb-5" key={name}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 border rounded-md px-2 py-2 bg-white">
        {value.map((tag) => (
          <span key={tag} className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
            {tag}
            <button
              type="button"
              className="ml-2 text-gray-500 hover:text-red-500"
              onClick={() => handleRemoveTag(tag)}
            >
              &times;
            </button>
          </span>
        ))}
        <input
          id={name}
          name={name}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="flex-1 min-w-[120px] px-2 py-1 outline-none"
          placeholder="Add tag and press Enter"
        />
      </div>
    </div>
  );
}
