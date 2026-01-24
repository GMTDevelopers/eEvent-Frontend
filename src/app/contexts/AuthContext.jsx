// app/components/AuthContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Loading from "../(components)/loading/loading";
import { getApiError } from "../(components)/error/error";
import { refresh } from "next/cache";

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

      const Data  = await loginRes.json();

      if (!loginRes.ok){
        throw{
          status: Data.status,
          code: Data.code ?? loginRes.status,
          message: Data.message,
          details: Data.data ?? null
        }
      }
      
      const { accessToken, refreshToken } = Data.data;
      // Save tokens
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      // Now get user profile
      await fetchUserProfile(accessToken);

      return{
        status: Data.status,
      }

    } catch (err) {
      console.log(err)
      throw{
        status: err.status,
        code: err.code ?? loginRes.status,
        message: err.message,
        details: err.data ?? null
      }
    }
  };


  const signUp = async (username, password, phone, email, middleName, firstName, lastName) => {

    try {
      const signUpRes = await fetch("https://eevents-srvx.onrender.com/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, phone, email, middleName, firstName, lastName}),
      });

      const data = await signUpRes.json();      
      // it is the error that is thrown here
      if (!signUpRes.ok) {
        throw {
          status: data.status,
          code: data.code ?? signUpRes.status,
          message: data.message,
          details: data.data ?? null
        };
      }
      console.log("Signup successful:", data);
     
      return{
        status: data.status,
        code: data.code ?? signUpRes.status,
        message: data.message,
        details: data.data ?? null
      }
    } catch (err) {
    // the error thrown above is caught here and passed to the front-end
      console.log("this is the catch error",err)
      throw{
        status: err.status,
        code: err.code,
        message: err.message,
        details: err.data ?? null
      };
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("access_token");
    try{
      const result = await fetch("https://eevents-srvx.onrender.com/v1/auth/logout", {
        method: "POST",
        headers:{
          Authorization: `Bearer ${token}`
        }
        
      });
      const data = await result.json()
      if (!result.ok){
        throw{
          status: data.status,
          message: data.message
        }
      }
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token")
      
      console.log(data.message)
    }catch(err){
      throw{
        status: err.status,
        message: err.message
      }
    }
     
    setLogedInUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  return (
    <AuthContext.Provider value={{ logedInUser, login, logout, loading, userType, signUp }}>
      {loading ? <Loading /> : children }
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);