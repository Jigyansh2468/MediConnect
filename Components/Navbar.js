"use client"

import React, { useState } from "react";
import Link from "next/link";
import "./Navbar.css"

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div id="navbar" className="p-4 h-auto ">
      <div className="container mx-auto flex flex-wrap items-center justify-between ">
        <h2 className="text-2xl text-black">
          <Link href="/" >LOGO</Link>
        </h2>
        <div className="sm:hidden">
          <button className="btn" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          {menuOpen && (
            <div >
              <ul>
                <li>
                  <Link href="/pages/FindDoctor">Find Doctor</Link>
                </li>
                <li>
                  <Link href="/pages/VideoConsultation">Video Consultation</Link>
                </li>
                <li>
                  <Link href="/pages/Medicines">Medicines</Link>
                </li>
                <li>
                  <Link href="/pages/Login">Login/Signup</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="hidden sm:flex gap-20 text-center">
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
