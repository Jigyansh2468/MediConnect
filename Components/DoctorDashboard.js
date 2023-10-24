"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./PatientDashboard.css";
const DoctorDashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <div id="navbar">
        <h2 className="">
          <Link href="/">LOGO</Link>
        </h2>
        <div className="gap-10 flex items-center px-40 text-center">
          <Link href="/pages/FindDoctor">Find Doctor</Link>
          <Link href="/pages/VideoConsultation">Video Consultation</Link>
          <Link href="/pages/Medicines">Medicines</Link>
        </div>
        <div className="relative inline-block">
          <button className="btn" onClick={toggleDropdown}>
            Doctor_name
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
              <li className="list">
                <Link href="/pages/Doctor/ViewProfile">View Profile</Link>
              </li>
              <li className="list">
                <button>Medical Records</button>
              </li>
              <li className="list">
                <button>My Cart</button>
              </li>
              <li className="list">
                <button>Order History</button>
              </li>
              <li className="list">
                <button>Settings</button>
              </li>
              <li className="list">
                <button>Logout</button>
              </li>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
