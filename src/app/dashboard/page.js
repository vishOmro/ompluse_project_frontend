"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/app/utils/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/pages/login");
    }

    const fetchUser = async () => {
      try {
        const response = await api.get("/dashboard"); // Add this endpoint in Phoenix
        setUser(response.data.user || response.data.company);
      } catch (err) {
        console.log("Error while authenticating: ", err);
        setUser(err);
        // Cookies.remove("token");
        // router.push("/auth/login");
      }
    };

    fetchUser();
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className=" flex items-center justify-center bg-gray-100 text-black min-w-4/5">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        <p>Welcome, {user.user_name}!</p>
        <button
          onClick={() => {
            Cookies.remove("token");
            router.push("/auth/login");
          }}
          className="w-full bg-red-500 text-white p-2 rounded mt-4 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
