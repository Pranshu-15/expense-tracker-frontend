import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemove = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
        className="hidden"
      />

      {!image ? (
        <div className="relative w-20 h-20">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "var(--accent-dim)" }}
          >
            <LuUser size={32} style={{ color: "var(--accent)" }} />
          </div>
          <button
            type="button"
            onClick={() => inputRef.current.click()}
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
            style={{ background: "var(--accent)" }}
          >
            <LuUpload size={14} />
          </button>
        </div>
      ) : (
        <div className="relative w-20 h-20">
          <img
            src={previewUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
            style={{ border: "2px solid var(--border-strong)" }}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
            style={{ background: "var(--red)" }}
          >
            <LuTrash size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
