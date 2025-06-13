"use client";
import api from "@/app/utils/api";
import React, { use, useEffect, useState } from "react";

const Getcampaign = () => {
  const [resource, setResource] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
  useEffect(() => {
    console.log("Updated campaign:", resource);
  }, [resource]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-4/5">
      <div className="">
        <h1 className="text-2xl font-bold mb-6 text-center">Get campaign</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <p className="text-gray-600 mb-4">
          This page is under construction. Please check back later.
        </p>
      </div>
    </div>
  );
};

export default Getcampaign;
