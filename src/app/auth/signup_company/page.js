"use client";
import { useState } from "react";
import api from "@/app/utils/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from 'next/link';

export default function CompanyRegister() {
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [formData, setFormData] = useState({
    contactno: '',
    tan: '',
    gst: '',
    pan: '',
    cin: '',
    businessType: '',
    websiteUrl: ''
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/company/register", {
        company: {
          company_name: companyName,
          password,
          contact_number: "",
          address: "",
          pan: "",
          gst: "",
          tan: "",
          cin: "",
          business_type: "",
          website_url: "",
        },
      });
      Cookies.set("token", response.data.token);
      router.push("/dashboard");
    } catch (err) {
      setError("Registration failed. Please check your details.");
    }
  };



  return (
    <>
      <div className="bg-gradient-to-br from-blue-200 to-blue-400 min-h-screen flex items-center justify-center p-6 font-sans">
        <main className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl max-w-5xl w-full  md:p-16 relative overflow-visible">

          <h1 className="text-3xl font-bold mb-8">
            <span className="text-black drop-shadow-sm">Company</span>{' '}
            <span className="text-indigo-600">SignUp</span>
          </h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">

            <div className="flex gap-6 mb-6 flex-wrap">
              <div className="flex flex-col flex-1 min-w-[140px]">
                <label className="block text-gray-900 font-semibold mb-1 text-sm">
                  Username
                </label>
                <input id="name"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Please enter your username"
                  required
                  className="rounded-lg bg-white border border-transparent focus:ring-indigo-400 focus:ring-2  px-4 py-2 text-sm text-gray-900 placeholder-gray-300 outline-none transition" />
              </div>

              <div className="flex flex-col flex-1 min-w-[140px]">
                <label className="block text-gray-900 font-semibold mb-1 text-sm">
                  Password
                </label>
                <input id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Please enter your password"
                  required
                  className="rounded-lg bg-white border border-transparent  focus:ring-indigo-400 focus:ring-2  px-4 py-2 text-sm text-gray-900 placeholder-gray-300 outline-none transition" />
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {[
                { id: 'contactno', label: 'Contact No' },
                { id: 'tan', label: 'TAN' },
                { id: 'gst', label: 'GST' },
                { id: 'pan', label: 'PAN' },
                { id: 'cin', label: 'CIN' },
                { id: 'businessType', label: 'Business Type' },
                { id: 'websiteUrl', label: 'Website URL' },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block text-gray-900 font-semibold mb-1 text-sm"
                  >
                    {field.label} <span className="text-red-600">*</span>
                  </label>

                  <input
                    id={field.id}
                    type="text"
                    placeholder="eg: Omronix"
                    value={formData[field.id]}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, [field.id]: e.target.value }))
                    }
                    className="w-full border bg-white border-gray-200 rounded-md px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                  />

                </div>
              ))}
            </div>

            <div>
              <label className="block text-gray-900 font-semibold mb-1 text-sm">
                Address <span className="text-red-600">*</span>
              </label>
              <textarea
                id="address"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Your Address"
                className="w-full bg-white border border-gray-200 rounded-md px-4 py-2 text-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex items-start gap-3 mb-8">
              <input id="terms" type="checkbox" className="w-5 h-5 rounded-full border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:ring-offset-0 cursor-pointer" />
              <label htmlFor="terms" className="text-xs text-gray-700 leading-tight select-none max-w-xs">
                I’ve read and agree with <span className="underline cursor-pointer">Terms of Service</span> and our <span className="underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>


            <button type="submit" aria-label="Submit sign up form" className=" h-12 min-w-[140px] p-2 cursor-pointer rounded-xl bg-indigo-500 hover:bg-blue-600 transition flex items-center justify-center text-white text-xl">
              Sign Up
            </button>

          </form>
          <p className="mt-6 text-sm text-gray-700 select-none max-w-xs">
            Already registred company? <Link href="/auth/login_company" className="text-indigo-600 hover:underline">Sign in</Link>
          </p>

        </main>
      </div>
    </>
  );
}
