import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        className="block text-xs font-medium mb-1"
        style={{ color: "var(--text-2)" }}
      >
        {label}
      </label>
      <div className="input-box">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm"
          style={{ color: "var(--text-1)" }}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button type="button" onClick={() => setShowPassword((v) => !v)}>
            {showPassword ? (
              <FaRegEye size={18} style={{ color: "var(--accent)" }} />
            ) : (
              <FaRegEyeSlash size={18} style={{ color: "var(--text-3)" }} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
