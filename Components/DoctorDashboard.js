"use client"
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from 'next/image';
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
      <div className="h-auto w-full font-bold">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <Link href="/Doctor/Hom" className="text-2xl font-bold">
              <Image src="/LOGO.jpg" alt="LOGO" width={80} height={80} className="rounded-full" />
            </Link>
            <div className="hidden md:flex gap-10 effect">
              <Link href="/VideoConsultation">Video Consultation</Link>
            </div>
            <div className="relative inline-block">
              <button className="rounded-full overflow-hidden" onClick={toggleDropdown}>
                <img src="/Profile.png" alt="Doctor_name" height={80} width={80} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
                  <ul>
                    <li className="list effect">
                      <Link href="/Doctor/ViewProfile">View Profile</Link>
                    </li>
                    <li className="list effect">
                      <Link href="/Doctor/UpdateProfile">Update Profile</Link>
                    </li>
                    <li className="list effect">
                      <button onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden mt-4">
            <div className="flex flex-col gap-2">
              <Link href="/FindDoctor">Find Doctor</Link>
              <Link href="/VideoConsultation">Video Consultation</Link>
              <Link href="/Medicines">Medicines</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
