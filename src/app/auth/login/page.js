"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import api from "@/app/utils/api";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Login() {
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 font-sans flex items-center justify-center p-4">
      <main className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl max-w-6xl w-full flex flex-col md:flex-row p-10 md:p-3 relative overflow-visible">
        {/* left side */}
        <section
          aria-hidden
          className="flex-1 flex-col flex justify-center items-center relative mt-10 md:mt-0"
        >
          <img
            alt="Sign In"
            src="/images/SignIn.gif"
            width={400}
            height={400}
            className="max-w-full h-auto select-none"
            draggable={false}
          />

          <p className="mt-6 text-base flex gap-2 text-gray-700 select-none max-w-xs">
            Don't have an account?
            <Link
              href="/auth/signup"
              className="text-indigo-600 hover:underline"
            >
              SignUp
            </Link>
          </p>
        </section>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-10  flex flex-col justify-center">
          <section className="flex flex-col flex-1 max-w-lg">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 mt-0 select-none">
              Log <span className="text-indigo-600">In</span>
            </h1>

            <div className="flex gap-4 mb-8 flex-wrap">
              <button
                type="button"
                className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition"
              >
                <img
                  src="https://storage.googleapis.com/a1aa/image/e2824dae-9ecd-47c4-860f-18285207cbc5.jpg"
                  alt="Google logo"
                  width={16}
                  height={16}
                />
                Sign up with Google
              </button>
              <button
                type="button"
                className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition"
              >
                <img
                  src="https://storage.googleapis.com/a1aa/image/8067583b-dadb-4665-5a3d-f5041ff1ea50.jpg"
                  alt="Facebook logo"
                  width={16}
                  height={16}
                />
                Sign up with Facebook
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-2 mb-6 flex-wrap">
                <label className="block text-gray-700 text-sm mb-1">
                  UserName
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your username"
                  required
                  id="email"
                  className="px-6 py-3 bg-white rounded-lg border border-gray-300 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3f3fdc]"
                />

                <label className="block text-gray-700 text-sm mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  id="password"
                  placeholder="Enter your password"
                  className="px-6 py-3 bg-white rounded-lg border border-gray-300 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3f3fdc]"
                />
              </div>

              {/* <div className="flex items-start gap-3 mb-8">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-5 h-5 rounded-full border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:ring-offset-0 cursor-pointer"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-gray-700 leading-tight select-none max-w-xs"
                >
                  I’ve read and agree with{" "}
                  <span className="underline cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and our{" "}
                  <span className="underline cursor-pointer">
                    Privacy Policy
                  </span>
                </label>
              </div> */}

              <a href="/auth/forget_password">
                <div className="text-right  text-indigo-600 text-sm  hover:underline cursor-pointer select-none">
                  Forget password?
                </div>
              </a>

              <button
                type="submit"
                aria-label="Submit sign up form"
                className=" h-10 w-full p-2 cursor-pointer rounded-xl bg-indigo-500 hover:bg-blue-600 transition flex items-center justify-center text-white text-lg mt-2"
              >
                Login
              </button>

              <p className="text-center -mt-4">or</p>

              <button
                type="submit"
                aria-label="Submit sign up form"
                className=" h-10 w-full p-2 cursor-pointer rounded-xl bg-indigo-500 hover:bg-blue-600 transition flex items-center justify-center text-white text-lg -mt-4"
              >
                Mobile Number
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
