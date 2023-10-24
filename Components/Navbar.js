"use client";
import React from "react";
import Link from "next/link";

import "./Navbar.css";
const Navbar = (props) => {
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
        <button className="btn">
          <Link href="/pages/Login">Login/Signup</Link>
        </button>
      </div>
    </>
  );
};
export default Navbar;
