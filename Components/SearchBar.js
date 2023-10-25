"use client";
import React, { useState } from "react";
import "./Searchbar.css";
import { FaSearch } from "react-icons/fa";
function Searcbar({ setresults }) {
  const [input, setinput] = useState("");
  const Search = () => {};
  const SearchResultList = () => {
    if (results.length === 0) {
      return null;
    }
    return (
      <div className="result-list">
        {results.map((result, id) => {
          {
            /* return list  */
          }
        })}
      </div>
    );
  };
  const fetchdata = (value) => {
    axios
      .get("")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setresults(results);
      });
  };
  const handlechange = (value) => {
    setinput(value);
    fetchdata(value);
  };
  return (
    <div className="flex justify-center items-center">
      <div className="searchbox">
        <FaSearch id="search-icon" />
        <input
          placeholder="Type to Search..."
          value={input}
          onChange={(e) => {
            handlechange(e.target.value);
          }}
        />
        <button onClick={Search}>Search</button>
      </div>
    </div>
  );
}

export default Searcbar;
