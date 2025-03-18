import React from "react";
import { useNavigate } from "react-router-dom";

export const ErrorPge = ({ role = "user" }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    if (role == "user") {
      navigate("/");
      return;
    }
    if (role =="admin") {
      navigate("/admin");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-300 to-gray-100">
      <div className="text-center p-12 bg-white shadow-2xl rounded-2xl border border-gray-300 max-w-lg w-full">
        <h1 className="text-9xl font-extrabold text-red-600 drop-shadow-md">
          404
        </h1>
        <p className="text-3xl text-gray-900 mt-4 font-bold">
          Oops! Page Not Found
        </p>
        <p className="text=lg text-gray-700 mt-2 px-6">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-10 py-4 text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-100 font-semibold text-lg track-lg tracking-wide"  onClick={handleNavigation}
        >
          {""}
          Go Home
        </a>
      </div>
    </div>
  );
};
