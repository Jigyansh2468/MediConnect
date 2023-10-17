"use client";
import React, { useState } from "react";

const OTP = () => {
  const [otp, setOTP] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleOTPChange = (e) => {
    const inputOTP = e.target.value.replace(/\D/g, "").slice(0, 4);
    setOTP(inputOTP);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your API here to verify the OTP
    // If OTP matches, set verificationSuccess to true
    // Else, it remains false
    // You would typically send the OTP to the server and validate it there.

    // For example:
    // api.verifyOTP(otp)
    //   .then(() => setVerificationSuccess(true))
    //   .catch(() => setVerificationSuccess(false));
  };

  return (
    <>
      <h1 className="text-center font-bold text-4xl my-10">OTP</h1>
      <center>
        <div className="flex items-center justify-center h-72 w-1/4 border-2 border-black px-20 rounded-xl lg:w-1/4 sm:w-1/4">
          <form onSubmit={handleSubmit}>
            <input
              type="tel"
              placeholder=""
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
        {verificationSuccess ? <h4>OTP verified. You can proceed.</h4> : null}
        {!verificationSuccess && otp.length === 4 ? (
          <h4>Wrong OTP. Please try again.</h4>
        ) : null}
      </center>
    </>
  );
};

export default OTP;
