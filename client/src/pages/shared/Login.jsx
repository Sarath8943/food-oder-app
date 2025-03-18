import React from "react";

 export const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        <p className="text-center text-gray-500 mb-6">
          Welcome back! Please login to your account.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-400 transition">
            Login
          </button>
        </form>
        {/* Forgot Password Link */}
        <div className="text-start">
            <a href="#" className="text-blue-500 font-medium hover:underline">
              Forgot Password?
            </a>
          </div>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
