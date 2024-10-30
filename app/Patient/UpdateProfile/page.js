"use client"
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/Components/Navbar';
import { SessionContext } from '@/Components/SessionContextProvider';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaCity } from 'react-icons/fa';

const UpdateProfile = () => {
  const { authState } = useContext(SessionContext);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNo: "",
    dob: "",
    city: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8080/patient/view-profile", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((response) => {
      setInput({
        name: response.data.name,
        email: response.data.email,
        phoneNo: response.data.phoneNo,
        dob: response.data.dob,
        city: response.data.city,
      });
    })
    .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:8080/patient/update-profile", input, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((response) => {
      if (response.data === "Profile Updated") {
        alert("Profile Updated Successfully!");
      }
    })
    .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar UserMode={authState.USER_MODE} />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Update Profile</h2>
                <p className="text-gray-600">Modify your personal information</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label className="text-gray-700 font-semibold mb-2 block">Full Name</label>
                    <div className="flex items-center">
                      <FaUser className="text-blue-500 absolute left-3" />
                      <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label className="text-gray-700 font-semibold mb-2 block">Email Address</label>
                    <div className="flex items-center">
                      <FaEnvelope className="text-blue-500 absolute left-3" />
                      <input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Phone Number Field */}
                  <div className="relative">
                    <label className="text-gray-700 font-semibold mb-2 block">Phone Number</label>
                    <div className="flex items-center">
                      <FaPhone className="text-blue-500 absolute left-3" />
                      <input
                        type="tel"
                        name="phoneNo"
                        value={input.phoneNo}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* Date of Birth Field */}
                  <div className="relative">
                    <label className="text-gray-700 font-semibold mb-2 block">Date of Birth</label>
                    <div className="flex items-center">
                      <FaCalendar className="text-blue-500 absolute left-3" />
                      <input
                        type="date"
                        name="dob"
                        value={input.dob}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* City Field */}
                  <div className="relative">
                    <label className="text-gray-700 font-semibold mb-2 block">City</label>
                    <div className="flex items-center">
                      <FaCity className="text-blue-500 absolute left-3" />
                      <input
                        type="text"
                        name="city"
                        value={input.city}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        placeholder="Enter your city"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;