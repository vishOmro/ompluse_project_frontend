"use client";
import React, { useEffect, useState } from "react";
import api from "@/app/utils/api";

const CompanyDashboard = () => {
  const [company, setCompany] = useState(null);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ user_name: "", password: "" });
  const [credits, setCredits] = useState({});
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  // Ensure localStorage access happens only on the client
  useEffect(() => {
    const storedToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : "";
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    console.log(token);
    if (token) {
      fetchDashboard();
    }
  }, [token]);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/company_dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      setCompany(response.data.company);
      setUsers(response.data.users);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch dashboard data");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `/companies/${company.id}/users`,
        { user: newUser },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers([...users, response.data.data]);
      setNewUser({ user_name: "", password: "" });
      setError("");
    } catch (err) {
      setError(err.response?.data?.errors || "Failed to add user");
    }
  };

  const handleAssignCredits = async (userId) => {
    const creditsValue = parseFloat(credits[userId] || 0);
    if (creditsValue <= 0) {
      setError("Credits must be positive");
      return;
    }
    try {
      const response = await api.post(
        `/companies/${company.id}/users/${userId}/credits`,
        { credits: creditsValue },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(
        users.map((u) =>
          u.id === userId ? { ...u, credits: response.data.data.credits } : u
        )
      );
      setCredits({ ...credits, [userId]: "" });
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to assign credits");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/companies/${company.id}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u.id !== userId));
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete user");
    }
  };

  if (!token || !company) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Company Dashboard - {company.company_name}
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add New User</h2>
        <form onSubmit={handleAddUser} className="flex space-x-2">
          <input
            type="text"
            placeholder="Username"
            value={newUser.user_name}
            onChange={(e) =>
              setNewUser({ ...newUser, user_name: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add User
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Username</th>
              <th className="py-2 px-4 border">Credits</th>
              <th className="py-2 px-4 border">Credits Used</th>
              <th className="py-2 px-4 border">Entities</th>
              <th className="py-2 px-4 border">Senders</th>
              <th className="py-2 px-4 border">Templates</th>
              <th className="py-2 px-4 border">Campaigns</th>
              <th className="py-2 px-4 border">Assign Credits</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border">{user.user_name}</td>
                <td className="py-2 px-4 border">{user.credits.toFixed(2)}</td>
                <td className="py-2 px-4 border">
                  {user.credits_used.toFixed(2)}
                </td>
                <td className="py-2 px-4 border">{user.entities_count}</td>
                <td className="py-2 px-4 border">{user.senders_count}</td>
                <td className="py-2 px-4 border">{user.templates_count}</td>
                <td className="py-2 px-4 border">{user.campaigns_count}</td>
                <td className="py-2 px-4 border">
                  <input
                    type="number"
                    placeholder="Credits"
                    value={credits[user.id] || ""}
                    onChange={(e) =>
                      setCredits({ ...credits, [user.id]: e.target.value })
                    }
                    className="border p-1 rounded w-20"
                    min="0"
                    step="0.1"
                  />
                  <button
                    onClick={() => handleAssignCredits(user.id)}
                    className="bg-green-500 text-white p-1 ml-2 rounded hover:bg-green-600"
                  >
                    Assign
                  </button>
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyDashboard;
