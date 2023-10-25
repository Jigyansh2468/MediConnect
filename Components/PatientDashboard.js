"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import "./PatientDashboard.css";
import p from "../images/profile.png";
import axios from "axios";

const PatientDashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

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
        if (response.data === "logout successfull") alert("Patient logout");
      });
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
            <img src={p} alt="Patient" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
              <li className="list">
                <Link href="/pages/Patient/ViewProfile">View Profile</Link>
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
