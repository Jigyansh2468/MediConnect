"use client"
import React, { useState } from "react";
import Searchbar from "@/Components/SearchBar";
import Navbar from "@/Components/Navbar";
import BookAppointment from "@/Components/BookAppointment";
import SearchList from "@/Components/SearchList";


const FindDoctor = () => {
  const [results, setResults] = useState([]);
  const [doctor, setdoctor] = useState({});
  const [bookapt, setbookapt] = useState(false);
  const clearResults = () => {
    setResults([]);
    setbookapt(false);
  };
  // const myStyle = {
  //   backgroundImage:
  //     "url('/BlurBG.png')",
  //   height: '50vh',
  //   marginTop: '-70px',
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  //   margin: "20px",
  //   filter: "blur(1.5rem)"
  // };
  return (
    <>
      <div>
        <Navbar />
        <Searchbar setResults={setResults} clearResults={clearResults} />
        {bookapt === true ? (
          <BookAppointment doctor={doctor} />
        ) : (
          <SearchList results={results} setdoctor={setdoctor} setbookapt={setbookapt} />
        )}
      </div>
      {/* <div style={myStyle}>
      </div> */}
    </>
  );
};

export default FindDoctor;
