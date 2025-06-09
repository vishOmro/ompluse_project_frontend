"use client";
import { useState } from "react";
import api from "@/app/utils/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/register", {
        user: {
          user_name: userName,
          password,
          company_id: companyId,
          user_data: {},
        },
      });
      Cookies.set("token", response.data.token);
      router.push("/dashboard/dashboard_demo");
    } catch (err) {
      setError("Registration failed. Please check your details.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="left max-h-3/4 min-w-1/2 flex justify-center items-center">
        <img
          src="/images/login.png"
          alt=""
          srcSet=""
          height={100}
          width={100}
          className="rounded-2xl min-w-3/4 min-h-3/4"
        />
      </div>
      <div className="right p-8 w-full min-w-1/2 flex justify-center flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign Up to your accouunt
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="w-3/4">
          <div className="mb-4">
            <label className="block text-black font-bold">Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Please enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Please enter your password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">Company Id</label>
            <input
              type="text"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Please enter your company id"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
