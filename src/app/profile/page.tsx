"use client";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";
import React from 'react'

const Profile = () => {
    const router = useRouter();
    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            toast.success(response?.data?.message);
            console.log(response.data);
            router.push("/login");
        } catch (error: any) {
            toast.error(error?.response?.data?.error);
            console.log(error?.response);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl">Profile</h1>
            <p>Profile page</p>
            <button onClick={logout} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">Logout</button>
        </div>
    )
}
export default Profile
