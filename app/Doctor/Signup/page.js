'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity, 
         FaUserMd, FaCertificate, FaLock } from 'react-icons/fa';
import VideoBackground from '@/Components/VideoBackground';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <VideoBackground 
        src="/LoginBlur.mp4"
        className="fixed object-cover object-center w-full h-full z-0 filter blur-sm"
      />

      <div className="absolute w-full h-full z-10">
        <div className="flex items-center justify-center h-full">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all my-8">
            {completedSignup === "signup" && (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Join as a Doctor</h1>
                  <p className="text-gray-600">Create your account to start helping patients</p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
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
                        <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="address"
                        value={input.address}
                        onChange={onInputChange}
                        placeholder="Complete Address"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        required
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUserMd className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        name="specialization"
                        value={input.specialization}
                        onChange={onInputChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none"
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

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCertificate className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="certificateNo"
                        value={input.certificateNo}
                        onChange={onInputChange}
                        placeholder="Certificate Number"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        required
                      />
                    </div>

                    <div className="relative col-span-2">
                      <p className="text-gray-700 mb-2 font-medium">Mode of Consultation</p>
                      <div className="flex space-x-6">
                        {['ONLINE', 'OFFLINE', 'BOTH'].map((mode) => (
                          <label key={mode} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="modeOfConsultation"
                              value={mode}
                              checked={input.modeOfConsultation === mode}
                              onChange={handleModeChange}
                              className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span className="text-gray-700">{mode.charAt(0) + mode.slice(1).toLowerCase()}</span>
                          </label>
                        ))}
                      </div>
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
                  </div>

                  {passwordMatchError && (
                    <div className="text-red-500 text-sm text-center">{passwordMatchError}</div>
                  )}

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                  >
                    Create Account
                  </button>
                </form>
              </>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupD;
