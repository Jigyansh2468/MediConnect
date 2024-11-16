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
          console.log(response.data.name);
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
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex flex-wrap gap-4 justify-center items-center w-full">
          <select
            name="searchBy"
            value={input.searchBy}
            onChange={onInputChange}
            className="px-6 py-3 rounded-full text-lg font-medium bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            required
          >
            <option value="">Search By</option>
            <option value="name">Name</option>
            <option value="city">City</option>
            <option value="specialization">Specialization</option>
          </select>

          <div className="relative flex-1 max-w-xl">
            <input
              placeholder="Type to Search..."
              name="value"
              value={input.value}
              onChange={onInputChange}
              className="w-full px-6 py-3 rounded-full text-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors pl-12"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
          </div>

          <button 
            onClick={search}
            className="px-6 py-3 rounded-full text-lg font-medium bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </div>

      <div className="results-container overflow-hidden">
        <div className="grid gap-4 px-4">
          {Results.map((result, i) => (
            <div 
              key={i} 
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="flex items-center gap-6 p-6">
                <img 
                  src="/Profile.png" 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-4 border-blue-100"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-blue-900">{result.name}</h3>
                  <p className="text-blue-600">{result.specialization}</p>
                  <p className="text-gray-600">{result.city}</p>
                </div>
                <button
                  onClick={() => {
                    setdoctor(result);
                    setbookapt(true);
                  }}
                  className="px-6 py-3 rounded-full font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
          {Results.length === 0 && nodoc && (
            <div className="text-center py-8 text-gray-600 text-lg">
              No doctors found matching your search criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
