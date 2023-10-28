"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import PatientDashboard from "@/Components/PatientDashboard";

const PatientProfile = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNo: "",
    dob: "",
    city: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/patient/view-profile", {
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
    <div className="bg-blue-50 min-h-screen">
      <PatientDashboard />
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 text-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQabPnL65PJtnyc3OgCKevPT-1eIOWDjC_f86xZ2x9qB81e9NKK25pkKjg_IKJWeEKt__g&usqp=CAU"
                alt="Profile Picture"
                className="w-40 h-40 rounded-full mx-auto border-blue-300 border-4"
              />
            </div>
            <div className="md:w-2/3 mt-4 md:mt-0">
              <div className="text-3xl text-blue-800 font-bold mb-2">{input.name}</div>
              <hr className="my-2" />
              <div className="flex flex-col md:flex-row justify-between text-xl mt-4">
                <div className="mt-2 md:w-1/2">
                  <div className="font-bold text-gray-700 mb-2">Email Address</div>
                  <div className="text-gray-900">{input.email}</div>
                </div>
                <div className="mt-2 md:w-1/2">
                  <div className="font-bold text-gray-700 mb-2">Phone Number</div>
                  <div className="text-gray-900">{input.phoneNo}</div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between text-xl mt-4">
                <div className="mt-2 md:w-1/2">
                  <div className="font-bold text-gray-700 mb-2">Date of Birth</div>
                  <div className="text-gray-900">{input.dob}</div>
                </div>
                <div className="mt-2 md:w-1/2">
                  <div className="font-bold text-gray-700 mb-2">City</div>
                  <div className="text-gray-900">{input.city}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
