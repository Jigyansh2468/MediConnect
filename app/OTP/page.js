"use client";
import React, { useState } from "react";

const OTP = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(otp);
  };

  const verifyOTP = () => {
    // Call API and check OTP
    // If OTP matches, navigate to the home page
    // Else, show that there are 2 attempts left to verify
  };

  const [otp, setOTP] = useState("");

  const handleOTPChange = (e) => {
    // Ensure that the OTP entered is no longer than 4 digits
    const inputOTP = e.target.value.replace(/\D/g, "").slice(0, 4);
    setOTP(inputOTP);
  };

  return (
    <>
      <h1 className="text-center font-bold text-4xl my-10">OTP</h1>
      <center>
        <div className="flex items-center justify-center h-72 w-1/4 border-2 border-black px-20 rounded-xl lg:w-1/4 sm:w-1/4">
          <form onSubmit={handleSubmit}>
            <input
              type="tel" // Change type to "tel" to indicate a numeric input
              placeholder=""
              min={1000}
              max={9999}
              name="otp"
              value={otp}
              onChange={handleOTPChange}
              className="my-5 py-3 px-5 rounded-md border-2 border-black"
              required
            />
            <br />
            <button
              type="submit"
              onClick={verifyOTP}
              className="border-2 border-white rounded-xl px-4 py-2 bg-blue-400 text-white font-mono font-bold text-lg hover:bg-blue-600"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </center>
    </>
  );
};

export default OTP;
