"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Searchbar.css";
import { FaSearch } from "react-icons/fa";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const route = useRouter();
  const [doctorId, setdoctorId] = useState("");//PENDING send this data to BookAppointment page  
  const [results, setResults] = useState([]);
  const [input, setInput] = useState({
    searchBy: "",
    value: "",
  });

  useEffect(() => {
    animateResults();
  }, [results]);
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
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
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
        })
        .catch((error) => console.log(error));
    }
  };
  const renderResults = () => {
    if (results.length === 0) {
      return <div>No Doctors Found</div>;
    }
    return results.map((result, i) => (
      <div key={i} className="w-100 bg-white border-2 border-black rounded-lg font-semibold my-10">
        <div className="flex justify-between  items-center p-5 gap-40">
          <img src="" alt="Profile" height={100} width={100} />
          <div>
            <div className="text-2xl">{result.name}</div>
            <div className="text-xl">{result.city}</div>
          </div>
          <div className="text-2xl">{result.specialization}</div>
          <button onClick={() => {
            setdoctorId(result.id);
            route.push({
              pathname: "/pages/Patient/Bookappointment",
              query: { doctorId: result.id }, // Pass the doctorId as a query parameter
            });
          }} className="border-green-500 border-2 rounded-lg py-2 px-3 hover:bg-green-500 hover:text-white">
            Book Appointment
          </button>
        </div>
      </div >
    ));
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
      </div>
      <div className="p-10 bg-blue-100 flex justify-center items-center">
        <div className="results-container">
          <ul className="font-bold text-xl bg-gray w-screen px-20 text-center">{renderResults()}</ul>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
