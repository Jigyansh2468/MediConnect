"use client"
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./DoctorDashboard.css"
const DoctorDashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const r = useRouter();
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const logout = () => {
    axios
      .get("http://localhost:8080/doctor/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data === "user logout") {
          console.log("Doctor logout");
        }
      });
    r.replace("/");
  };
  return (
    <>
      <div className="bg-purple-100 text-purple-900 h-auto w-full font-bold"> {/* Change background and text colors */}
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              <Link href="/">LOGO</Link>
            </h2>
            <div className="hidden md:flex gap-10">
              <Link href="/pages/VideoConsultation">Video Consultation</Link>
            </div>
            <div className="relative inline-block">
              <button className="rounded-full overflow-hidden" onClick={toggleDropdown}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQabPnL65PJtnyc3OgCKevPT-1eIOWDjC_f86xZ2x9qB81e9NKK25pkKjg_IKJWeEKt__g&usqp=CAU" alt="Doctor_name" height={80} width={80} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                  <ul>
                    <li className="list">
                      <Link href="/pages/Doctor/ViewProfile">View Profile</Link>
                    </li>
                    <li className="list">
                      <Link href="/pages/Doctor/UpdateProfile">Update Profile</Link>
                    </li>
                    <li className="list">
                      <button onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden mt-4">
            <div className="flex flex-col gap-2">
              <Link href="/pages/FindDoctor">Find Doctor</Link>
              <Link href="/pages/VideoConsultation">Video Consultation</Link>
              <Link href="/pages/Medicines">Medicines</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
