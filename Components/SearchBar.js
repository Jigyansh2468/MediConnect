"use client";
import React, { useState } from "react";
import axios from "axios";
import "./Searchbar.css";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState({
    searchBy: "",
    value: "",
  });

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
          setResults(response.data); // Assuming the API returns an array of results
        })
        .catch((error) => console.log(error));
    }
  };

  const renderResults = () => {
    if (results.length === 0) {
      return <div>No Doctors Found</div>;
    }

    return results.map((result, i) => (
      <div className="result-list" key={i}>
        <div className="h-40 bg-gray flex justify-around">
          <div className="flex flex-col gap-4">
            <div>{result.name}</div>
            <div>{result.city}</div>
            <div>{result.specialization}</div>
          </div>
          <div>{result.name}</div>
          <button onClick={() => bookAppointment(result)}>
            Book Appointment
          </button>
        </div>
      </div>
    ));
  };

  const bookAppointment = (doctor) => {
    // booking appointment logic here
    console.log(`Booking an appointment with ${doctor.name}`);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-5">
        <select
          name="searchBy"
          value={input.searchBy}
          onChange={onInputChange}
          className="my-5 p-2 rounded-md border-2 font-bold border-blue-600"
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
            value={input.value}
            onChange={onInputChange}
          />
          <button onClick={search}>Search</button>
        </div>
      </div>
      <div className="p-8 bg-slate-200 flex justify-center items-center">
        <div className="bg-blue-200 flex justify-center items-center">
          <ul>{renderResults()}</ul>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
