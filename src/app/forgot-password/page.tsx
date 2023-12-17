"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const sendEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgot-password", {
        email,
      });
      toast.success(response?.data?.message);
      console.log(response.data);
      // router.push("/profile");
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      console.log(error?.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Forgot Password"}</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />

      <button
        onClick={sendEmail}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Send Mail
      </button>
      <Link href="/login">Back to Login</Link>
    </div>
  );
};
export default ForgotPassword;
