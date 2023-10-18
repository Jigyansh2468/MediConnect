"use client";
import React, { useState } from "react";
import axios from "axios";

const OTP = () => {
  const [otp, setOTP] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  const handleOTPChange = (e) => {
    const inputOTP = e.target.value.replace(/\D/g, "").slice(0, 4);
    setOTP(inputOTP);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/patient/verify-otp", otp)
      .then((response) => {
        if (response.data === "OTP verified") {
          setVerificationSuccess(true);
          setVerificationError("");
        } else {
          setVerificationSuccess(false);
          setVerificationError("Wrong OTP. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h1 className="text-center font-bold text-4xl my-10">OTP</h1>
      <center>
        <div className="flex items-center justify-center h-72 w-1/4 border-2 border-black px-20 rounded-xl lg:w-1/4 sm:w-1/4">
          <form onSubmit={handleSubmit}>
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
              className="border-2 border-white rounded-xl px-4 py-2 bg-blue-400 text-white font-mono font-bold text-lg hover:bg-blue-600"
            >
              Verify OTP
            </button>
          </form>
        </div>
        {verificationSuccess ? (
          <h4>OTP verified. You can proceed.</h4>
        ) : (
          <h4>{verificationError}</h4>
        )}
      </center>
    </>
  );
};

export default OTP;
