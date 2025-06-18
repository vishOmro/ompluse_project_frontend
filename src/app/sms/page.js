"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import * as XLSX from "xlsx";
import api from "../utils/api";

export default function DltSmsPage() {
  const [senders, setSenders] = useState([]);
  const [senderId, setSenderId] = useState("");
  const [templates, setTemplates] = useState([]);
  const [templateId, setTemplateId] = useState("");
  const [content, setContent] = useState("");
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [contacts, setContacts] = useState("");
  const [file, setFile] = useState(null);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [removeInvalid, setRemoveInvalid] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchSenders();
    fetchTemplates();
    fetchGroups();
  }, []);

  useEffect(() => {
    if (templateId) {
      const template = templates.find((t) => t.template_id === templateId);
      setContent(template?.content || "");
    } else {
      setContent("");
    }
  }, [templateId, templates]);

  useEffect(() => {
    if (groupId) {
      fetchGroupContacts(groupId);
    }
  }, [groupId]);

  const fetchSenders = async () => {
    try {
      const response = await api.get("/dlt/senders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setSenders(response.data.data);
    } catch (err) {
      console.error("Failed to fetch senders:", err);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await api.get(`/dlt/templates`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setTemplates(response.data.data);
    } catch (err) {
      console.error("Failed to fetch templates:", err);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await api.get("/groups", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setGroups(response.data);
    } catch (err) {
      console.error("Failed to fetch groups:", err);
    }
  };

  const fetchGroupContacts = async (groupId) => {
    try {
      const response = await axios.get(`/api/auth/group_contacts/${groupId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const numbers = response.data
        .map((contact) => contact.phone_number)
        .join("\n");
      setContacts(numbers);
    } catch (err) {
      console.error("Failed to fetch group contacts:", err);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      if (selectedFile.name.endsWith(".csv")) {
        reader.onload = (event) => {
          const text = event.target?.result;
          setContacts(
            text
              .split("\n")
              .slice(1)
              .map((line) => line.split(",")[0])
              .join("\n")
          );
        };
        reader.readAsText(selectedFile);
      } else if (selectedFile.name.endsWith(".xlsx")) {
        reader.onload = (event) => {
          const data = new Uint8Array(event.target?.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const numbers = json
            .slice(1)
            .map((row) => row[0])
            .filter(Boolean)
            .join("\n");
          setContacts(numbers);
        };
        reader.readAsArrayBuffer(selectedFile);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    let contactsInput = {};
    if (file) {
      const fileType = file.name.endsWith(".csv") ? "csv" : "xlsx";
      const fileData = contacts
        .split("\n")
        .map((line) => line + ",")
        .join("\n");
      contactsInput = { file: fileData, file_type: fileType };
    } else if (groupId) {
      contactsInput = { group_id: groupId };
    } else {
      contactsInput = { textarea: contacts };
    }

    try {
      const randomID = Math.floor(1000 + Math.random() * 9000);
      const response = await axios.post(
        "/api/auth/dlt_sms",
        {
          sender_id: senderId,
          template_id: templateId,
          content,
          contacts: contactsInput,
          campaign_id: randomID,
          remove_duplicates: removeDuplicates,
          remove_invalid: removeInvalid,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSuccess(response.data.message);
      setTimeout(() => router.push("/dashboard"), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">DLT SMS</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="senderId"
              className="block text-sm font-medium text-gray-700"
            >
              Sender ID
            </label>
            <select
              id="senderId"
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Sender ID</option>
              {senders.map((sender) => (
                <option key={sender.id} value={sender.sender_id}>
                  {sender.sender_id}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="templateId"
              className="block text-sm font-medium text-gray-700"
            >
              Template
            </label>
            <select
              id="templateId"
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Template</option>
              {templates.map((template) => (
                <option key={template.id} value={template.template_id}>
                  {template.template_id}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="groupId"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Group
            </label>
            <select
              id="groupId"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Group (Optional)</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="contacts"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Numbers
            </label>
            <textarea
              id="contacts"
              value={contacts}
              onChange={(e) => setContacts(e.target.value)}
              placeholder="Enter phone numbers (one per line or comma-separated)"
              rows={6}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Upload CSV/XLSX (Optional)
            </label>
            <input
              id="file"
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Format: phone_number,name
            </p>
          </div>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={removeDuplicates}
                onChange={(e) => setRemoveDuplicates(e.target.checked)}
                className="mr-2"
              />
              Remove Duplicates
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={removeInvalid}
                onChange={(e) => setRemoveInvalid(e.target.checked)}
                className="mr-2"
              />
              Remove Invalid Numbers
            </label>
          </div>
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-100 text-green-700 rounded-md">
              {success}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Sending..." : "Send SMS"}
          </button>
        </form>
      </div>
    </div>
  );
}
