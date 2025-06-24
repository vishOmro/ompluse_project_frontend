"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import api from "@/app/utils/api";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", {
        user_name: userName,
        password,
      });
      const token = Cookies.set("token", response.data.token);
      toast.success("User Login Successfully");
      router.push("/dashboard");
    } catch (error) {
      setError("Invalid username or password", error);
      toast.error("Plz check your credentials");
      console.log("Error while login: ", error);
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
          Log in to your accouunt
        </h2>
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg cursor-pointer"
          >
            Login
          </button>
          <a href="/auth/forget_password">
            <p className="mt-2 text-sm text-gray-600 px-2 cursor-pointer">
              forget password?
            </p>
          </a>
          <p className="text-center">or</p>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-lg mt-4 cursor-pointer"
          >
            Mobile Number
          </button>
        </form>
      </div>

    </div>
  );
};

export default Login;
