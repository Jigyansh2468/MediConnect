"use client"
import React, { useContext, useState } from "react";
import Searchbar from "@/Components/SearchBar";
import Navbar from "@/Components/Navbar";
import BookAppointment from "@/Components/BookAppointment";
import { SessionContext } from "@/Components/SessionContextProvider";


const FindDoctor = () => {
  const [doctor, setdoctor] = useState({});
  const [bookapt, setbookapt] = useState(false);


  const { authState } = useContext(SessionContext);

  return (
    <>
      <div>
        <Navbar UserMode={authState.USER_MODE} />
        {bookapt === true ? (
          <BookAppointment doctor={doctor} />
        ) : (<Searchbar setdoctor={setdoctor} setbookapt={setbookapt} />)
        }
      </div>
    </>
  );
};

export default FindDoctor;