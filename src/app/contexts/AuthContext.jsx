// app/components/AuthContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [logedInUser, setLogedInUser] = useState(null);
  const [userType, setUserType] = useState(true) // true for CLIENT USERS and flase for VENDOR USERS
  const [loading, setLoading] = useState(true);

  // Check if user was logged in before (on page load/refresh)
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const res = await fetch("https://eevents-srvx.onrender.com/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const userData = await res.json();
        console.log(userData.data.role[0])
        if (userData?.data?.role[0]==="CLIENT"){
          setLogedInUser(userData); // assuming /api/me returns { id, name, email, avatar }
        } 
        if (userData?.data?.role[0]==="VENDOR") {
          try {
            const vendorRes = await fetch("https://eevents-srvx.onrender.com/v1/vendors/me", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const vendorData = await vendorRes.json();
            setUserType(false)
            setLogedInUser(vendorData);
          } catch (err) {
            console.error("Failed to fetch vendor data", err);
          }
        }
        
        console.log(userData, userType)
      } else {
        logout(); // token invalid/expired
      }
    } catch (err) {
      console.error("Failed to fetch user", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (user, password) => {
    try {
      const loginRes = await fetch("https://eevents-srvx.onrender.com/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });

      if (!loginRes.ok) throw new Error("Login failed");

      const { data } = await loginRes.json();
      const { accessToken, refreshToken } = data;
      console.log(data)
      // Save tokens
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      // Now get user profile
      await fetchUserProfile(accessToken);

    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  const logout = () => {
    setLogedInUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // Optional: call backend logout if needed
  };

  return (
    <AuthContext.Provider value={{ logedInUser, login, logout, loading, userType }}>
      {loading ? <span>loading ...</span> : children }
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);