"use client";
import api from "@/app/utils/api";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";

const Getcampaign = () => {
  const [resource, setResource] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);



  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    try {
      const response = await api.get(`/dlt/campaigns`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      setResource(response.data.data);

      setSuccess("campaign retrieved successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (


    <div className="px-4 py-3">
      <h1 className="text-3xl font-bold">Campaign Approvals</h1>
      <p className="text-base text-gray-500 mt-2">
        Manage your entity approvals for DLT SMS service.
      </p>
      <div className="search_create flex w-full justify-around mt-4">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search Campaign name"
          className=" px-4 py-2 border-gray-400 rounded-xl w-3/5 border-1 focus:outline-1 focus:outline-blue-600"
        />
        <button className="px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
          Search
        </button>

        <button className="px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
         <Link href={"/campaign/create-campaign"}>Create Campaign</Link>
        </button>
    

      </div>
      <div className="flex overflow-hidden rounded-xl border border-[#dce0e5] bg-white mt-5">
        <table className="flex-1">
          <thead>
            <tr className="bg-white text-center">
              <th className="table-column-120 px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                Campaign ID
              </th>
              <th className="table-column-360 px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                Campaign Name
              </th>
              <th className="table-column-240 px-4 py-3 text-left text-[#111418] w-60 text-sm font-medium leading-normal">
                Description
              </th>

              <th className="table-column-480 text-center py-3  text-[#111418] w-[400px] text-sm font-medium leading-normal">
                Sender Id
              </th>
              <th className="table-column-480 text-center py-3  text-[#111418] w-[400px] text-sm font-medium leading-normal">
                Template Id
              </th>
              <th className="table-column-480 text-center py-3  text-[#111418] w-[400px] text-sm font-medium leading-normal">
                Status
              </th>
              {/* <th className="table-column-600 px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                Operator
              </th> */}
              <th className="table-column-720 px-4 py-3 text-left  w-60 text-[#637488] text-sm font-medium leading-normal">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {resource.length > 0 ? (
              resource.map((item, index) => (
                <tr key={index} className="border-t border-t-[#dce0e5] px-16">
                  <td className="table-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                    {item.campaign_id}
                  </td>

                  <td className="table-column-360 h-[72px] px-4 py-2 w-[400px] text-[#637488] text-sm font-normal leading-normal">
                    {item.name}
                  </td>
                  <td className="table-column-480 h-[72px] px-4 py-2 w-[400px] text-[#637488] text-sm font-normal leading-normal">
                    {item.desc}
                  </td>
                  {/*  */}
                  <td className="table-column-600 h-[72px] px-8 py-2 w-[400px] text-[#637488] text-sm font-normal leading-normal ">
                    {item.sender_id}
                  </td>
                  <td className="table-column-600 h-[72px] px-8 py-2 w-[400px] text-[#637488] text-sm font-normal leading-normal ">
                    {item.template_id}
                  </td>
                  <td className="table-column-240 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f4] text-[#111418] text-sm fon t-medium leading-normal w-full">
                      <span className="truncate">{item.status}</span>
                    </button>
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
          }<td className="table-column-240 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f4] text-[#111418] text-sm fon t-medium leading-normal w-full">
                      <span className="truncate">
                        {item.verification_status}
                      </span>
                    </button>
                  </td>
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

export default Getcampaign;
