"use client";
import React from "react";

const NotFound: React.FC<{ title?: string }> = ({ title = "404" }) => {
  const goBack = () => {
    window.history.back(); // 👈 Works fine in Vite/React
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
      <h1 className="text-6xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-600 mt-2 mb-6">Oops! Page not found.</p>

      <button
        onClick={goBack}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
