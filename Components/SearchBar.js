"use client";
import React, { useState, useEffect } from "react";
import gsap from "gsap";
import axios from "axios";
import "./Searchbar.css";
import { FaSearch } from "react-icons/fa";
import Image from 'next/image'

const Searchbar = ({ setdoctor, setbookapt }) => {
  const [Results, setResults] = useState([]);
  const [input, setInput] = useState({
    searchBy: "",
    value: "",
  });
  const clearResults = () => {
    setResults([]);
    setbookapt(false);
  };
  const [nodoc, setnodoc] = useState(false);
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    clearResults();
  };
  const search = () => {
    if (input.searchBy && input.value) {
      axios
        .get("http://localhost:8080/doctor/getdoctorby", {
          params: { searchBy: input.searchBy, value: input.value },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          setResults(response.data);
          if (Results.length === 0) {
            setnodoc(true);
          }
        })
        .catch((error) => console.log(error));
    }
    setInput({ ...input, value: "" });
  };
  useEffect(() => {
    animateResults();
  }, [Results]);
  const animateResults = () => {
    const tl = gsap.timeline();
    tl.set(".results-container", { autoAlpha: 0, maxHeight: 0 });
    tl.to(".results-container", {
      duration: 0.5,
      autoAlpha: 1,
      maxHeight: "200px",
      ease: "power1.inOut",
    });
    tl.play();
  };
  return (
    <>
      <div>
        <div className="h-60 w-full bg-transparent text-3xl font-bold text-center"></div>
        <div className="text-center text-4xl font-bold mb-16 text-white font-sans">Find and Book Doctor Now</div>
        <div className="flex justify-center items-center gap-5">
          <select
            name="searchBy"
            value={input.searchBy}
            onChange={onInputChange}
            className="my-5 p-4 rounded-full font-semibold border-white text-xl bg-purple-700 text-white"
            required
          >
            <option value="">Search By</option>
            <option value="name">Name</option>
            <option value="city">City</option>
            <option value="specialization">Specialization</option>
          </select>
          <div className="searchbox">
            <FaSearch id="search-icon" />
            <input
              placeholder="Type to Search..."
              name="value"
              value={input.value}
              onChange={onInputChange}
            />
          </div>
          <button onClick={search} className="font-semibold bg-whiten border-2 border-purple-600 bg-white rounded-full py-2 px-3 hover:py-4 hover:px-6">Search</button>
        </div>
        <div>
          <div className="p-4  flex justify-center items-center">
            <div className="results-container">
              <ul className="font-bold text-xl bg-gray w-screen px-10 text-center">
                {
                  Results.map((result, i) => (
                    <div key={i} className="bg-purple-200 rounded-lg font-semibold my-4">
                      <div className="flex justify-evenly items-center p-5 gap-40">
                        <Image src="/Profile.png" alt="Profile" height={100} width={100} className='rounded-full' />
                        <div>
                          <div className="text-2xl">{result.name}</div>
                          <div className="text-xl">{result.city}</div>
                        </div>
                        <div className="text-2xl">{result.specialization}</div>
                        <button onClick={() => {
                          setdoctor(result);
                          setbookapt(true);
                        }} className="bg-green-200 rounded-lg py-2 px-3 hover:bg-green-500 hover:text-white">
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  ))
                }{
                  Results.length === 0 && nodoc === true && (
                    <div>No Doctor Found</div>
                  )
                }
              </ul>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};

export default Searchbar;
