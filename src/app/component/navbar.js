import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-white text-black h-14 px-4">
      <div className="left pl-5 text-lg font-bold">Ompluse</div>
      <div className="right flex">
        <ul className="flex justify-around items-center gap-6 text-zinc-800 text-sm">
          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            Dashboard
          </li>
          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            Campaigns
          </li>
          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            Templates
          </li>
          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            Contacts
          </li>
          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            Reports
          </li>
          <li className="cursor-pointer hover:text-zinc-950 font-semibold">
            Settiings
          </li>
          <li className="profile_image"></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
