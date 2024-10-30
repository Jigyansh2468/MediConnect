"use client"
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DoctorDashboard from "@/Components/DoctorDashboard";
import Navbar from "@/Components/Navbar";
import { SessionContext } from "@/Components/SessionContextProvider";

const DoctorProfile = () => {
  const { authState } = useContext(SessionContext);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNo: "",
    city: "",
    address: "",
    specialization: "",
    certificateNo: "",
    modeOfConsultation: "",
    experience: "",
    consultationFee: ""
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
          address: response.data.address,
          city: response.data.city,
          specialization: response.data.specialization,
          certificateNo: response.data.certificateNo,
          modeOfConsultation: response.data.modeOfConsultation,
          experience: response.data.experience,
          consultationFee: response.data.consultationFee
        });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="bg-purple-50 min-h-screen">
      <Navbar UserMode={authState.USER_MODE} />
      <div className="pt-20">
        <DoctorDashboard />
        <div className="container mx-auto py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 text-center">
                <img
                  src="/Profile.png"
                  className="w-40 h-40 rounded-full mx-auto border-purple-300 border-4"
                />
              </div>
              <div className="md:w-2/3 mt-4 md:mt-0">
                <div className="text-3xl font-bold text-purple-800 mb-2">{input.name}</div>
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
                    <div className="font-bold text-gray-700 mb-2">City</div>
                    <div className="text-gray-900">{input.city}</div>
                  </div>
                  <div className="mt-2 md:w-1/2">
                    <div className="font-bold text-gray-700 mb-2">Address</div>
                    <div className="text-gray-900">{input.address}</div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between text-xl mt-4">
                  <div className="mt-2 md:w-1/2">
                    <div className="font-bold text-gray-700 mb-2">Specialization</div>
                    <div className="text-gray-900">{input.specialization}</div>
                  </div>
                  <div className="mt-2 md:w-1/2">
                    <div className="font-bold text-gray-700 mb-2">CertificateNo</div>
                    <div className="text-gray-900">{input.certificateNo}</div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between text-xl mt-4">
                  <div className="mt-2 md:w-1/2">
                    <div className="font-bold text-gray-700 mb-2">Mode of Consultation</div>
                    <div className="text-gray-900">{input.modeOfConsultation}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
