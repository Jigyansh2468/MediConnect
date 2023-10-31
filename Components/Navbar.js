"use client"

import React from "react";
import Link from "next/link";

import "./Navbar.css"

const Navbar = () => {
  return (
    <div id="navbar" className="p-4 h-auto ">
      <div className="container mx-auto flex flex-wrap items-center justify-between ">
        <h2 className="text-2xl text-black">
          <Link href="/" >LOGO</Link>
        </h2>
        <div className="flex flex-row gap-10">
          <Link href="/pages/FindDoctor" className="effect">Find Doctor</Link>
          <Link href="/pages/VideoConsultation" className="effect">Video Consultation</Link>
          <Link href="/pages/Medicines" className="effect">Medicines</Link>
          <Link href="/pages/Login" className="effect">Login/Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
