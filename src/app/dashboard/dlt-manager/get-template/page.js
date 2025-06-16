"use client";
import api from "@/app/utils/api";
import React, { use, useEffect, useState } from "react";

const GetTemplate = () => {
  const [resource, setResource] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    try {
      const response = await api.get(`/dlt/templates`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      setResource(response.data.data);

      setSuccess("Template retrieved successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);
  useEffect(() => {
    console.log("Updated Template:", resource);
  }, [resource]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-4/5">
      <div className="">
        <h1 className="text-2xl font-bold mb-6 text-center">Get Sender</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <p className="text-gray-600 mb-4">
          This page is under construction. Please check back later.
        </p>
      </div>
    </div>

    /*  <>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-left text-gray-600 text-xs">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 font-semibold">Entity ID</th>
              <th className="py-3 px-4 font-semibold">Entity Name</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entity, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="py-3 px-4 text-xs text-gray-400">{entity.id}</td>
                <td className="py-3 px-4">{entity.name}</td>
                <td className="py-3 px-4">
                  <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full inline-block select-none">
                    {entity.status}
                  </span>
                </td>
                <td className="py-3 px-4 font-semibold text-xs cursor-pointer hover:underline">View Details</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className="flex items-center justify-center space-x-2 mt-6 text-gray-600 text-sm select-none">
        <button aria-label="Previous page" className="p-1 hover:text-black">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center font-semibold text-xs text-gray-900">1</button>
        <button className="hover:text-black font-semibold text-xs">2</button>
        <button className="hover:text-black font-semibold text-xs">3</button>
        <span className="text-xs font-semibold">...</span>
        <button className="hover:text-black font-semibold text-xs">10</button>
        <button aria-label="Next page" className="p-1 hover:text-black">
          <i className="fas fa-chevron-right"></i>
        </button>
      </nav>
    </>

    */
  );
};

export default GetTemplate;
