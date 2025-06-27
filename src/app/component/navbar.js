"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [token, setToken] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.reload();
  };

  return (
    <nav className="flex justify-between items-center bg-white text-black h-14 px-4 border-b-1 border-gray-300">
      <div className="left pl-5 text-lg font-bold">Ompluse</div>
      <div className="right flex">
        <ul className="flex justify-around items-center gap-6 text-zinc-800 text-sm">
          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            <Link href="/campaign">Campaigns</Link>
          </li>

          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            <Link href="/phonebook">Contacts</Link>
          </li>
          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            <Link href="/delivery-history">Reports</Link>
          </li>
          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            <Link href="/settings">Settings</Link>
          </li>

          {token && (
            <div className="relative inline-block text-left">
              {/* Avatar Button */}
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <img
                  src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                  alt="User Avatar"
                  className="w-full h-full rounded-full"
                />
              </button>

              {/* Dropdown Content */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <ul className="py-1">
                    <li className="px-4 py-2 text-left cursor-pointer">
                      View Profile
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 hover:text-red-600 rounded-lg"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
