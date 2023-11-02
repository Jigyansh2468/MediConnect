'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
// import Link from "next/link";
import { useRouter } from "next/navigation";

const SignupD = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNo: "",
    address: "",
    city: "",
    specialization: "",
    certificateNo: "",
    modeOfConsultation: "",
    password: "",
    cnfrmpass: "",
  });

  const [completedSignup, setCompletedSignup] = useState("signup");
  const [otp, setOTP] = useState("");
  const [apiotp, setApiOTP] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [verificationAttempts, setVerificationAttempts] = useState(0);

  const router = useRouter();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const checkPasswordMatch = () => {
    if (input.password !== input.cnfrmpass) {
      setPasswordMatchError("Password and Confirm Password do not match.");
    } else {
      setPasswordMatchError("");
    }
  };

  const requestOTP = () => {
    axios
      .post("http://localhost:8080/doctor/reqOTP", { email: input.email })
      .then((response) => {
        setApiOTP(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOTPChange = (e) => {
    const inputOTP = e.target.value.replace(/\D/g, "").slice(0, 4);
    setOTP(inputOTP);
  };

  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
    setInput({ ...input, modeOfConsultation: selectedMode });
  };

  const checkUserExist = () => {
    axios
      .post("http://localhost:8080/doctor/emailexist", { email: input.email })
      .then((response) => {
        if (response.data === "user already exists") {
          alert(`Doctor with email ${input.email} already exists`);
        } else {
          requestOTP();
          setCompletedSignup("otp");
        }
      });
  };

  const verifyOTP = () => {
    if (otp === "") {
      alert("Please enter the OTP.");
      return;
    }
    if (otp == apiotp) {
      setVerificationStatus(true);
      axios
        .post("http://localhost:8080/doctor/register", input)
        .then((response) => {
          console.log("Data sent to Server");
        })
        .catch((error) => {
          console.log(error);
        });
      alert("Doctor registered successfully");
      setCompletedSignup("login");
    } else {
      setVerificationAttempts(verificationAttempts + 1);
      if (verificationAttempts < 3) {
        setVerificationStatus(false);
        setVerificationAttempts(verificationAttempts + 1);
        setVerificationError(
          `Incorrect OTP. Please try again. Attempts Left: ${3 - verificationAttempts
          }`
        );
        setOTP("");
      } else {
        setCompletedSignup("signup");
        setVerificationError("No attempts left. Going back to Signup Page...");
      }
    }
  };

  useEffect(() => {
    if (completedSignup === "login") {
      router.replace("/Login");
    }
  }, [completedSignup]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.password !== input.cnfrmpass) {
      alert("Password and Confirm Password do not match.");
    } else {
      if (
        input.name &&
        input.email &&
        input.phoneNo &&
        input.address &&
        input.city &&
        input.specialization &&
        input.certificateNo &&
        input.modeOfConsultation &&
        input.password &&
        input.cnfrmpass
      ) {
        checkUserExist();
      } else {
        alert("Please fill in all the required fields before proceeding.");
      }
    }
  };

  return (
    <div className="relative h-screen">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute object-cover w-full h-full filter blur-md"
      >
        <source src="/LoginBlur.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="flex items-center justify-center h-full relative z-10">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-center text-2xl font-bold mb-4">Doctor Signup</h1>
          <form className="space-y-4">
            {completedSignup === "signup" && (
              <>
                <div>
                  <p htmlFor="name" className="block font-medium text-gray-700">
                    Full Name
                  </p>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={input.name}
                    onChange={onInputChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    required
                  />
                </div>
                <div>
                  <p htmlFor="email" className="block font-medium text-gray-700">
                    Email
                  </p>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={input.email}
                    onChange={onInputChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    required
                  />
                </div>
                <div>
                  <p className="block font-medium text-gray-700">
                    Phone Number
                  </p>
                  <input
                    type="text"
                    name="phoneNo"
                    value={input.phoneNo}
                    onChange={onInputChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    required
                  />
                </div>
                <div>
                  <p htmlFor="address" className="block font-medium text-gray-700">
                    Address
                  </p>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={input.address}
                    onChange={onInputChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    required
                  />
                </div>
                <div>
                  <p className="block font-medium text-gray-700">City</p>
                  <input
                    type="text"
                    name="city"
                    value={input.city}
                    onChange={onInputChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    required
                  />
                </div>
                <div>
                  <p className="block font-medium text-gray-700">
                    Specialization
                  </p>
                  <select
                    name="specialization"
                    value={input.specialization}
                    onChange={onInputChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    required
                  >
                    <option value="">Select Specialization</option>
                    <option value="Internal medicine">Internal medicine</option>
                    <option value="General surgery">General surgery</option>
                    <option value="Family medicine">Family medicine</option>
                    <option value="Otorhinolaryngology">Otorhinolaryngology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Surgeon">Surgeon</option>
                    <option value="Emergency medicine">Emergency medicine</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Geriatrics">Geriatrics</option>
                    <option value="Radiologist">Radiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Oncologist">Oncologist</option>
                    <option value="Ophthalmologist">Ophthalmologist</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                    <option value="Pulmonologist">Pulmonologist</option>
                    <option value="Dentist">Dentist</option>
                  </select>
                </div>
                <div>
                  <p className="block font-medium text-gray-700">
                    Certificate Number
                  </p>
                  <input
                    type="text"
                    name="certificateNo"
                    value={input.certificateNo}
                    onChange={onInputChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    required
                  />
                </div>
                <div>
                  <p className="block font-medium text-gray-700">
                    Mode of Appointment
                  </p>
                  <div className="space-x-2">
                    <p className="inline-flex items-center">
                      <input
                        type="radio"
                        name="modeOfConsultation"
                        value="ONLINE"
                        checked={input.modeOfConsultation === "ONLINE"}
                        onChange={handleModeChange}
                      />
                      Online
                    </p>
                    <p className="inline-flex items-center">
                      <input
                        type="radio"
                        name="modeOfConsultation"
                        value="OFFLINE"
                        checked={input.modeOfConsultation === "OFFLINE"}
                        onChange={handleModeChange}
                      />
                      Offline
                    </p>
                    <p className="inline-flex items-center">
                      <input
                        type="radio"
                        name="modeOfConsultation"
                        value="BOTH"
                        checked={input.modeOfConsultation === "BOTH"}
                        onChange={handleModeChange}
                      />
                      Both
                    </p>
                  </div>
                </div>
                <div>
                  <p htmlFor="password" className="block font-medium text-gray-700">
                    Password
                  </p>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={input.password}
                    onChange={onInputChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    required
                  />
                </div>
                <div>
                  <p htmlFor="cnfrmpass" className="block font-medium text-gray-700">
                    Confirm Password
                  </p>
                  <input
                    type="password"
                    id="cnfrmpass"
                    name="cnfrmpass"
                    value={input.cnfrmpass}
                    onBlur={checkPasswordMatch}
                    onChange={onInputChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    required
                  />
                </div>
                {passwordMatchError && (
                  <div className="text-red-500">{passwordMatchError}</div>
                )}
                <div>
                  <button
                    type="button"
                    className="w-full bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </button>
                </div>
              </>
            )}
          </form>
          {completedSignup === "otp" && (
            <div className="text-center">
              <h2 className="text-lg font-semibold mt-4">Enter OTP</h2>
              <input
                type="tel"
                placeholder="Enter OTP"
                name="otp"
                value={otp}
                onChange={handleOTPChange}
                className="my-5 py-3 px-5 rounded-md border border-gray-300"
                required
              />
              <button
                type="button"
                className="w-full bg-blue-500 text-white py-2 px-3 rounded-md hover-bg-blue-600"
                onClick={verifyOTP}
              >
                Verify OTP
              </button>
              {verificationError && (
                <div className="text-red-500 mt-2">{verificationError}</div>
              )}
              {verificationStatus && (
                <div className="text-green-500 mt-2">OTP verified. You can proceed.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupD;
