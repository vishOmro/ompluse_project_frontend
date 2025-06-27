"use client";
import { useState } from "react";
import api from "@/app/utils/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from 'next/link';

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
      router.push("/dashboard");
    } catch (err) {
      setError("Registration failed. Please check your details.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 to-blue-400 min-h-screen flex items-center justify-center p-6 font-sans">
      <main className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl max-w-5xl w-full flex flex-col md:flex-row p-10 md:p-16 relative overflow-visible">
        <section className="flex flex-col flex-1 max-w-lg">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8 select-none">Sign {' '}
            <span className="text-indigo-600">Up</span>
          </h1>

          <div className="flex gap-4 mb-8 flex-wrap">
            <button type="button" className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition">
              <img src="https://storage.googleapis.com/a1aa/image/e2824dae-9ecd-47c4-860f-18285207cbc5.jpg" alt="Google logo" width={16} height={16} />
              Sign up with Google
            </button>
            <button type="button" className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition">
              <img src="https://storage.googleapis.com/a1aa/image/8067583b-dadb-4665-5a3d-f5041ff1ea50.jpg" alt="Facebook logo" width={16} height={16} />
              Sign up with Facebook
            </button>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="w-full">

            <div className="flex gap-6 mb-6 flex-wrap">
              <div className="flex flex-col flex-1 min-w-[140px]">
                <label htmlFor="name" className="text-xs text-gray-700 mb-1 select-none">Username</label>
                <input id="name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Please enter your username"
                  required
                  autoComplete="name"
                  className="rounded-lg bg-white border border-transparent focus:border-pink-400 focus:ring-2 focus:ring-pink-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-300 outline-none transition" />
              </div>
              <div className="flex flex-col flex-1 min-w-[140px]">
                <label htmlFor="email" className="text-xs text-gray-700 mb-1 select-none">Password</label>
                <input id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Please enter your password"
                  required
                  className="rounded-lg bg-white border border-transparent focus:border-pink-400 focus:ring-2 focus:ring-pink-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-300 outline-none transition" />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="companyId" className="text-xs text-gray-700 mb-1 select-none">Company ID</label>
              <input id="companyId"
                name="companyId"
                type="text"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                placeholder="Please enter your company id"
                required
                className="rounded-lg bg-white border border-transparent focus:border-pink-400 focus:ring-2 focus:ring-pink-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-300 outline-none transition" />
            </div>

            <div className="flex items-start gap-3 mb-8">
              <input id="terms" type="checkbox" className="w-5 h-5 rounded-full border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:ring-offset-0 cursor-pointer" />
              <label htmlFor="terms" className="text-xs text-gray-700 leading-tight select-none max-w-xs">
                I’ve read and agree with <span className="underline cursor-pointer">Terms of Service</span> and our <span className="underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>

            <button type="submit" aria-label="Submit sign up form" className=" h-12 w-full p-2 cursor-pointer rounded-xl bg-indigo-500 hover:bg-blue-600 transition flex items-center justify-center text-white text-xl">
              Sign Up
            </button>

          </form>

          <p className="mt-6 text-sm text-gray-700 select-none max-w-xs">
            Already have an account? <Link href="/auth/login" className="text-indigo-600 hover:underline">Sign in</Link>
          </p>

        </section>

        <section aria-hidden className="flex-1 flex justify-center items-center relative mt-10 md:mt-0">
          <img src="/images/Signup.gif" alt="Signup" width={400} height={400} className="max-w-full h-auto select-none" draggable={false} />
        </section>
      </main>
    </div>
  );
}
