"use client";
import api from "@/app/utils/api";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const CreateCampaign = () => {
  const router = useRouter();
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

  const fetchResources = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      };
      const [entitiesRes, sendersRes, templatesRes] = await Promise.all([
        api.get("/dlt/entities", { headers }),
        api.get("/dlt/senders", { headers }),
        api.get("/dlt/templates", { headers }),
      ]);
      setEntities(entitiesRes.data.data);
      setSenders(sendersRes.data.data);
      setTemplates(templatesRes.data.data);
    } catch (err) {
      toast.error("Failed to fetch dependencies.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const campaignId = Math.floor(1000 + Math.random() * 9000);
    const formData = new FormData();

    formData.append("campaign[name]", resource.campaign_name);
    formData.append("campaign[entity_id]", resource.entity_id);
    formData.append("campaign[sender_id]", resource.sender_id);
    formData.append("campaign[template_id]", resource.template_id);
    formData.append("campaign[desc]", resource.desc);
    formData.append("campaign[campaign_id]", campaignId);

    try {
      await api.post("/dlt/campaigns", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      toast.success("Campaign created successfully!");
      router.push("/campaign");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.error ||
          "Failed to create campaign. Please try again."
      );
    }
  };

  return (
    <div className="px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Create Campaign</h1>
        <Link href="/campaign">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Go Back
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Campaign Name
              </label>
              <input
                type="text"
                value={resource.campaign_name}
                onChange={(e) =>
                  setResource({ ...resource, campaign_name: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter campaign name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Entity ID
              </label>
              <select
                value={resource.entity_id}
                onChange={(e) =>
                  setResource({ ...resource, entity_id: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="" disabled>
                  Select Entity
                </option>
                {entities.map((entity) => (
                  <option key={entity.id} value={entity.id}>
                    {entity.ueid} - {entity.entity_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sender ID
              </label>
              <select
                value={resource.sender_id}
                onChange={(e) =>
                  setResource({ ...resource, sender_id: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="" disabled>
                  Select Sender
                </option>
                {senders.map((sender) => (
                  <option key={sender.id} value={sender.id}>
                    {sender.sender_id} - {sender.desc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Template ID
              </label>
              <select
                value={resource.template_id}
                onChange={(e) =>
                  setResource({ ...resource, template_id: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="" disabled>
                  Select Template
                </option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.template_id} - {template.template_type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={4}
              value={resource.desc}
              onChange={(e) =>
                setResource({ ...resource, desc: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter message description"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;
