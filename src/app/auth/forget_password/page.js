"use client";
import api from "@/app/utils/api";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ForgetPassword = () => {
  const [user_name, setUserName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call for password reset
      if (!user_name) {
        setError("Username is required");
        return;
      }
      const response = await api.post("/password/reset", {
        user_name,
      });
      console.log("Password reset link sent to:", user_name);
      console.log("Response from server:", response.data);
      if (!response.data.token) {
        setError("Failed to send reset link. Please try again.");
        return;
      }
      const token = response.data.token;
      const safeToken = encodeURIComponent(token);
      router.push(`/auth/update_password/${safeToken}`);

      setError(""); // Clear any previous error messages
      // Reset user_name field after submission
      setUserName("");
    } catch (error) {
      setError("Failed to send reset link. Please try again.");
      console.error("Error while sending reset link: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      {error ? (
        <div className="error-message text-red-500 mb-4">{error}</div>
      ) : null}
      <div className="left max-h-3/4 min-w-1/2 flex justify-center items-center">
        <img
          src="/images/forgetpass.svg"
          alt=""
          height={100}
          width={100}
          className="rounded-2xl min-w-3/4 min-h-3/4"
        />
      </div>
      <div className="right p-8 w-full min-w-1/2 flex justify-center flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Reset your password
        </h2>
        <form className="w-3/4">
          <div className="mb-4">
            <label className="block text-black font-bold">Email</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Please enter your user_name"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            onClick={handleSubmit}
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
