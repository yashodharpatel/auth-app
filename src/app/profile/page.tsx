"use client";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";
import React, {useEffect, useState} from 'react'

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [id, setId] = useState("");
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

    const getUserDetails = async () => {
        const response = await axios.get('/api/users/userinfo');
        console.log(response?.data);
        setUser(response?.data);
        setId(response?.data?._id);
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl">Profile</h1>
            <p>Profile page</p>
            <h2>{user && <Link href={`/profile/${id}`} >My Profile</Link>}</h2>
            <button onClick={logout} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">Logout</button>
        </div>
    )
}
export default Profile
