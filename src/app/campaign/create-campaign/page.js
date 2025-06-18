"use client";
import api from "@/app/utils/api";
import React, { useEffect, useState } from "react";

const Createcampaign = () => {
  const [resource, setResource] = useState({
    campaign_name: "",
    entity_id: "",
    sender_id: "",
    template_id: "",
    campaign_id: "",
    desc: "",
  });
  const [entities, setEntities] = useState([]);
  const [senders, setSenders] = useState([]);
  const [templates, setTemplates] = useState([]);
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

      const templateResponse = await api.get(`/dlt/templates`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      setTemplates(templateResponse.data.data);
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
    const randomFourDigit = Math.floor(1000 + Math.random() * 9000);

    try {
      const formData = new FormData();
      // Nest parameters under "campaign"
      formData.append("campaign[name]", resource.campaign_name);
      formData.append("campaign[entity_id]", resource.entity_id);
      formData.append("campaign[sender_id]", resource.sender_id);
      formData.append("campaign[template_id]", resource.template_id);
      formData.append("campaign[desc]", resource.desc);
      formData.append("campaign[campaign_id]", randomFourDigit);

      if (resource.campaign_proof) {
        formData.append("letter_of_authorization_url", resource.campaign_proof);
      }

      const response = await api.post("/dlt/campaigns", formData, {
        headers: {
          // Content-Type is set automatically by FormData
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      setSuccess("campaign created successfully!");
      // Reset form
      setResource({
        campaign_name: "",
        entity_id: "",
        sender_id: "",
        template_id: "",
        desc: "",
        campaign_id: "",
      });
      // Clear file input
      //   e.target.querySelector('input[type="file"]').value = "";
    } catch (error) {
      console.error("Error while creating campaign:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.errors?.ueid?.[0] ||
        "Failed to create campaign. Please check your input and try again.";
      setError(errorMessage);
    }
  };

  useEffect(() => {
    console.log("Updated templates:", templates);
  }, [templates]);

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-100 text-black min-w-4/5">
      <h1 className="text-3xl font-bold">Add campaign ID</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
          <div className="mb-2 w-1/3">
            <label className="block text-black font-bold mb-2">
              Campaign Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter Campaign Name"
              required
              value={resource.campaign_name}
              onChange={(e) =>
                setResource({ ...resource, campaign_name: e.target.value })
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

          <div className="mb w-1/3">
            <label className="block text-black font-bold mb-2">
              Template ID
              <select
                className="w-full p-2 border rounded"
                required
                value={resource.template_id}
                onChange={(e) =>
                  setResource({ ...resource, template_id: e.target.value })
                }
              >
                <option value="" disabled>
                  Select Template Id
                </option>
                {templates.map((template) => (
                  <>
                    <option key={template.id} value={template.id}>
                      {template.template_id} - {template.template_type}
                    </option>
                  </>
                ))}
              </select>
            </label>
          </div>

          <div className="mb w-1/3 flex flex-col">
            <label className="block text-black font-bold mb-2">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full p-2 border rounded"
              placeholder="Enter Message"
              value={resource.desc}
              onChange={(e) =>
                setResource({ ...resource, desc: e.target.value })
              }
            ></textarea>
          </div>
        </form>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 cursor-pointer w-1/3"
          onClick={handleSubmit}
        >
          Add campaign
        </button>
      </div>
    </div>
  );
};

export default Createcampaign;
