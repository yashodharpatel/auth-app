"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  // const [verified, setVerified] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const resetPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/reset-password", {
        token,
        password,
      });
      toast.success(response?.data?.message);
      // setVerified(true);
      console.log(response.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      console.log(error?.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Reset Password"}</h1>
      <hr />

      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />

      <button
        onClick={resetPassword}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Reset Password
      </button>
    </div>
  );
};
export default ResetPassword;
