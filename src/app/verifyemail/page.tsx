"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/verifyemail", { token });
      toast.success(response?.data?.message);
      setVerified(true);
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
  useEffect(() => {
    if (token?.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Verify Email"}</h1>
      <hr />

      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
    </div>
  );
};
export default VerifyEmail;
