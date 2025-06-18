"use client";

import React, { useEffect, useState } from "react";
import api from "@/app/utils/api";

const GetGroups = () => {
  const [resource, setResource] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    try {
      const response = await api.get(`/group`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      setResource(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch Groups data.");
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="px-4 py-3">
      <h1 className="text-3xl font-bold">Groups Approvals</h1>
      <p className="text-base text-gray-500 mt-2">
        Manage your Groups approvals for DLT SMS service.
      </p>
      <div className="search_create flex w-full justify-around mt-4">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search Groups Name"
          className=" px-4 py-2 border-gray-400 rounded-xl w-3/6 border-1 focus:outline-1 focus:outline-blue-600"
        />
        <button className="px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
          Search
        </button>
        <a href="/dlt-manager/create-Groups">
          <button className="px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
            ADD CONTACTS
          </button>
        </a>
        <a href="/dlt-manager/create-Groups">
          <button className="px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
            ADD Groups
          </button>
        </a>
      </div>
      <div className="flex overflow-hidden rounded-xl border border-[#dce0e5] bg-white mt-5">
        <table className="flex-1">
          <thead>
            <tr className="bg-white">
              <th className="table-column-360 px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                Groups Name
              </th>
              <th className="table-column-240 px-4 py-3 text-left text-[#111418] w-60 text-sm font-medium leading-normal">
                No. Of Contacts
              </th>

              <th className=" text-left  py-3  text-[#111418]  text-sm font-medium leading-normal">
                Inserted At
              </th>
              <th className="table-column-720 px-4 py-3 text-left  w-60 text-[#637488] text-sm font-medium leading-normal">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {resource.length > 0 ? (
              resource.map((item, index) => (
                <tr key={index} className="border-t border-t-[#dce0e5]">
                  <td className="table-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                    {item.name}
                  </td>

                  <td className="table-column-360 h-[72px] px-4 py-2 w-[400px] text-[#637488] text-sm font-normal leading-normal">
                    {item.Groups_name || "20"}
                  </td>
                  <td className="table-column-480 h-[72px] px-4 py-2 w-[400px] text-[#637488] text-sm font-normal leading-normal">
                    {item.inserted_at}
                  </td>

                  <td className="table-column-720 h-[72px] px-4 py-2 w-60 text-[#637488] text-sm font-bold leading-normal tracking-[0.015em]">
                    Edit
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

      <style jsx>{`
        @container (max-width: 120px) {
          .table-column-120 {
            display: none;
          }
        }
        @container (max-width: 240px) {
          .table-column-240 {
            display: none;
          }
        }
        @container (max-width: 360px) {
          .table-column-360 {
            display: none;
          }
        }
        @container (max-width: 480px) {
          .table-column-480 {
            display: none;
          }
        }
        @container (max-width: 600px) {
          .table-column-600 {
            display: none;
          }
        }
        @container (max-width: 720px) {
          .table-column-720 {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default GetGroups;
