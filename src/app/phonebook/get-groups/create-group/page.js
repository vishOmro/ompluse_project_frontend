"use client";
import api from "@/app/utils/api";
import React, { useState } from "react";

const CreateGroup = () => {
  const [resource, setResource] = useState({
    name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      // Nest parameters under "Group"
      formData.append("group[name]", resource.name);

      const response = await api.post("/group", formData, {
        headers: {
          // Content-Type is set automatically by FormData
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      setSuccess("Group created successfully!");
      // Reset form
      setResource({
        name: "",
      });
    } catch (error) {
      console.error("Error while creating Group:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.errors?.ueid?.[0] ||
        "Failed to create Group. Please check your input and try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-100 text-black min-w-4/5">
      <h1 className="text-3xl font-bold">Add Group ID</h1>
      {error && (
        <p className="absolute right-0 text-red-500 mb-4 bg-red-400/14 px-10 py-4 font-bold rounded-l-lg">
          {error}
        </p>
      )}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
          <div className="mb-2 w-1/3">
            <label className="block text-black font-bold mb-2">
              Group Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter Group Name"
              required
              value={resource.name}
              onChange={(e) =>
                setResource({ ...resource, name: e.target.value })
              }
            />
          </div>
        </form>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 cursor-pointer w-1/3"
          onClick={handleSubmit}
        >
          Add Group
        </button>
      </div>
    </div>
  );
};

export default CreateGroup;
