"use client";
import { useState } from "react";
import api from "@/app/utils/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// export default function CompanyLogin() {
//   const [companyName, setCompanyName] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post("/company/login", {
//         company_name: companyName,
//         password,
//       });
//       Cookies.set("token", response.data.token);
//       router.push("/dashboard");
//     } catch (err) {
//       setError("Login failed. Please check your credentials.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Company Login</h2>
        // {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Company Name</label>
//             <input
//               type="text"
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


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
      router.push("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="bg-white font-[Inter]">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center">
              G
            </div>
            <span className="text-xs font-extrabold text-indigo-700 uppercase tracking-widest">
              OMRONIX
            </span>
          </div>
          <button className="bg-indigo-600 cursor-pointer text-white text-xs font-semibold rounded-full px-6 py-2 hover:bg-indigo-700 transition">
            Sign In
          </button>
        </header>

        {/* Main */}
        <main className="max-w-4xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold mb-8">
            <span className="text-black drop-shadow-sm">Company</span>{' '}
            <span className="text-indigo-600">Login</span>
          </h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}
        
          <form className="space-y-6 max-w-3xl">
            <div>
              <label
                htmlFor="companyName"
                className="block text-gray-900 font-semibold mb-1 text-lg"
              >
                Company Name :
              </label>
              <input
                id="companyName"
                type="text"
                placeholder="eg: Omronix"
                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {[
                { id: 'password' , label: 'Password'},
                { id: 'contactno' , label: 'Contact No'},
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
                    placeholder={`eg: Omronix`}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                 />
                </div>
              ))}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-gray-900 font-semibold mb-1 text-sm"
              >
                Address
              </label>
              <textarea
                id="address"
                rows={3}
                placeholder="Enter Address"
                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-sm bg-sky-400 hover:bg-sky-500 text-gray-900 font-extrabold cursor-pointer rounded-lg py-3 text-sm tracking-wider"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
