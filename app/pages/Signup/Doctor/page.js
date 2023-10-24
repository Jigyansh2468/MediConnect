"use client";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const SignupD = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNo: "",
    address: "",
    city: "",
    specialization: "",
    certificateNo: "",
    mode: "",
    password: "",
    cnfrmpass: "",
  });
  const [completedSignup, setCompletedSignup] = useState(false);
  const [otp, setOTP] = useState("");
  const [apiotp, setapiOTP] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const [redirectToSignup, setRedirectToSignup] = useState(false);

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

  const requestotp = () => {
    axios
      .post(
        "http://localhost:8080/doctor/reqOTP",
        { email: input.email },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setapiOTP(response.data);
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
    setInput({ ...input, mode: selectedMode });
  };

  const verifyotp = (e) => {
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
      window.location.href = "/Login";
      // pending
    } else {
      setVerificationAttempts(verificationAttempts + 1);
      if (verificationAttempts < 3) {
        setVerificationStatus(false);
        setVerificationAttempts(verificationAttempts + 1);
        setVerificationError(
          `Incorrect OTP. Please try again.Attempt Left :  ${
            3 - verificationAttempts
          }`
        );
        setOTP("");
      } else {
        e.preventDefault();
        setTimeout(() => {
          setRedirectToSignup(true);
          window.location.href = "/SignupD";
        }, 3000);
        setVerificationError("No Attemp Left Going back to Signup Page...");
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(input);
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
        input.mode &&
        input.password &&
        input.cnfrmpass
      ) {
        requestotp();
        setCompletedSignup(true);
      } else {
        alert("Please fill in all the required fields before proceeding.");
      }
    }
  };
  return (
    <div>
      <h1 className="text-center text-xl font-bold my-5">Doctor Signup</h1>
      <center>
        {completedSignup ? (
          <div className="flex items-center justify-center h-auto gap-6 w-1/4 lg:w-1/4 sm:w-1/4">
            <form action="">
              <input
                type="tel"
                placeholder="Enter OTP"
                name="otp"
                value={otp}
                onChange={handleOTPChange}
                className="my-5 py-3 px-5 rounded-md border-2 border-black"
                required
              />
              <br />
              <button
                type="submit"
                className="border-2 border-white rounded-xl px-4 py-2 bg-blue-400 text-white font-mono font-bold text-lg hover-bg-blue-600"
                onClick={verifyotp}
              >
                Verify OTP
              </button>
            </form>
            {verificationError ? (
              <h4 className="text-red-500 ">{verificationError}</h4>
            ) : verificationStatus === true ? (
              <h4 className="text-green-500 ">
                OTP verified. You can proceed.
              </h4>
            ) : null}
            {redirectToSignup && <Redirect to="/signup" />}
          </div>
        ) : (
          <div className="flex items-center justify-center h-auto w-1/4 border-2 border-black px-20 rounded-xl lg:w-1/4 sm:w-1/4">
            <form
              action=""
              onSubmit={handleSubmit}
              className="text-center flex-column items-center gap-5 mt-5"
            >
              <input
                type="text"
                placeholder="UserName"
                name="name"
                value={input.name}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={input.email}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <input
                type="number"
                placeholder="Phone Number"
                name="phoneNo"
                value={input.phoneNo}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={input.address}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={input.city}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <select
                name="specialization"
                value={input.specialization}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
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
                <option value="Podiatrists">Podiatrists</option>
                <option value="Endocrinologist">Endocrinologist</option>
                <option value="Pulmonologist">Pulmonologist</option>
                <option value="Dentist">Dentist</option>
              </select>
              <input
                type="number"
                placeholder="certificateNo"
                name="certificateNo"
                value={input.certificateNo}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <div className="flex gap-1 font-bold">
                Mode of Appoitment
                <br />
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="ONLINE"
                    checked={input.mode === "ONLINE"}
                    onChange={handleModeChange}
                  />{" "}
                  Online
                </label>
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="OFFLINE"
                    checked={input.mode === "OFFLINE"}
                    onChange={handleModeChange}
                  />{" "}
                  Offline
                </label>
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="BOTH"
                    checked={input.mode === "BOTH"}
                    onChange={handleModeChange}
                  />{" "}
                  Both
                </label>
              </div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={input.password}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="cnfrmpass"
                value={input.cnfrmpass}
                onBlur={checkPasswordMatch}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black mb-8"
                required
              />
              {passwordMatchError && (
                <div className="text-red-500">{passwordMatchError}</div>
              )}
              <button
                className="mb-8 font-semibold text-lg border-2 border-zinc-300 rounded-lg px-10 p-2 hover:bg-green-300 hover:text-white"
                type="submit"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </form>
          </div>
        )}
      </center>
    </div>
  );
};

export default SignupD;
