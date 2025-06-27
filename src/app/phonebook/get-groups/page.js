"use client";

import React, { useEffect, useState } from "react";
import api from "@/app/utils/api";

import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const GetGroups = () => {
  const [resource, setResource] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSubmit = async () => {
    setError("");

    try {
      const response = await api.get(`/dlt/groups`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      setResource(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch Groups data.");
    }
  };

  const handleCreateGroup = async () => {
    try {
      const formData = new FormData();
      // Nest parameters under "Group"
      formData.append("group[name]", groupName);

      const response = await api.post("/dlt/groups", formData, {
        headers: {
          // Content-Type is set automatically by FormData
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      // setSuccess("Group created successfully!");
      toast.success("Group Created Successfully");
      setShowModal(false);
      handleSubmit();
      // Reset form
      setGroupName("");
    } catch (error) {
      toast.error("Error while creating group");
      console.error("Error while creating Group:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.errors?.ueid?.[0] ||
        "Failed to create Group. Please check your input and try again.";
      setError(errorMessage);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/dlt/groups/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      toast.success("Group deleted successfully.");
      setResource((prev) => prev.filter((item) => item.id !== id));
      setShowDeleteModal(false);
    } catch (err) {
      toast.error("Error deleting group.");
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="px-4 py-3">
      <h1 className="text-3xl font-bold">Groups Approvals</h1>
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
            <h2 className="text-lg font-bold text-red-600 mb-4">
              Delete Group?
            </h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this group? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(selectedId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
            <h2 className="text-lg font-bold mb-4">Create New Group</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  handleCreateGroup();
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-base text-gray-500 mt-2">
        Manage your Groups approvals for DLT SMS service.
      </p>
      <div className="search_create flex w-full justify-around mt-4">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search Groups Name"
          className=" px-4 py-2 border-gray-400 rounded-xl w-3/6 border-1 focus:outline-1 focus:outline-blue-600"
        />
        <button className="px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
          Search
        </button>
        <a href="phonebook/get-contacts/create-contacts">
          <button className="px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
            ADD CONTACTS
          </button>
        </a>

        <button
          className="px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
          onClick={() => {
            setShowModal(true);
          }}
        >
          ADD Groups
        </button>
      </div>
      <div className="flex overflow-hidden rounded-xl border border-[#dce0e5] bg-white mt-5">
        <table className="flex-1">
          <thead>
            <tr className="bg-white">
              <th className="table-column-360 px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                Groups Name
              </th>
              <th className="table-column-240 px-4 py-3 text-left text-[#111418] w-60 text-sm font-medium leading-normal">
                No. Of Contacts
              </th>

              <th className=" text-left  py-3  text-[#111418]  text-sm font-medium leading-normal">
                Inserted At
              </th>
              <th className="table-column-720 px-4 py-3 text-left  w-60 text-[#637488] text-sm font-medium leading-normal">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {resource.length > 0 ? (
              resource.map((item, index) => (
                <tr key={index} className="border-t border-t-[#dce0e5]">
                  <td className="table-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                    {item.name}
                  </td>

                  <td className="table-column-360 h-[72px] px-4 py-2 w-[400px] text-[#637488] text-sm font-normal leading-normal">
                    {item.Groups_name || "20"}
                  </td>
                  <td className="table-column-480 h-[72px] px-4 py-2 w-[400px] text-[#637488] text-sm font-normal leading-normal">
                    {item.inserted_at}
                  </td>

                  <td className="table-column-720 h-[72px] px-4 py-2 w-60 text-[#637488] text-sm font-bold leading-normal tracking-[0.015em]">
                    <div className="flex gap-2">
                      {/* Add Edit here if needed */}
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
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        @container (max-width: 120px) {
          .table-column-120 {
            display: none;
          }
        }
        @container (max-width: 240px) {
          .table-column-240 {
            display: none;
          }
        }
        @container (max-width: 360px) {
          .table-column-360 {
            display: none;
          }
        }
        @container (max-width: 480px) {
          .table-column-480 {
            display: none;
          }
        }
        @container (max-width: 600px) {
          .table-column-600 {
            display: none;
          }
        }
        @container (max-width: 720px) {
          .table-column-720 {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default GetGroups;
