"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import api from "../utils/api";
import toast from "react-hot-toast";

const SmsForm = () => {
  const [senders, setSenders] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({
    sender_id: "",
    template_id: "",
    message: "",
    contacts: "",
    group_ids: [],
    csv_file: null,
    multipart: "",
    flash: "",
  });

  useEffect(() => {
    Promise.all([
      api.get("/dlt/senders"),
      api.get("/dlt/templates"),
      api.get("/dlt/groups"),
    ]).then(([sendersRes, templatesRes, groupsRes]) => {
      setSenders(sendersRes.data.data);
      setTemplates(templatesRes.data.data);
      setGroups(groupsRes.data.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("sms[sender_id]", formData.sender_id);
    form.append("sms[template_id]", formData.template_id);
    form.append("sms[message]", formData.message);
    form.append("sms[contacts]", formData.contacts);
    if (formData.group_ids.length > 0) {
      formData.group_ids.forEach((id) => {
        form.append("sms[group_ids][]", id);
      });
    }
    form.append("sms[multipart]", formData.multipart);
    form.append("sms[flash]", formData.flash);

    if (formData.csv_file) form.append("sms[csv_file]", formData.csv_file);

    try {
      const res = await api.post("/dlt/sms", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("SMS records created successfully");
      console.log("SMS records created:", res.data);
    } catch (error) {
      toast.error("Error in creating sms record");
      console.error("Error:", error.response.data);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6  text-black min-w-4/5">
      <h1 className="text-3xl font-bold">DLT SMS</h1>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sender
          </label>
          <select
            value={formData.sender_id}
            onChange={(e) =>
              setFormData({ ...formData, sender_id: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Sender</option>
            {senders.map((sender) => (
              <option key={sender.id} value={sender.sender_id}>
                {sender.sender_id}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Template
          </label>
          <select
            value={formData.template_id}
            onChange={(e) =>
              setFormData({ ...formData, template_id: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Template</option>
            {templates.map((template) => (
              <option key={template.id} value={template.template_id}>
                {template.template_content}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Enter message"
            className="w-full p-2 border rounded-md h-24"
          />
        </div>
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contacts (comma-separated)
          </label>
          <textarea
            value={formData.contacts}
            onChange={(e) =>
              setFormData({ ...formData, contacts: e.target.value })
            }
            placeholder="e.g. 1234567890,0987654321"
            className="w-full p-2 border rounded-md h-24"
          />
        </div>
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Groups
          </label>
          <select
            multiple
            value={formData.group_ids}
            onChange={(e) =>
              setFormData({
                ...formData,
                group_ids: Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                ),
              })
            }
            className="w-full p-2 border rounded-md h-32"
          >
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload CSV File
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) =>
              setFormData({ ...formData, csv_file: e.target.files[0] })
            }
            className="w-full p-2 border rounded-md file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded file:cursor-pointer"
          />
        </div>
        <div className="w-3/4 flex">
          <div className="w-full flex gap-6 items-center  ">
            <div className="flex gap-2">
              <input
                type="radio"
                id="multipart_form"
                name="multipart_form"
                value="true"
                onChange={(e) => {
                  setFormData({ ...formData, multipart: e.target.value });
                }}
              />
              <label htmlFor="html">Multipart Form</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="multipart_form"
                name="multipart_form"
                value="false"
                onChange={(e) => {
                  setFormData({ ...formData, multipart: e.target.value });
                }}
              />
              <label htmlFor="html">Non Multipart form</label>
            </div>
          </div>

          <div className="w-full flex gap-6 mt-1 ">
            <div className="flex gap-2">
              <input
                type="radio"
                id="flash_message"
                name="flash_message"
                value="true"
                onChange={(e) => {
                  setFormData({ ...formData, flash: e.target.value });
                }}
              />
              <label htmlFor="html">Flash message</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="flash_message"
                name="flash_message"
                value="false"
                onChange={(e) => {
                  setFormData({ ...formData, flash: e.target.value });
                }}
              />
              <label htmlFor="html">Non Flash Message</label>
            </div>
          </div>
        </div>
      </form>
      <button
        type="submit"
        className=" w-56 py-2 bg-blue-600 text-white  px-8 rounded-md hover:bg-blue-700 transition-colors"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default SmsForm;
