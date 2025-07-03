"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "./api";
import toast from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/dashboard");
        setUser(response.data.user);
      } catch (error) {
        toast.error("Error while fetching user");
      }
    };
    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
