"use client";
import React, { useState } from "react";
import { deliverydata } from "@/app/data/deliveryreport.js";
import { Download, ChevronRight, ChevronLeft } from "lucide-react";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate total pages
  const totalPages = Math.ceil(deliverydata.length / itemsPerPage);

  // Get current page data
  const currentData = deliverydata.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="px-4 py-3">
      <h1 className="text-3xl font-bold">Delivery History</h1>

      <p className="text-base text-gray-500 mt-2">
        Manage your delivery reports.
      </p>
      <div className="search_create flex w-full justify-around mt-4">
        <input
          type="text"
          placeholder="Search for type"
          className=" px-4 py-2 border-gray-400 rounded-xl w-3/5 border-1 focus:outline-1 focus:outline-blue-600"
        />
        <button className="px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
          Search
        </button>
        <a href="/dlt-manager/create-dlts">
          <button className="px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
            Download Report
          </button>
        </a>
      </div>
      <div className="flex overflow-hidden rounded-xl border border-[#dce0e5] bg-white mt-5">
        <table className="flex-1">
          <thead>
            <tr className="bg-white">
              <th className="table-column-120 px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                S.No.
              </th>
              <th className="table-column-360 px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                Sent Time
              </th>
              <th className="table-column-240 px-4 py-3 text-left text-[#111418] w-60 text-sm font-medium leading-normal">
                Message
              </th>
              <th className="table-column-480 text-center py-3  text-[#111418] w-[400px] text-sm font-medium leading-normal">
                Type
              </th>
              <th className="table-column-480 text-center py-3  text-[#111418] w-[400px] text-sm font-medium leading-normal">
                Detail
              </th>
              <th className="table-column-720 px-4 py-3 text-left  w-60 text-[#637488] text-sm font-medium leading-normal">
                Export
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={index} className="border-t border-t-[#dce0e5]">
                  <td className="table-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                    {item.s_no}
                  </td>
                  <td className="table-column-360 h-[72px] px-4 py-2 w-[400px] text-[#637488] text-sm font-normal leading-normal">
                    {item.sent_time}
                  </td>
                  <td className="table-column-480 h-[72px] px-4 py-2 w-[400px] text-[#637488] text-sm font-normal leading-normal">
                    {item.message}
                  </td>
                  <td className="table-column-480 h-[72px] px-8 py-2 w-[400px] text-[#637488] text-sm font-normal leading-normal">
                    {item.type}
                  </td>
                  <td className="table-column-600 h-[72px] px-8 py-2 w-[400px] text-[#637488] text-sm font-normal leading-normal">
                    {item.detail}
                  </td>
                  <td className="table-column-720 h-[72px] px-4 py-2 w-60 text-[#637488] text-sm font-bold leading-normal tracking-[0.015em]">
                    <div className="flex gap-2">
                      <button>
                        <Download />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex gap-4 items-center mt-4 w-full justify-center ">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? " text-gray-500 cursor-not-allowed"
              : "text-blue-500"
          }`}
        >
          <ChevronLeft />
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? " text-gray-500 cursor-not-allowed"
              : "text-shadow-blue-500"
          }`}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Page;
