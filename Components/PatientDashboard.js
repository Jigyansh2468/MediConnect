"use client"
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from 'next/image';
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
          console.log("Patient logout");
        }
      });
    r.replace("/");
  };
  return (
    <div className="h-auto w-full font-bold">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            <Image src="/LOGO.jpg" alt="LOGO" width={80} height={80} className="rounded-full" />
          </h2>
          <div className="hidden md:flex gap-10 text-xl">
            <Link href="/pages/FindDoctor" className="effect">Find Doctor</Link>
            <Link href="/pages/VideoConsultation" className="effect">Video Consultation</Link>
            <Link href="/pages/Medicines" className="effect">Medicines</Link>
          </div>
          <div className="relative inline-block">
            <button className="rounded-full overflow-hidden" onClick={toggleDropdown}>
              <img src="/Profile.png" alt="Patient" height={80} width={80} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                <ul>
                  <li>
                    <Link href="/pages/Patient/ViewProfile" className="effect">View Profile</Link>
                  </li>
                  <li>
                    <Link href="/pages/Patient/MyAppointment" className="effect">My Appointment</Link>
                  </li>
                  <li className="effect">
                    <button>My Cart</button>
                  </li>
                  <li className="effect">
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