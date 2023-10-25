"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DoctorDashboard from "@/Components/DoctorDashboard";
import "./doctorprofile.css";
const DoctorProfile = () => {
  const [input, setInput] = useState({
    name: "Doctor_Name",
    email: "",
    phoneNo: "",
    address: "",
    city: "",
    specialization: "",
    certificateNo: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:8080/doctor/view-profile",{
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
          address: response.data.address,
          city: response.data.city,
          specialization: response.data.specialization,
          certificateNo: response.data.certificateNo,
        });
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="bg-gray-100 h-auto  w-screen">
        <DoctorDashboard user={input.name} />
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
              Address
              <input
                type="text"
                className="styling"
                placeholder={input.address}
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
          <div className="flex flex-row items-center p-10 place-content-around">
            <div>
              Specialization
              <input
                type="text"
                className="styling"
                placeholder={input.specialization}
                readOnly
              />
            </div>
            <div>
              Certificate Number
              <input
                type="text"
                className="styling"
                placeholder={input.certificateNo}
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

export default DoctorProfile;
