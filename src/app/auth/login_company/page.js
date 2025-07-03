"use client";
import { useState } from "react";
import api from "@/app/utils/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

export default function CompanyLogin() {
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/company/login", {
        company_name: companyName,
        password,
      });
      Cookies.set("token", response.data.token);
      router.push("/dashboard/company");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 font-sans flex items-center justify-center p-6">
      <main className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl max-w-5xl w-full flex flex-col md:flex-row p-10 md:p-3 relative overflow-visible">
        {/* left side */}
        <section
          aria-hidden
          className="flex-1 flex justify-center items-center relative mt-10 md:mt-0"
        >
          <img
            alt="Sign In"
            src="/images/SignIn.gif"
            width={400}
            height={400}
            className="max-w-full h-auto select-none"
            draggable={false}
          />
        </section>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <section className="flex flex-col flex-1 -mt-4 max-w-lg">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 mt-0 select-none">
              Company <span className="text-indigo-600">Login</span>
            </h1>

            <div className="flex gap-4 mb-8 flex-wrap w-full">
              <button
                type="button"
                className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-4 text-sm text-center justify-center  text-gray-700 hover:bg-gray-50 transition w-full "
              >
                <img
                  src="https://storage.googleapis.com/a1aa/image/e2824dae-9ecd-47c4-860f-18285207cbc5.jpg"
                  alt="Google logo"
                  width={16}
                  height={16}
                />
                Sign up with Google
              </button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} classname="space-y-6">
              <div className="flex gap-2 mb-6 flex-wrap">
                <label className="block text-gray-700 text-sm mb-1">
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter comapany name"
                  required
                  className="px-6 py-3 bg-white rounded-lg border border-gray-300 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3f3fdc]"
                />

                <label className="block text-gray-700 text-sm mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="px-6 py-3 bg-white rounded-lg border border-gray-300 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3f3fdc]"
                />
              </div>

              <div className="flex items-start gap-3 mb-8">
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
              </div>

              <a href="/auth/forget_password">
                <div className="text-right mb-2  text-indigo-600 text-sm  hover:underline cursor-pointer select-none">
                  Forget password?
                </div>
              </a>

              <button
                type="submit"
                aria-label="Submit sign up form"
                className=" h-10 w-full p-2 cursor-pointer rounded-xl bg-indigo-500 hover:bg-blue-600 transition flex items-center justify-center text-white text-lg "
              >
                Login
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-700 select-none max-w-xs">
              Don't have an account?{" "}
              <Link
                href="/auth/signup_company"
                className="text-indigo-600 hover:underline"
              >
                SignUp
              </Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
