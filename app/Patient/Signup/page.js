"use client"
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaCity, FaLock } from 'react-icons/fa';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed object-cover object-center w-full h-full z-0 filter blur-sm"
      >
        <source src="/LoginBlur.mp4" type="video/mp4" />
      </video>

      <div className="absolute w-full h-full z-10">
        <div className="flex items-center justify-center h-full">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
              <p className="text-gray-600">Join as a Patient</p>
            </div>

            {completedSignup === "signup" && (
              <form className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={onInputChange}
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={onInputChange}
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phoneNo"
                    value={input.phoneNo}
                    onChange={onInputChange}
                    placeholder="Phone Number"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="dob"
                    value={input.dob}
                    onChange={onInputChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCity className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="city"
                    value={input.city}
                    onChange={onInputChange}
                    placeholder="City"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={onInputChange}
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="cnfrmpass"
                    value={input.cnfrmpass}
                    onChange={onInputChange}
                    onBlur={checkPasswordMatch}
                    placeholder="Confirm Password"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                </div>

                {passwordMatchError && (
                  <div className="text-red-500 text-sm">{passwordMatchError}</div>
                )}

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                >
                  Create Account
                </button>
              </form>
            )}

            {completedSignup === "otp" && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Verify Your Email</h2>
                  <p className="text-gray-600">We've sent a code to your email</p>
                </div>

                <input
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  value={otp}
                  onChange={handleOTPChange}
                  className="w-full text-center text-2xl tracking-widest py-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  maxLength={4}
                />

                <button
                  onClick={verifyOTP}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  Verify OTP
                </button>

                {verificationError && (
                  <div className="text-red-500 text-center">{verificationError}</div>
                )}
                {verificationStatus && (
                  <div className="text-green-500 text-center">OTP verified successfully!</div>
                )}
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-gray-600">Already have an account?</p>
              <Link 
                href="/Login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupP;
