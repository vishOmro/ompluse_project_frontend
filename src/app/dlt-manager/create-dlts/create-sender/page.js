"use client";
import api from "@/app/utils/api";
import React, { useEffect, useState } from "react";

const CreateSender = () => {
  const [resource, setResource] = useState({
    sender_id: "",
    desc: "",
    Sender_proof: null,
    entity_id: "",
  });
  const [entities, setEntities] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchEntities = async () => {
    try {
      const response = await api.get("/dlt/entities", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      setEntities(response.data.data);
    } catch (error) {
      console.error("Error fetching entities:", error);
      setError("Failed to fetch entities. Please try again later.");
    }
  };
  // Fetch entities on component mount
  useEffect(() => {
    fetchEntities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const isValidSenderId = /^[a-zA-Z0-9]{6}$/.test(resource.sender_id);
    if (!isValidSenderId) {
      setError("Sender ID must be exactly 6 alphanumeric characters.");
      return;
    }

    try {
      const formData = new FormData();
      // Nest parameters under "Sender"
      formData.append("Sender[sender_id]", resource.sender_id);
      formData.append("Sender[desc]", resource.desc);
      formData.append("Sender[entity_id]", resource.entity_id);

      if (resource.Sender_proof) {
        formData.append("letter_of_authorization_url", resource.Sender_proof);
      }

      const response = await api.post("/dlt/senders", formData, {
        headers: {
          // Content-Type is set automatically by FormData
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      setSuccess("Sender created successfully!");
      // Reset form
      setResource({
        sender_id: "",
        desc: "",
        entity_id: "",
        Sender_proof: null,
      });
      // Clear file input
      //   e.target.querySelector('input[type="file"]').value = "";
    } catch (error) {
      console.error("Error while creating Sender:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.errors?.ueid?.[0] ||
        "Failed to create Sender. Please check your input and try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-100 text-black min-w-4/5">
      <h1 className="text-3xl font-bold">Add Sender ID</h1>
      {error && (
        <p className="absolute right-0 text-red-500 mb-4 bg-red-400/14 px-10 py-4 font-bold rounded-l-lg">
          {error}
        </p>
      )}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
          <div className="mb-2 w-1/3">
            <label className="block text-black font-bold mb-2">Sender ID</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter Sender ID"
              required
              value={resource.sender_id}
              onChange={(e) =>
                setResource({ ...resource, sender_id: e.target.value })
              }
            />
          </div>
          <div className="mb-2 w-1/3">
            <label className="block text-black font-bold mb-2">
              Sender Description
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter Sender Description"
              required
              value={resource.desc}
              onChange={(e) =>
                setResource({ ...resource, desc: e.target.value })
              }
            />
          </div>
          <div className="mb w-1/3">
            <label className="block text-black font-bold mb-2">
              Entity ID
              <select
                className="w-full p-2 border rounded"
                required
                value={resource.entity_id}
                onChange={(e) =>
                  setResource({ ...resource, entity_id: e.target.value })
                }
              >
                <option value="" disabled>
                  Select Entity Id
                </option>
                {entities.map((entity) => (
                  <>
                    <option key={entity.id} value={entity.id}>
                      {entity.ueid} - {entity.entity_name}
                    </option>
                  </>
                ))}
              </select>
            </label>
          </div>

          <div className="mb-2 w-1/3">
            <label className="block text-black font-bold mb-2">
              Sender Proof
            </label>
            <input
              type="file"
              className="w-full p-2 border rounded"
              required
              onChange={(e) =>
                setResource({ ...resource, Sender_proof: e.target.files[0] })
              }
              accept=".jpg,.jpeg,.png,.pdf"
            />
            <p className="text-red-500 text-sm mt-1">
              *Upload DLT Sender certificate or profile page screenshot, which
              shows Sender ID & Approved status clearly.
            </p>
          </div>
        </form>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 cursor-pointer w-1/3"
          onClick={handleSubmit}
        >
          Add Sender
        </button>
      </div>
    </div>
  );
};

export default CreateSender;
