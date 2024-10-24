'use client'
import React, { useContext, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SessionContext } from "./SessionContextProvider";

import "./Navbar.css";

const Navbar = ({ UserMode }) => {
  const p = usePathname();
  const { setAuthState } = useContext(SessionContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const r = useRouter();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const logoutP = () => {
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
        setAuthState({ USER_MODE: "" });
      });
    r.replace("/");
  };

  const logoutD = () => {
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
    setAuthState({ USER_MODE: "" });
    r.replace("/");
  };

  return (
    <nav id="navbar" className="bg-white p-4 h-28 border-b-2 border-blue-200  z-10  w-full ">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="text-2xl text-black flex items-center">
          <Image src="/LOGO.png" alt="LOGO" width={70} height={70} className="rounded-full" />
        </Link>
        <div className="flex flex-row gap-10 items-center">
          <Link href="/FindDoctor" className={`nav-link ${p === "/FindDoctor" ? "active" : ""}`}>
            Find Doctor
          </Link>
          {UserMode === "DOCTOR" ? (
            <Link href="/RoomPage" className="nav-link">
              Join Room
            </Link>
          ) : (
            <Link href="/VideoConsultation" className={`nav-link ${p === "/VideoConsultation" ? "active" : ""}`}>
              Video Consultation
            </Link>
          )}
          {UserMode === "DOCTOR" || UserMode === "PATIENT" ? (
            <div className="relative inline-block">
              <button
                className="rounded-full overflow-hidden"
                onClick={toggleDropdown}
              >
                <Image
                  src="/Profile.png"
                  alt={UserMode === "DOCTOR" ? "Doctor_name" : "Patient"}
                  width={80}
                  height={80}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white border rounded-md shadow-lg z-100">
                  <ul>
                    {UserMode === "DOCTOR" && (
                      <>
                        <li className="effect">
                          <Link href="/Doctor/ViewProfile">View Profile</Link>
                        </li>
                        <li className="effect">
                          <Link href="/Doctor/UpdateProfile">Update Profile</Link>
                        </li>
                      </>
                    )}
                    {UserMode === "PATIENT" && (
                      <>
                        <li className="effect">
                          <Link href="/Patient/ViewProfile">View Profile</Link>
                        </li>
                        <li className="effect">
                          <Link href="/Patient/MyAppointment">My Appointment</Link>
                        </li>
                        <li className="effect">
                          <Link href="/Patient/UpdateProfile">Update Profile</Link>
                        </li>
                      </>
                    )}
                    <li className="list effect">
                      <button onClick={UserMode === "DOCTOR" ? logoutD : logoutP}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/Login"
              className="effect border-2 border-blue-400 py-1 px-2 border-gray bg-blue-200"
            >
              Login/Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
