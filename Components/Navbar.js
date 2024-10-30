'use client'
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SessionContext } from "./SessionContextProvider";
import { FaUser, FaEdit, FaClock, FaSignOutAlt, FaHome, FaCalendar, FaSearch, FaStethoscope } from "react-icons/fa";

import "./Navbar.css";

const Navbar = ({ UserMode }) => {
  const p = usePathname();
  const { setAuthState } = useContext(SessionContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const r = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const logoutP = () => {
    axios.get("http://localhost:8080/patient/logout", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((response) => {
      if (response.data === "user logout") {
        localStorage.removeItem('userMode');
        setAuthState({ USER_MODE: "" });
        document.cookie = "USER_MODE=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.error("Logout error:", error);
      alert("Error during logout. Please try again.");
    });
  };

  const logoutD = () => {
    axios.get("http://localhost:8080/doctor/logout", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((response) => {
      if (response.data === "user logout") {
        localStorage.removeItem('userMode');
        setAuthState({ USER_MODE: "" });
        r.replace("/");
      }
    });
  };

  const renderDropdownContent = () => {
    if (UserMode === "PATIENT") {
      return (
        <div className="p-3 space-y-1">
          <Link 
            href="/Patient/Hom"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <FaHome className="text-blue-600" />
            <span className="text-gray-700 font-medium">Dashboard</span>
          </Link>
          
          <Link 
            href="/Patient/ViewProfile"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <FaUser className="text-blue-600" />
            <span className="text-gray-700 font-medium">View Profile</span>
          </Link>

          <Link 
            href="/Patient/UpdateProfile"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <FaEdit className="text-blue-600" />
            <span className="text-gray-700 font-medium">Update Profile</span>
          </Link>

          <Link 
            href="/Patient/MyAppointment"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <FaCalendar className="text-blue-600" />
            <span className="text-gray-700 font-medium">My Appointments</span>
          </Link>

          <hr className="my-2 border-gray-200" />
          
          <button 
            onClick={logoutP}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors duration-200 w-full text-left"
          >
            <FaSignOutAlt className="text-red-600" />
            <span className="text-red-600 font-medium">Logout</span>
          </button>
        </div>
      );
    } else if (UserMode === "DOCTOR") {
      return (
        <div className="p-3 space-y-1">
          <Link 
            href="/Doctor/Hom"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <FaHome className="text-blue-600" />
            <span className="text-gray-700 font-medium">Dashboard</span>
          </Link>
          
          <Link 
            href="/Doctor/ViewProfile"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <FaUser className="text-blue-600" />
            <span className="text-gray-700 font-medium">View Profile</span>
          </Link>

          <Link 
            href="/Doctor/UpdateProfile"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <FaEdit className="text-blue-600" />
            <span className="text-gray-700 font-medium">Update Profile</span>
          </Link>

          <Link 
            href="/Doctor/UpdateSlot"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <FaClock className="text-blue-600" />
            <span className="text-gray-700 font-medium">Update Slots</span>
          </Link>

          <hr className="my-2 border-gray-200" />
          
          <button 
            onClick={logoutD}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors duration-200 w-full text-left"
          >
            <FaSignOutAlt className="text-red-600" />
            <span className="text-red-600 font-medium">Logout</span>
          </button>
        </div>
      );
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src="/LOGO.png" 
              alt="LOGO" 
              width={50} 
              height={50} 
              className="rounded-full transition-transform hover:scale-105"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              MediConnect
            </span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link 
              href="/FindDoctor" 
              className={`nav-link relative ${p === "/FindDoctor" ? "active" : ""}`}
            >
              Find Doctor
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform origin-left hover:scale-x-100"/>
            </Link>

            <Link 
              href="/VideoConsultation" 
              className={`nav-link relative ${p === "/VideoConsultation" ? "active" : ""}`}
            >
              Video Consultation
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform origin-left hover:scale-x-100"/>
            </Link>

            {!UserMode || UserMode === "DEFAULT" ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/Login"
                  className="px-6 py-2 rounded-full text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  Login
                </Link>
                <div className="flex space-x-2">
                  <Link 
                    href="/Patient/Signup"
                    className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
                  >
                    Patient Signup
                  </Link>
                  <Link 
                    href="/Doctor/Signup"
                    className="px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300"
                  >
                    Doctor Signup
                  </Link>
                </div>
              </div>
            ) : (
              <div className="relative dropdown-container">
                <button
                  className="rounded-full overflow-hidden transform transition-transform hover:scale-110 focus:outline-none ring-2 ring-blue-400 hover:ring-blue-500"
                  onClick={toggleDropdown}
                >
                  <Image
                    src="/Profile.png"
                    alt="Patient"
                    width={45}
                    height={45}
                    className="object-cover"
                  />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100">
                    <div className="p-3 space-y-1">
                      <Link 
                        href="/Patient/Hom"
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                      >
                        <FaHome className="text-blue-600" />
                        <span className="text-gray-700 font-medium">Home</span>
                      </Link>

                      <Link 
                        href="/Patient/ViewProfile"
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                      >
                        <FaUser className="text-blue-600" />
                        <span className="text-gray-700 font-medium">View Profile</span>
                      </Link>

                      <Link 
                        href="/Patient/UpdateProfile"
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                      >
                        <FaEdit className="text-blue-600" />
                        <span className="text-gray-700 font-medium">Update Profile</span>
                      </Link>

                      <Link 
                        href="/Patient/MyAppointment"
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                      >
                        <FaCalendar className="text-blue-600" />
                        <span className="text-gray-700 font-medium">My Appointments</span>
                      </Link>

                      <Link 
                        href="/FindDoctor"
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                      >
                        <FaSearch className="text-blue-600" />
                        <span className="text-gray-700 font-medium">Find Doctor</span>
                      </Link>

                      <Link 
                        href="/VideoConsultation"
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                      >
                        <FaStethoscope className="text-blue-600" />
                        <span className="text-gray-700 font-medium">Online Consultation</span>
                      </Link>

                      <hr className="my-2 border-gray-200" />
                      
                      <button 
                        onClick={logoutP}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors duration-200 w-full text-left"
                      >
                        <FaSignOutAlt className="text-red-600" />
                        <span className="text-red-600 font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
