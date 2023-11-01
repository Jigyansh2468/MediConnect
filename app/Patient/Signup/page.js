"use client"
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
      .post("http://localhost:8080/patient/reqOTP", { email: input.email })
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

  const checkUserExist = () => {
    axios
      .post("http://localhost:8080/patient/emailexist", { email: input.email })
      .then((response) => {
        if (response.data === "user already exist") {
          alert(`Patient with email ${input.email} already exists.`);
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
        .post("http://localhost:8080/patient/register", input)
        .then((response) => {
          console.log("Data Sent to Server");
        })
        .catch((error) => {
          console.log(error);
        });
      alert("Patient registered successfully");
      setCompletedSignup("login");
    } else {
      setVerificationAttempts(verificationAttempts + 1);
      if (verificationAttempts < 3) {
        setVerificationStatus(false);
        setVerificationAttempts(verificationAttempts + 1);
        setVerificationError(
          `Incorrect OTP. Please try again. Attempts Left: ${3 - verificationAttempts}`
        );
        setOTP("");
      } else {
        setCompletedSignup("signup");
        setVerificationError("No attempts left. Going back to Signup Page...");
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
        checkUserExist();
      } else {
        alert("Please fill in all the required fields before proceeding.");
      }
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-4">Signup</h1>
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
                <p htmlFor="phoneNo" className="block font-medium text-gray-700">
                  Phone Number
                </p>
                <input
                  type="number"
                  id="phoneNo"
                  name="phoneNo"
                  value={input.phoneNo}
                  onChange={onInputChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                  required
                />
              </div>
              <div>
                <p htmlFor="dob" className="block font-medium text-gray-700">
                  Date of Birth
                </p>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={input.dob}
                  onChange={onInputChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                  required
                />
              </div>
              <div>
                <p htmlFor="city" className="block font-medium text-gray-700">
                  City
                </p>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={input.city}
                  onChange={onInputChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                  required
                />
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
                  type="submit"
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
              className="my-5 py-3 px-5 rounded-md border border-black"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600"
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
        <div className="text-center mt-4">
          <Link href="/Login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupP;
