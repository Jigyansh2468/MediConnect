import React from "react";
import Link from "next/link";
import Image from 'next/image';

import "./Navbar.css";
import DoctorDashboard from "./DoctorDashboard";
import PatientDashboard from "./PatientDashboard";

const Navbar = ({ UserMode }) => {
  return (
    <>
      {UserMode === "DOCTOR" ? (
        <DoctorDashboard />
      ) : UserMode === "PATIENT" ? (
        <PatientDashboard />
      ) : (
        <div id="navbar" className="p-4 h-auto border-b-2 border-purple-200">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <Link href="/" className="text-2xl text-black">
              <Image src="/LOGO.jpg" alt="LOGO" width={80} height={80} className="rounded-full" />
            </Link>
            <div className="flex flex-row gap-10">
              <Link href="/pages/FindDoctor" className="effect">
                Find Doctor
              </Link>
              <Link href="/pages/VideoConsultation" className="effect">
                Video Consultation
              </Link>
              <Link href="/pages/Medicines" className="effect">
                Medicines
              </Link>
              <Link href="/pages/Login" className="effect border-1 border-gray">
                Login/Signup
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
