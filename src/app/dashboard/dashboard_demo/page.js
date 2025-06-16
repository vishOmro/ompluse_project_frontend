import React from "react";

const DashboardDemo = () => {

  return (
    <div className="bg-white text-gray-900 font-[Inter,sans-serif]">
      <header className="flex justify-end items-center gap-6 p-4">
        <button className="font-semibold text-xs text-black">Change Password</button>
        <button className="font-semibold text-xs text-black">Edit Profile</button>
        <button className="bg-[#B82C34] text-white text-xs font-semibold rounded-md px-5 py-2">
          Logout
        </button>
      </header>

      <main className="px-6 pb-10 max-w-[1200px] mx-auto">
        <h2 className="text-sm font-semibold text-[#2B2B2B] mb-4">Dashboard</h2>

        <section className="flex flex-wrap gap-6 mb-10">
          {["Overall Messages", "Service Implicit", "Service Explicit", "OTP"].map((title, idx) => (
            <div
              key={idx}
              className="bg-[#D9F0FF] rounded-xl p-5 w-[220px] flex flex-col gap-1 text-xs font-semibold text-[#1B1B1B]"
            >
              <span className="font-bold mb-2">{title}</span>
              <div className="flex justify-between">
                <span className="font-normal">Submitted</span>
                <span className="text-[#2AA14B] font-semibold">2000</span>
              </div>
              <div className="flex justify-between">
                <span className="font-normal">Awaited</span>
                <span className="text-[#1B1B1B] font-normal">3301</span>
              </div>
              <div className="flex justify-between">
                <span className="font-normal">Rejected</span>
                <span className="text-[#E87C7C] font-semibold">2000</span>
              </div>
            </div>
          ))}
        </section>

        <section className="flex flex-wrap gap-4 mb-10 items-center">
          <select
            aria-label="From Date"
            className="border border-gray-300 rounded-md text-xs text-gray-700 py-2 px-3 w-[110px]"
          >
            <option>From Date</option>
          </select>
          <select
            aria-label="To Time"
            className="border border-gray-300 rounded-md text-xs text-gray-700 py-2 px-3 w-[110px]"
          >
            <option>To Time</option>
          </select>
          <input
            className="flex-grow rounded-full bg-[#E3DFF0] text-xs text-gray-700 py-2 px-4"
            placeholder="Sender Id"
            type="text"
          />
          <button className="bg-[#1E90FF] text-white font-semibold text-xs rounded-md px-6 py-2">
            Search
          </button>
          <button className="bg-[#1E90FF] text-white font-semibold text-xs rounded-md px-6 py-2">
            View Reports
          </button>
        </section>

        <section className="flex flex-col lg:flex-row gap-6">
          {/* Bar Chart Section */}
          <div className="flex-1 bg-white rounded-xl p-6 shadow-[0_0_10px_#E6E6E6] max-w-full">
            <h3 className="text-xs font-semibold mb-1">Hourly Section Volume</h3>
            <p className="text-[10px] text-gray-500 mb-4">Sales from 12 AM - 11 PM</p>

            <div className="flex justify-center mt-4 gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="w-3 h-3 rounded-full bg-[#4B6CB7] inline-block"></span>
                Transactional SMS
              </div>
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="w-3 h-3 rounded-full bg-[#D9D9D9] inline-block"></span>
                Promotional SMS
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button className="text-xs text-[#4B6CB7] border border-[#D9E2FF] rounded-md px-4 py-1">
                View Report
              </button>
            </div>
          </div>

          {/* Predefined Report Card */}
          <div className="bg-white rounded-xl p-6 shadow-[0_0_10px_#E6E6E6] max-w-[400px] w-full relative">
            <div className="absolute top-4 right-4 text-gray-400 text-xs rotate-90 select-none">
              <i className="fas fa-arrows-alt-v"></i>
            </div>
            <h3 className="text-sm font-bold mb-1">Predefined Report</h3>
            <p className="text-[10px] text-gray-500 mb-6">Total profit growth of 25%</p>
            <ul className="text-xs space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E87C7C] inline-block"></span>
                <span className="font-semibold">Rejected</span>
                <span className="ml-auto font-normal">36%</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2AA14B] inline-block"></span>
                <span className="font-semibold">Submitted</span>
                <span className="ml-auto font-normal">38%</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E6D91B] inline-block"></span>
                <span className="font-semibold">Awaited</span>
                <span className="ml-auto font-normal">25%</span>
              </li>
            </ul>

          </div>
        </section>
      </main>
    </div>
  );

};

export default DashboardDemo;
