import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-5">
      <h1 className="text-6xl font-bold mb-4" style={{ color: "var(--accent)" }}>
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--text-1)" }}>
        Page Not Found
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-2)", maxWidth: "400px" }}>
        The page you are looking for doesn't exist or has been moved. Let's get you back on track!
      </p>
      <Link
        to="/"
        className="px-6 py-2 rounded-xl text-sm font-semibold transition-all"
        style={{
          background: "var(--accent)",
          color: "white",
          boxShadow: "0 4px 14px var(--accent-glow)",
        }}
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
