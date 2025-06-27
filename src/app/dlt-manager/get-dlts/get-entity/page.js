"use client";

import React, { useEffect, useState } from "react";
import api from "@/app/utils/api";
import { FilePenLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const GetEntity = () => {
  const [resource, setResource] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editData, setEditData] = useState({
    id: "",
    ueid: "",
    entity_name: "",
    entity_type: "",
    telecom_operator: "",
  });

  const payload = {
    id: editData.id,
    entity: {
      ueid: editData.ueid,
      entity_name: editData.entity_name,
      entity_type: editData.entity_type,
      telecom_operator: editData.telecom_operator,
    },
  };

  const handleSubmit = async () => {
    setError("");

    try {
      const response = await api.get(`/dlt/entities`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      toast.success("Entities Fetch Successfully");
      setResource(response.data.data);
    } catch (error) {
      toast.error("Error while fetching Entity");
      console.error(error);
      setError("Failed to fetch entity data.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/dlt/entities/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      console.log(response.data);
      toast.success("Entity Deleted Successfully");

      setShowModal(false);

      // ✅ Remove the deleted entity from the UI
      setResource((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error("Error while deleting entity");
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      const response = await api.put(`/dlt/entities/${id}`, payload, {
        headers: {
          // Content-Type is set automatically by FormData
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      toast.success("Entity Updated Successfully");
      setShowEditModal(false);
      setEditData({});
      handleSubmit();
    } catch (error) {
      toast.error("Error while updating data");
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="px-4 py-3">
      <h1 className="text-3xl font-bold">Entity Approvals</h1>
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[500px] shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              Update Entity
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editData.id, editData);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Entity ID
                </label>
                <input
                  type="text"
                  value={editData.ueid}
                  readOnly
                  placeholder={editData.ueid}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Entity Name
                </label>
                <input
                  type="text"
                  value={editData.entity_name}
                  onChange={(e) =>
                    setEditData({ ...editData, entity_name: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Entity Type
                </label>
                <input
                  type="text"
                  value={editData.entity_type}
                  onChange={(e) =>
                    setEditData({ ...editData, entity_type: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Telecom Operator
                </label>
                <select
                  value={editData.verification_status}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      verification_status: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="" disabled>
                    Select Telecom Operator
                  </option>
                  <option value="airtel">Airtel</option>
                  <option value="vi">Vodafone-Idea</option>
                  <option value="jio">JIO</option>
                </select>
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-red-600">
              Delete Entity?
            </h2>
            <p className="text-gray-700 mb-4">
              Deleting this entity will also delete all its associated senders
              and templates. Are you sure?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-300 text-gray-800"
                onClick={() => {
                  setShowModal(false);
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
        Manage your entity approvals for DLT SMS service.
      </p>
      <div className="search_create flex w-full justify-around mt-4">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search Entity Name"
          className=" px-4 py-2 border-gray-400 rounded-xl w-3/5 border-1 focus:outline-1 focus:outline-blue-600"
        />
        <button className="px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
          Search
        </button>
        <a href="/dlt-manager/create-dlts">
          <button className="px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
            Create Entity
          </button>
        </a>
      </div>
      <div className="flex overflow-hidden rounded-xl border border-[#dce0e5] bg-white mt-5">
        <table className="flex-1">
          <thead>
            <tr className="bg-white">
              <th className="table-column-120 px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                Entity ID
              </th>
              <th className="table-column-360 px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                Entity Name
              </th>
              <th className="table-column-240 px-4 py-3 text-left text-[#111418] w-60 text-sm font-medium leading-normal">
                Entity Type
              </th>

              <th className="table-column-480 text-center py-3  text-[#111418] w-[400px] text-sm font-medium leading-normal">
                Status
              </th>
              {/* <th className="table-column-600 px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                Operator
              </th> */}
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
                    {item.ueid}
                  </td>

                  <td className="table-column-360 h-[72px] px-4 py-2 w-[400px] text-[#637488] text-sm font-normal leading-normal">
                    {item.entity_name}
                  </td>
                  <td className="table-column-480 h-[72px] px-4 py-2 w-[400px] text-[#637488] text-sm font-normal leading-normal">
                    {item.entity_type}
                  </td>
                  <td className="table-column-240 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                    {/* <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f4] text-[#111418] text-sm fon t-medium leading-normal w-full">
                      <span className="truncate">
                        {item.verification_status}
                      </span>
                    </button> */}

                    <button
                      className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 w-full
                              ${
                                item.verification_status === "pending"
                                  ? "bg-yellow-400 text-white"
                                  : item.verification_status === "success"
                                  ? "bg-green-500 text-white"
                                  : item.verification_status === "failed"
                                  ? "bg-red-500 text-white"
                                  : "bg-gray-200 text-black"
                              }
                          `}
                    >
                      <span className="truncate">
                        {item.verification_status}
                      </span>
                    </button>
                  </td>

                  {/* <td className="table-column-600 h-[72px] px-8 py-2 w-[400px] text-[#637488] text-sm font-normal leading-normal ">
                    {item.telecom_operator}
                  </td> */}
                  <td className="table-column-720 h-[72px] px-4 py-2 w-60 text-[#637488] text-sm font-bold leading-normal tracking-[0.015em] ">
                    <div className="flex gap-2">
                      <button>
                        <FilePenLine
                          className="text-blue-700"
                          onClick={() => {
                            setEditData({
                              id: item.id,
                              ueid: item.ueid,
                              entity_name: item.entity_name,
                              entity_type: item.entity_type,
                              telecom_operator: item.telecom_operator,
                            });
                            setShowEditModal(true);
                          }}
                        />
                      </button>
                      <button>
                        <Trash2
                          className="text-red-800"
                          onClick={() => {
                            setSelectedId(item.id);
                            setShowModal(true);
                          }}
                        />
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

export default GetEntity;
