"use client";
import React, { useState } from "react";
import axios from "axios";

const SignupP = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNo: "",
    dob: "",
    city: "",
    password: "",
    cnfrmpass: "",
  });
  const [completedSignup, setCompletedSignup] = useState(false);
  const [otp, setOTP] = useState("");
  const [apiotp, setApiOTP] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [verificationAttempts, setVerificationAttempts] = useState(0);

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
        "http://localhost:8080/patient/reqOTP",
        { email: input.email },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
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

  const verifyotp = () => {
    if (otp === "") {
      alert("Please enter the OTP.");
      return;
    }
    if (otp == apiotp) {
      setVerificationStatus(true);
      axios
        .post("http://localhost:8080/patient/register", input)
        .then((response) => {
          console.log("Data sent to Server");
        })
        .catch((error) => {
          console.log(error);
        });
      // changes need to be checked
      window.location.href = "/login";
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
      } else if (verificationAttempts == 2) {
        setVerificationError(`Please Enter the OTP`);
      } else {
        setShowResendButton(true);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.password !== input.cnfrmpass) {
      alert("Password and Confirm Password do not match.");
    } else {
      if (
        input.name &&
        input.email &&
        input.phoneNo &&
        input.city &&
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
      <h1 className="text-center text-xl font-bold my-5">Signup Page</h1>
      <center>
        {completedSignup ? (
          <div className="flex items-center justify-center h-auto w-1/4 lg:w-1/4 sm:w-1/4">
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
            ) : showResendButton === true ? (
              <div>
                <h4 className="text-red-500">Incorrect OTP</h4>
              </div>
            ) : null}
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
                type="date"
                placeholder="Date of Birth"
                value={input.dob}
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
                className="mb-8 font-semibold text-lg border-2 border-zinc-300 rounded-lg px-10 p-2 hover-bg-pink-300 hover-text-white hover-cursor-pointer"
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

export default SignupP;
