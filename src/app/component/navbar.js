"use client";
import Cookies from "js-cookie";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  const token = Cookies.get("token");

  return (
    <nav className="flex justify-between items-center bg-white text-black h-14 px-4">
      <div className="left pl-5 text-lg font-bold">Ompluse</div>
      <div className="right flex">
        <ul className="flex justify-around items-center gap-6 text-zinc-800 text-sm">
          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            <Link href="/dlt-manager/get-campaign">Campaigns</Link>
          </li>
          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            <Link href="/dlt-manager/get-template">Templates</Link>
          </li>
          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            <Link href="/contacts">Contacts</Link>
          </li>
          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            <Link href="/reports">Reports</Link>
          </li>
          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            <Link href="/settings">Settings</Link>
          </li>
          {token && (
            <li className="cursor-pointer hover:text-zinc-950 font-semibold">
              <button
                onClick={() => {
                  Cookies.remove("token");
                  window.location.reload(); // refresh to update navbar state
                }}
                className="bg-red-500 px-4 py-1 text-white rounded-lg"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
