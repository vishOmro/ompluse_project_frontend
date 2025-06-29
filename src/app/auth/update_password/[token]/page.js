"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import api from "@/app/utils/api";
import { useRouter } from "next/navigation";

const UpdatePassword = () => {
  const { token } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(
        `/password/reset/confirm`,
        {
          user_name: userName,
          new_password: password,
          token: decodeURIComponent(token),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setSuccess("Password updated successfully!");
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } else {
        setError(response.data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError("An error occurred while updating the password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
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
        <h1 className="text-2xl font-bold mb-6 text-center">Update Password</h1>
        <form className="w-3/4 space-y-4">
          <div>
            <label
              htmlFor="user-name"
              className="block text-gray-700 font-bold mb-2"
            >
              User Name
            </label>
            <input
              type="text"
              id="user-name"
              name="user-name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white cursor-pointer font-bold py-2 rounded hover:bg-blue-700 transition duration-200"
            onClick={handleSubmit}
          >
            Update Password
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          If you have any issues, please contact support.
        </p>
      </div>
    </div>
  );
};

export default UpdatePassword;
