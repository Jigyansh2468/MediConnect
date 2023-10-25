"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PatientDashboard from "@/Components/PatientDashboard";
import "./patientprofile.css";
const PatientProfile = () => {
  const [input, setInput] = useState({
    name: "Patient_Name",
    email: "",
    phoneNo: "",
    dob: "",
    city: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:8080/doctor/view-profile", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setInput({
          name: response.data.name,
          email: response.data.email,
          phoneNo: response.data.phoneNo,
          dob: response.data.dob,
          city: response.data.city,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="bg-gray-100 h-auto  w-screen">
        <PatientDashboard user={input.name} />
        <form action="" className="ml-16 mr-16 mt-10 h-screen bg-white p-10">
          <div className="flex gap-2 border-b-red-200">
            <div>
              <img
                // src={input.photo} if photo is there in database
                alt="Profile Picture"
                className="h-80 w-80"
              />
            </div>
            <div>
              Name
              <br />
              <input
                type="text"
                className="styling"
                placeholder={input.name}
                readOnly
              />
            </div>
          </div>
          <hr />
          <div className="flex flex-row items-center p-10 place-content-around">
            <div>
              Email Address
              <input
                type="text"
                className="styling"
                placeholder={input.email}
                readOnly
              />
            </div>
            <div>
              Phone Number
              <input
                type="text"
                className="styling"
                placeholder={input.phoneNo}
                readOnly
              />
            </div>
          </div>
          <hr />
          <div className="flex flex-row items-center p-10 place-content-around">
            <div>
              Date of Birth
              <input
                type="text"
                className="styling"
                placeholder={input.dob}
                readOnly
              />
            </div>
            <div>
              City
              <input
                type="text"
                className="styling"
                placeholder={input.city}
                readOnly
              />
            </div>
          </div>
          <hr />
        </form>
      </div>
    </>
  );
};

export default PatientProfile;
