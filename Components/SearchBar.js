"use client";
import React, { useState, useEffect } from "react";
import gsap from "gsap";
import axios from "axios";
import "./Searchbar.css";
import { FaSearch } from "react-icons/fa";
import { Result } from "postcss";

const Searchbar = ({ setResults, clearResults }) => {
  const [input, setInput] = useState({
    searchBy: "",
    value: "",
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    clearResults();
  };
  let render = null;
  const [torender, settorender] = useState(false);
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
          if (Result.length === 0) {
            return render = <div>No Doctors Found</div>;
          } else {
            settorender(true);
            render = Result.map((result, i) => (
              <div key={i} className=" bg-purple-100 rounded-lg font-semibold my-4">
                <div className="flex justify-between  items-center p-5 gap-40">
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
              </div >
            ));
          }
        })
        .catch((error) => console.log(error));
    }
    setInput({ ...input, value: "" });
  };
  useEffect(() => {
    animateResults();
  }, [Result]);
  const animateResults = () => {
    const tl = gsap.timeline();
    tl.set(".results-container", { autoAlpha: 0 });
    tl.to(".results-container", {
      duration: 0.5,
      autoAlpha: 1,
      y: 0,
      ease: "power1.inOut",
    });
    tl.play();
  };
  return (
    <>
      <div className="flex justify-center items-center gap-5">
        <select
          name="searchBy"
          value={input.searchBy}
          onChange={onInputChange}
          className="my-5 p-2 rounded-md border-x-4 border-y-2  font-semibold border-purple-400 "
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
          <button onClick={search} className="font-semibold">Search</button>
        </div>
        
        <div className="p-4 bg-white flex justify-center items-center">
          <div className="results-container">
            <ul className="font-bold text-xl bg-gray w-screen px-10 text-center">{render}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
