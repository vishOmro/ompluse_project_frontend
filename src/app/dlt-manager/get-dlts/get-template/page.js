"use client";

import React, { useEffect, useState } from "react";
import api from "@/app/utils/api";
import toast from "react-hot-toast";
import { FilePenLine, Trash2 } from "lucide-react";

const GetTemplate = () => {
  const [resource, setResource] = useState([]);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [editData, setEditData] = useState({
    id: "",
    template_id: "",
    entity_id: "",
    sender_id: "",
    template_content: "",
    template_status: "",
  });

  const payload = {
    id: editData.id,
    template: {
      template_id: editData.template_id,
      entity_id: editData.entity_id,
      sender_id: editData.sender_id,
      template_content: editData.template_content,
      template_status: editData.template_status,
    },
  };

  const handleSubmit = async () => {
    try {
      const response = await api.get(`/dlt/templates`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      setResource(response.data.data);
      toast.success("Templates fetched successfully!");
    } catch (err) {
      toast.error("Error fetching templates.");
      setError("Failed to fetch template data.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/dlt/templates/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      toast.success("Template deleted successfully.");
      setResource((prev) => prev.filter((item) => item.id !== id));
      setShowDeleteModal(false);
    } catch (err) {
      toast.error("Error deleting template.");
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/dlt/templates/${editData.id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      toast.success("Template updated successfully.");
      setShowEditModal(false);
      handleSubmit();
    } catch (err) {
      toast.error("Error updating template.");
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="px-4 py-3">
      <h1 className="text-3xl font-bold">Template Approvals</h1>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[500px] shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              Update Template
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Template ID
                </label>
                <input
                  type="text"
                  value={editData.template_id}
                  onChange={(e) =>
                    setEditData({ ...editData, template_id: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 bg-gray-500/50  rounded-md px-3 py-2"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Entity ID
                </label>
                <input
                  type="text"
                  value={editData.entity_id}
                  onChange={(e) =>
                    setEditData({ ...editData, entity_id: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sender ID
                </label>
                <input
                  type="text"
                  value={editData.sender_id}
                  onChange={(e) =>
                    setEditData({ ...editData, sender_id: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  value={editData.template_content}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      template_content: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-red-600">
              Delete Template?
            </h2>
            <p className="text-gray-700 mb-4">
              Deleting this template is irreversible. Are you sure?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-300 text-gray-800"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedId(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white"
                onClick={() => handleDelete(selectedId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-base text-gray-500 mt-2">
        Manage your template approvals for DLT SMS service.
      </p>

      <div className="search_create flex w-full justify-around mt-4">
        <input
          type="text"
          placeholder="Search Template name"
          className="px-4 py-2 border-gray-400 rounded-xl w-3/5 border-1 focus:outline-1 focus:outline-blue-600"
        />
        <button className="px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
          Search
        </button>
        <button className="px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
          Create Template
        </button>
      </div>

      <div className="flex overflow-hidden rounded-xl border border-[#dce0e5] bg-white mt-5">
        <table className="flex-1">
          <thead>
            <tr className="bg-white">
              <th className="px-4 py-3 text-left text-[#111418] text-sm font-medium w-[200px]">
                Template ID
              </th>
              <th className="px-4 py-3 text-left text-[#111418] text-sm font-medium w-[200px]">
                Entity ID
              </th>
              <th className="px-4 py-3 text-left text-[#111418] text-sm font-medium w-[200px]">
                Sender ID
              </th>
              <th className="px-4 py-3 text-left text-[#111418] text-sm font-medium w-[300px]">
                Message
              </th>
              <th className="py-3 text-center text-[#111418] text-sm font-medium w-[150px]">
                Status
              </th>
              <th className="px-4 py-3 text-left text-[#637488] text-sm font-medium w-[150px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {resource.length > 0 ? (
              resource.map((item, index) => (
                <tr key={index} className="border-t border-t-[#dce0e5]">
                  <td className="px-4 py-2 text-sm text-[#111418]">
                    {item.template_id}
                  </td>
                  <td className="px-4 py-2 text-sm text-[#637488]">
                    {item.entity_id}
                  </td>
                  <td className="px-4 py-2 text-sm text-[#637488]">
                    {item.sender_id}
                  </td>
                  <td className="px-4 py-2 text-sm text-[#637488]">
                    {item.template_content}
                  </td>
                  <td className="px-4 py-2 text-sm text-center">
                    <span
                      className={`inline-block rounded-full px-4 py-1 text-white text-sm ${
                        item.template_status === "pending"
                          ? "bg-yellow-400"
                          : item.template_status === "success"
                          ? "bg-green-500"
                          : item.template_status === "failed"
                          ? "bg-red-500"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {item.template_status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm font-bold text-[#637488]">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditData({
                            id: item.id,
                            template_id: item.template_id,
                            entity_id: item.entity_id,
                            sender_id: item.sender_id,
                            template_content: item.template_content,
                            template_status: item.template_status,
                          });
                          setShowEditModal(true);
                        }}
                      >
                        <FilePenLine className="text-blue-700" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(item.id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash2 className="text-red-800" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No template data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetTemplate;
