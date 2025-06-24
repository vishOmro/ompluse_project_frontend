"use client";
import api from "@/app/utils/api";
import React, { useEffect, useState } from "react";

const Createtemplate = () => {
  const [resource, setResource] = useState({
    template_id: "",
    template_content: "",
    template_type: "",
    template_id: "",
    entity_id: "",
    sender_id: "",
  });
  const [entities, setEntities] = useState([]);
  const [senders, setSenders] = useState([]);
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
      const senderresponse = await api.get("/dlt/senders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      setSenders(senderresponse.data.data);
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

    if (resource.template_id.length != 19) {
      setError("Temprory Id should be exactly 19 digits");
      return;
    }

    try {
      const formData = new FormData();
      // Nest parameters under "template"
      formData.append("template[template_id]", resource.template_id);
      formData.append("template[template_content]", resource.template_content);
      formData.append("template[entity_id]", resource.entity_id);
      formData.append("template[sender_id]", resource.sender_id);
      formData.append("template[template_type]", resource.template_type);
      formData.append("template[status]", "pending");

      if (resource.template_proof) {
        formData.append("letter_of_authorization_url", resource.template_proof);
      }

      const response = await api.post("/dlt/templates", formData, {
        headers: {
          // Content-Type is set automatically by FormData
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      setSuccess("template created successfully!");
      // Reset form
      setResource({
        template_id: "",
        template_content: "",
        template_type: "",
        template_id: "",
        entity_id: "",
        sender_id: "",
      });

      
      // Clear file input
      //   e.target.querySelector('input[type="file"]').value = "";
    } catch (error) {
      console.error("Error while creating template:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.errors?.ueid?.[0] ||
        "Failed to create template. Please check your input and try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-100 text-black min-w-4/5">
      <h1 className="text-3xl font-bold">Add Template ID</h1>
      {error && (
        <p className="absolute right-0 text-red-500 mb-4 bg-red-400/14 px-10 py-4 font-bold rounded-l-lg">
          {error}
        </p>
      )}
      {success && <p className="absolute right-0 text-green-500 mb-4 bg-green-400/14 px-10 py-4 font-bold rounded-l-lg">{success}</p>}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
          <div className="mb-2 w-1/3">
            <label className="block text-black font-bold mb-2">
              Template ID
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter template ID"
              required
              value={resource.template_id}
              onChange={(e) =>
                setResource({ ...resource, template_id: e.target.value })
              }
            />
          </div>
          <div className="mb-2 w-1/3">
            <label className="block text-black font-bold mb-2">
              Template Content
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter template Description"
              required
              value={resource.template_content}
              onChange={(e) =>
                setResource({ ...resource, template_content: e.target.value })
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

          <div className="mb w-1/3">
            <label className="block text-black font-bold mb-2">
              Sender ID
              <select
                className="w-full p-2 border rounded"
                required
                value={resource.sender_id}
                onChange={(e) =>
                  setResource({ ...resource, sender_id: e.target.value })
                }
              >
                <option value="" disabled>
                  Select Sender Id
                </option>
                {senders.map((sender) => (
                  <>
                    <option key={sender.id} value={sender.id}>
                      {sender.sender_id} - {sender.desc}
                    </option>
                  </>
                ))}
              </select>
            </label>
          </div>
          <div className="mb-2 w-1/3">
            <label className="block text-black font-bold mb-2">
              Template Type
            </label>
            <select
              className="w-full p-2 border rounded"
              required
              value={resource.template_type}
              onChange={(e) =>
                setResource({ ...resource, template_type: e.target.value })
              }
            >
              <option value="" disabled>
                Select Template Type
              </option>
              <option value="transactional">Transactional</option>
              <option value="Promotional">Promotional</option>
              <option value="Servie Implicit">Service Implicit</option>
              <option value="Service Explicit">Service Explicit</option>
            </select>
          </div>
          {/* <div className="mb-2 w-1/3">
            <label className="block text-black font-bold mb-2">
              template Proof
            </label>
            <input
              type="file"
              className="w-full p-2 border rounded"
              required
              onChange={(e) =>
                setResource({ ...resource, template_proof: e.target.files[0] })
              }
              accept=".jpg,.jpeg,.png,.pdf"
            />
            <p className="text-red-500 text-sm mt-1">
              *Upload DLT template certificate or profile page screenshot, which
              shows template ID & Approved status clearly.
            </p>
          </div> */}
        </form>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 cursor-pointer w-1/3"
          onClick={handleSubmit}
        >
          Add template
        </button>
      </div>
    </div>
  );
};

export default Createtemplate;
