"use client";
import api from "@/app/utils/api";
import React, { useState } from "react";

const CreateEntity = () => {
  const [resource, setResource] = useState({
    ueid: "",
    entity_name: "",
    entity_type: "",
    telecom_operator: "",
    entity_proof: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (resource.ueid.length < 19) {
        setError("Entity Id should be 19 digits");
        return;
      }
      const formData = new FormData();
      // Nest parameters under "entity"
      formData.append("entity[ueid]", resource.ueid);
      formData.append("entity[entity_name]", resource.entity_name);
      formData.append("entity[entity_type]", resource.entity_type);
      formData.append("entity[telecom_operator]", resource.telecom_operator);
      if (resource.entity_proof) {
        formData.append("letter_of_authorization_url", resource.entity_proof);
      }

      const response = await api.post("/dlt/entities", formData, {
        headers: {
          // Content-Type is set automatically by FormData
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      setSuccess("Entity created successfully!");
      // Reset form
      setResource({
        ueid: "",
        entity_name: "",
        entity_type: "",
        telecom_operator: "",
        entity_proof: null,
      });
      // Clear file input
      e.target.querySelector('input[type="file"]').value = "";
    } catch (error) {
      console.error("Error while creating entity:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.errors?.ueid?.[0] ||
        "Failed to create entity. Please check your input and try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-100 text-black min-w-4/5">
      <h1 className="text-3xl font-bold">Add Entity ID</h1>
      {error && (
        <p className="absolute right-0 text-red-500 mb-4 bg-red-400/14 px-10 py-4 font-bold rounded-l-lg">
          {error}
        </p>
      )}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
          <div className="mb-2 w-1/3">
            <label className="block text-black font-bold mb-2">Entity ID</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter Entity ID"
              required
              value={resource.ueid}
              onChange={(e) =>
                setResource({ ...resource, ueid: e.target.value })
              }
            />
          </div>
          <div className="mb-2 w-1/3">
            <label className="block text-black font-bold mb-2">
              Entity Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter Entity Name"
              required
              value={resource.entity_name}
              onChange={(e) =>
                setResource({ ...resource, entity_name: e.target.value })
              }
            />
          </div>
          <div className="mb-2 w-1/3">
            <label className="block text-black font-bold mb-2">
              Entity Type
            </label>
            <select
              className="w-full p-2 border rounded"
              required
              value={resource.entity_type}
              onChange={(e) =>
                setResource({ ...resource, entity_type: e.target.value })
              }
            >
              <option value="" disabled>
                Select Entity Type
              </option>
              <option value="individual">Individual</option>
              <option value="company">Company</option>
              <option value="partnership">Partnership</option>
            </select>
          </div>
          <div className="mb-2 w-1/3">
            <label className="block text-black font-bold mb-2">
              Telecom Operator
            </label>
            <select
              className="w-full p-2 border rounded"
              required
              value={resource.telecom_operator}
              onChange={(e) =>
                setResource({ ...resource, telecom_operator: e.target.value })
              }
            >
              <option value="" disabled>
                Select Telecom Operator
              </option>
              <option value="airtel">Airtel</option>
              <option value="vi">Vodafone-Idea</option>
              <option value="jio">JIO</option>
            </select>
          </div>
          <div className="mb-2 w-1/3">
            <label className="block text-black font-bold mb-2">
              Entity Proof
            </label>
            <input
              type="file"
              className="w-full p-2 border rounded"
              required
              onChange={(e) =>
                setResource({ ...resource, entity_proof: e.target.files[0] })
              }
              accept=".jpg,.jpeg,.png,.pdf"
            />
            <p className="text-red-500 text-sm mt-1">
              *Upload DLT entity certificate or profile page screenshot, which
              shows Entity ID & Approved status clearly.
            </p>
          </div>
        </form>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 cursor-pointer w-1/3"
          onClick={handleSubmit}
        >
          Add Entity
        </button>
      </div>
    </div>
  );
};

export default CreateEntity;
