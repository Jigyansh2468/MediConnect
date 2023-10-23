"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./PatientDashboard.css";
const PatientDashboard = (props) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const logout = () => {
    axios.post("");
  };
  return (
    <>
      <div id="navbar">
        <h2 className="">
          <Link href="/">LOGO</Link>
        </h2>
        <div className="gap-10 flex items-center px-40 text-center">
          <Link href="/FindDoctor">Find Doctor</Link>
          <Link href="/VideoConsultation">Video Consultation</Link>
          <Link href="/Medicines">Medicines</Link>
        </div>
        <div
          className="relative inline-block"
          onMouseLeave={() => {
            setDropdownOpen(false);
          }}
        >
          <button className="btn" onMouseEnter={toggleDropdown}>
            User_name
          </button>
          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg"
              style={{ zIndex: 1 }}
            >
              <li href="" className="list">
                <button>View Profile</button>
              </li>
              <li href="" className="list">
                <button>Medical Records</button>
              </li>
              <li href="" className="list">
                <button>My Cart</button>
              </li>
              <li href="" className="list">
                <button>Order History</button>
              </li>
              <li href="" className="list">
                <button>Settings</button>
              </li>
              <li href="" className="list">
                <button onClick={logout}>Logout</button>
              </li>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;

// Medical History
// remove med rec
