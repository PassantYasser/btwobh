"use client";
import React, { useState } from "react";
import API from "@/app/Redux/Api/axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.get("/users");
      const users = response.data;

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("token", user.token);
        window.location.href = "/Page/Home";
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white rounded-3xl shadow-lg p-6 sm:p-8 lg:p-12"
      >
        <p className="text-center text-xl sm:text-2xl font-normal">
          Welcome back
        </p>

        <h1 className="text-center text-3xl font-bold mt-2 mb-8">
          Login
        </h1>

        {error && (
          <div className="mb-5 rounded-lg bg-red-50 py-3 text-center text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm sm:text-base font-medium text-black">
            Email
          </label>

          <input
            type="email"
            required
            placeholder="admin@reservex.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded-md bg-gray-100 px-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mt-5">
          <label className="mb-2 block text-sm sm:text-base font-medium text-black">
            Password
          </label>

          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full rounded-md bg-gray-100 px-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-3 text-right">
          <button
            type="button"
            className="text-xs sm:text-sm font-medium text-gray-500 hover:underline"
          >
            Forgot your password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full rounded-md bg-blue-600 py-3 text-base sm:text-lg font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          className="mt-8 flex w-full justify-center gap-2 text-sm"
        >
          <span className="text-gray-700">Don't have an account?</span>
          <span className="font-bold text-blue-600">Create account</span>
        </button>
      </form>
    </div>
  );
}

export default LoginPage;