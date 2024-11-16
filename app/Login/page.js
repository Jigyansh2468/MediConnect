'use client'
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./login.css";
import { SessionContext } from "@/Components/SessionContextProvider";
import VideoBackground from '@/Components/VideoBackground';
import { FaUserMd, FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  useEffect(() => { console.log("hello") }, []);
  const route = useRouter();

  const [input, setInput] = useState({
    email: "",
    password: "",
    user: "PATIENT",
  });

  const { setAuthState } = useContext(SessionContext)

  const onInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const newValue = checked ? value : "";
      setInput({ ...input, [name]: newValue });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const Handlelogin = (e) => {
    if (input.email && input.password) {
      e.preventDefault();
      axios
        .post("http://localhost:8080/login", input, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          // cookies
          const cookies = document.cookie.split('; ');
          let USER_MODE = null;
          if(response.data==="User Not Found") {
            alert("User with email does not exist");
          }
          cookies.forEach((cookie) => {
            const [name, value] = cookie.split('=');
            if (name.trim() === 'USER_MODE') {
              USER_MODE = value.trim();
            }
          });

          if (USER_MODE !== null) {
            // Store in localStorage
            localStorage.setItem('userMode', USER_MODE);
            
            setAuthState((prev) => ({
              USER_MODE: USER_MODE,
            }));

            if (response.data === "login successful") {
              if (input.user === "PATIENT") {
                route.replace("/");
              } else {
                route.replace("/");
              }
            }
            if(response.data==="User Not Found") {
                alert("User with email does not exist");
            }
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Login failed. Please check your credentials.");
        });
    } else {
      alert("Please fill in all the required fields before proceeding.");
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
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Please sign in to continue</p>
            </div>

            <form className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={onInputChange}
                  placeholder="Email address"
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

              <div className="flex items-center space-x-3 py-2">
                <div className="flex items-center space-x-2">
                  <FaUserMd className="text-gray-600" />
                  <span className="text-gray-700">Doctor Mode</span>
                </div>
                <label className="switch-wrapper">
                  <input
                    type="checkbox"
                    name="user"
                    value="DOCTOR"
                    checked={input.user === "DOCTOR"}
                    onChange={onInputChange}
                    className="hidden"
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <button
                type="button"
                onClick={Handlelogin}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Don't have an account?</p>
              <div className="space-x-4">
                <Link 
                  href="/Patient/Signup" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign up as Patient
                </Link>
                <span className="text-gray-400">|</span>
                <Link 
                  href="/Doctor/Signup" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign up as Doctor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
