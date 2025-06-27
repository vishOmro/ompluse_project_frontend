"use client";
import React, { useEffect, useState } from "react";
import api from "@/app/utils/api";
import toast from "react-hot-toast";

const GetContacts = () => {
  const [resource, setResource] = useState([]);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone_number: "",
    group_id: "",
  });

  // Fetch contacts for specific group (example: group_id 3)
  const fetchContacts = async () => {
    setError("");
    try {
      const response = await api.get(`/dlt/groups/3/contacts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      setResource(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch Contacts data.");
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await api.get(`/dlt/groups`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      setGroups(response.data.data);
    } catch (err) {
      console.error("Error fetching groups:", err);
    }
  };

  const handleCreateContact = async () => {
    try {
      const formData = new FormData();
      formData.append("group_contact[name]", form.name);
      formData.append("group_contact[phone_number]", form.phone_number);
      formData.append("group_contact[group_id]", form.group_id);

      await api.post(`/dlt/groups/${form.group_id}/contacts`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      toast.success("Contact created successfully!");
      setShowModal(false);
      setForm({ name: "", phone_number: "", group_id: "" });
      fetchContacts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create contact.");
    }
  };

  // 🔥 Handle DELETE
  const handleDeleteContact = async (contactId, groupId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmed) return;

    try {
      await api.delete(`/dlt/groups/${groupId}/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      toast.success("Contact deleted successfully!");
      fetchContacts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete contact.");
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchGroups();
  }, []);

  return (
    <div className="px-4 py-3">
      <h1 className="text-3xl font-bold">Contacts Approvals</h1>
      <p className="text-base text-gray-500 mt-2">
        Manage your Contacts approvals for DLT SMS service.
      </p>

      {/* Create Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[450px] shadow-lg">
            <h2 className="text-lg font-bold mb-4">Add New Contact</h2>

            <input
              type="text"
              placeholder="Contact Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border rounded mb-3"
            />

            <input
              type="number"
              placeholder="Phone Number"
              value={form.phone_number}
              onChange={(e) =>
                setForm({ ...form, phone_number: e.target.value })
              }
              className="w-full p-2 border rounded mb-3"
            />

            <select
              className="w-full p-2 border rounded mb-4"
              value={form.group_id}
              onChange={(e) => setForm({ ...form, group_id: e.target.value })}
            >
              <option value="" disabled>
                Select Group
              </option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleCreateContact}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Controls */}
      <div className="search_create flex w-full justify-around mt-4">
        <input
          type="text"
          placeholder="Search Contact Name"
          className="px-4 py-2 border-gray-400 rounded-xl w-3/5 border-1 focus:outline-1 focus:outline-blue-600"
        />
        <button className="px-8 py-2 bg-blue-600 text-white rounded-lg">
          Search
        </button>
        <button
          className="px-8 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => setShowModal(true)}
        >
          Create Contact
        </button>
      </div>

      {/* Contacts Table */}
      <div className="flex overflow-hidden rounded-xl border border-[#dce0e5] bg-white mt-5">
        <table className="flex-1">
          <thead>
            <tr className="bg-white">
              <th className="px-4 py-3 text-left w-[200px] text-sm font-medium text-[#111418]">
                Contact Name
              </th>
              <th className="px-4 py-3 text-left w-[200px] text-sm font-medium text-[#111418]">
                Phone Number
              </th>
              <th className="px-4 py-3 text-left w-[200px] text-sm font-medium text-[#111418]">
                Inserted At
              </th>
              <th className="px-4 py-3 text-left w-[200px] text-sm font-medium text-[#637488]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {resource.length > 0 ? (
              resource.map((item, index) => (
                <tr key={index} className="border-t border-t-[#dce0e5]">
                  <td className="px-4 py-2 text-sm text-[#111418]">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-[#637488]">
                    {item.phone_number}
                  </td>
                  <td className="px-4 py-2 text-sm text-[#637488]">
                    {item.inserted_at}
                  </td>
                  <td className="px-4 py-2 text-sm text-[#637488] space-x-4">
                    <button className="text-blue-500 font-semibold">
                      Edit
                    </button>
                    <button
                      className="text-red-500 font-semibold"
                      onClick={() =>
                        handleDeleteContact(item.id, item.group_id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No contacts available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetContacts;
