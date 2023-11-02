"use client"
import React, { useContext, useState } from "react";
import axios from "axios";
import "./PatientDashboard.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { SessionContext } from "./SessionContextProvider";

const PatientDashboard = () => {
  const { setAuthState } = useContext(SessionContext)
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
        setAuthState({ LOGGED_IN: false, USER_MODE: "" })
      });
    r.replace("/");
  };
  return (
    <div className="h-auto w-full font-bold">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            <Image src="/LOGO.png" alt="LOGO" width={250} height={200} className="rounded-full" />
          </Link>
          <div className="hidden md:flex gap-10 text-xl">
            <Link href="/FindDoctor" className="effect">Find Doctor</Link>
            <Link href="/VideoConsultation" className="effect">Video Consultation</Link>
            <Link href="/Medicines" className="effect">Medicines</Link>
          </div>
          <div className="relative inline-block">
            <button className="rounded-full overflow-hidden" onClick={toggleDropdown}>
              <img src="/Profile.png" alt="Patient" height={80} width={80} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                <ul>
                  <li className="effect">
                    <Link href="/Patient/ViewProfile">View Profile</Link>
                  </li>
                  <li className="effect">
                    <Link href="/Patient/MyAppointment" >My Appointment</Link>
                  </li>
                  <li className="effect">
                    <button>My Cart</button>
                  </li>
                  <li className="effect">
                    <button>Order History</button>
                  </li>
                  <li className="effect">
                    <Link href="/Patient/UpdateProfile">Update Profile</Link>
                  </li>
                  <li className="effect">
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
            <Link href="/FindDoctor">Find Doctor</Link>
            <Link href="/VideoConsultation">Video Consultation</Link>
            <Link href="/Medicines">Medicines</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;