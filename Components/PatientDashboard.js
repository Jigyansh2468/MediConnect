"use client"
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./PatientDashboard.css";

const PatientDashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const r = useRouter();
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    axios
      .get("http://localhost:8080/patient/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data === "user logout") {
          alert("Patient logout");
        }
      });
    r.replace("/");
  };
  return (
    <div className="bg-blue-100 text-blue-900 h-auto w-full">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            <Link href="/pages/Patient/Hom">LOGO</Link>
          </h2>
          <div className="hidden md:flex gap-10">
            <Link href="/pages/FindDoctor">Find Doctor</Link>
            <Link href="/pages/VideoConsultation">Video Consultation</Link>
            <Link href="/pages/Medicines">Medicines</Link>
          </div>
          <div className="relative inline-block">
            <button className="rounded-full overflow-hidden" onClick={toggleDropdown}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQabPnL65PJtnyc3OgCKevPT-1eIOWDjC_f86xZ2x9qB81e9NKK25pkKjg_IKJWeEKt__g&usqp=CAU" alt="Patient" height={80} width={80} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                <ul>
                  <li>
                    <Link href="/pages/Patient/ViewProfile">View Profile</Link>
                  </li>
                  <li>
                    <Link href="/pages/Patient/MyAppointment">My Appointment</Link>
                  </li>
                  <li>
                    <button>My Cart</button>
                  </li>
                  <li>
                    <button>Order History</button>
                  </li>
                  <li>
                    <Link href="/pages/Patient/UpdateProfile">Update Profile</Link>
                  </li>
                  <li>
                    <button onClick={logout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* For mobile view, show navigation links in a responsive menu */}
        <div className="md:hidden mt-4">
          <div className="flex flex-col gap-2">
            <Link href="/pages/FindDoctor">Find Doctor</Link>
            <Link href="/pages/VideoConsultation">Video Consultation</Link>
            <Link href="/pages/Medicines">Medicines</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
