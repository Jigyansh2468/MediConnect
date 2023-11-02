"use client"
import React, { useContext, useState } from "react";
import Searchbar from "@/Components/SearchBar";
import Navbar from "@/Components/Navbar";
import BookAppointment from "@/Components/BookAppointment";
import SearchList from "@/Components/SearchList";
import { SessionContext } from "@/Components/SessionContextProvider";


const FindDoctor = () => {
  const [results, setResults] = useState([]);
  const [doctor, setdoctor] = useState({});
  const [bookapt, setbookapt] = useState(false);
  const clearResults = () => {
    setResults([]);
    setbookapt(false);
  };

  const { authState } = useContext(SessionContext);

  return (
    <>
      <div>
      </div>
      <div>
        <Navbar UserMode={authState.USER_MODE} />
        <Searchbar setResults={setResults} clearResults={clearResults} />
        {bookapt === true ? (
          <BookAppointment doctor={doctor} />
        ) : (
          <SearchList results={results} setdoctor={setdoctor} setbookapt={setbookapt} />
        )}
      </div>
    </>
  );
};

export default FindDoctor;