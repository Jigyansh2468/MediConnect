"use client";
import React, { useState } from "react";
import axios from "axios";
import "./Searchbar.css";
import { FaSearch } from "react-icons/fa";
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
    setInput({ ...input, value: "" });
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
    </>
  );
};

export default Searchbar;
